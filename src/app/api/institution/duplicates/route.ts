import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function normalizeName(name: string): string {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function DELETE(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { searchParams } = new URL(req.url);
    const institutionName = String(searchParams.get('institution') || '').trim();

    if (!institutionName) {
      return NextResponse.json({ error: 'Institution name is required', status: 400 });
    }

    const { data: students, error: studentError } = await supabaseAdmin
      .from('users')
      .select('id, email, name, created_at, institution_name')
      .eq('role', 'individual')
      .ilike('institution_name', institutionName)
      .order('created_at', { ascending: true });

    if (studentError) {
      console.error('Failed to fetch students:', studentError);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    const studentList = students || [];

    // --- Detect duplicates by EMAIL ---
    const emailGroups = new Map<string, typeof studentList>();
    for (const s of studentList) {
      const key = String(s.email || '').toLowerCase().trim();
      if (!key) continue;
      if (!emailGroups.has(key)) emailGroups.set(key, []);
      emailGroups.get(key)!.push(s);
    }

    // --- Detect duplicates by NAME (catches auto-generated student@ emails that change each import) ---
    const nameGroups = new Map<string, typeof studentList>();
    for (const s of studentList) {
      const normName = normalizeName(s.name || '');
      if (!normName) continue;
      if (!nameGroups.has(normName)) nameGroups.set(normName, []);
      nameGroups.get(normName)!.push(s);
    }

    const shouldDelete = searchParams.get('delete') === 'true';

    const duplicateGroups: Array<{
      type: 'email' | 'name';
      key: string;
      keep: string;
      keepName: string;
      remove: string[];
    }> = [];
    let totalDuplicates = 0;
    let kept = 0;
    let deleted = 0;
    let transferredAssessments = 0;
    let errors = 0;

    // Process email-based duplicates
    const emailEntries = Array.from(emailGroups.entries());
    for (const [email, group] of emailEntries) {
      if (group.length <= 1) {
        kept += group.length;
        continue;
      }
      const [oldest, ...duplicates] = group;
      kept += 1;
      totalDuplicates += duplicates.length;
      duplicateGroups.push({
        type: 'email',
        key: email,
        keep: oldest.id,
        keepName: oldest.name || '',
        remove: duplicates.map((d) => d.id),
      });

      if (shouldDelete) {
        for (const dupe of duplicates) {
          // Transfer completed assessment results to the kept user
          const { data: assessmentResults } = await supabaseAdmin
            .from('assessment_results')
            .select('id')
            .eq('user_id', dupe.id);

          if (assessmentResults && assessmentResults.length > 0) {
            console.log(`Transferring ${assessmentResults.length} assessment result(s) from ${dupe.email} to kept user ${oldest.id}`);
            const { error: transferError } = await supabaseAdmin
              .from('assessment_results')
              .update({ user_id: oldest.id })
              .eq('user_id', dupe.id);

            if (transferError) {
              console.error(`Failed to transfer assessments for ${dupe.email}:`, transferError.message);
              errors++;
            } else {
              transferredAssessments += assessmentResults.length;
            }
          }

          // Delete auth user
          const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(dupe.id);
          if (deleteAuthError) {
            console.error(`Failed to delete auth user for ${dupe.email}:`, deleteAuthError.message);
            errors++;
          } else {
            deleted++;
          }

          // Delete public user (in case auth delete didn't cascade)
          const { error: deletePublicError } = await supabaseAdmin
            .from('users')
            .delete()
            .eq('id', dupe.id);

          if (deletePublicError) {
            console.error(`Failed to delete public user for ${dupe.email}:`, deletePublicError.message);
            errors++;
          }
        }
      }
    }

    // Process name-based duplicates (students with same name but different emails)
    const nameEntries = Array.from(nameGroups.entries());
    for (const [name, group] of nameEntries) {
      if (group.length <= 1) {
        // Only count as kept if not already counted via email dedup
        if (!duplicateGroups.some(g => g.remove.includes(group[0].id))) {
          kept += group.length;
        }
        continue;
      }

      // Only process as name-dupes if they have different emails (same email already handled above)
      const uniqueEmails = new Set(group.map(u => String(u.email || '').toLowerCase().trim()));
      if (uniqueEmails.size <= 1) continue;

      const sorted = group.slice().sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return ta - tb;
      });
      const [oldest, ...duplicates] = sorted;

      const alreadyKept = duplicateGroups.some(g => g.keep === oldest.id);
      if (!alreadyKept) kept += 1;
      totalDuplicates += duplicates.length;
      duplicateGroups.push({
        type: 'name',
        key: name,
        keep: oldest.id,
        keepName: oldest.name || '',
        remove: duplicates.map((d) => d.id),
      });

      if (shouldDelete) {
        for (const dupe of duplicates) {
          const { data: assessmentResults } = await supabaseAdmin
            .from('assessment_results')
            .select('id')
            .eq('user_id', dupe.id);

          if (assessmentResults && assessmentResults.length > 0) {
            console.log(`Transferring ${assessmentResults.length} assessment result(s) from name-dupe ${dupe.email} to kept user ${oldest.id}`);
            const { error: transferError } = await supabaseAdmin
              .from('assessment_results')
              .update({ user_id: oldest.id })
              .eq('user_id', dupe.id);

            if (transferError) {
              console.error(`Failed to transfer assessments for ${dupe.email}:`, transferError.message);
              errors++;
            } else {
              transferredAssessments += assessmentResults.length;
            }
          }

          const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(dupe.id);
          if (deleteAuthError) {
            console.error(`Failed to delete auth user for ${dupe.email}:`, deleteAuthError.message);
            errors++;
          } else {
            deleted++;
          }

          const { error: deletePublicError } = await supabaseAdmin
            .from('users')
            .delete()
            .eq('id', dupe.id);

          if (deletePublicError) {
            console.error(`Failed to delete public user for ${dupe.email}:`, deletePublicError.message);
            errors++;
          }
        }
      }
    }

    return NextResponse.json({
      deleted: shouldDelete ? deleted : 0,
      kept,
      duplicateCount: totalDuplicates,
      duplicateGroups,
      transferredAssessments: shouldDelete ? transferredAssessments : 0,
      errors: shouldDelete ? errors : 0,
      message: shouldDelete
        ? 'Duplicates deleted by email and name. Completed assessment results transferred to kept users.'
        : 'Duplicate IDs reported by email and name. Add &delete=true to remove duplicates (completed tests are preserved via transfer).',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Duplicates check error:', err);
    return NextResponse.json({ error: err.message || 'Failed to scan for duplicates' }, { status: 500 });
  }
}
