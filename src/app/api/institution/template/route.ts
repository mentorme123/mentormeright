import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const data = [
      ['Name', 'Class'],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const filename = `student_template_${new Date().toISOString().split('T')[0]}.xlsx`;
    return new NextResponse(Buffer.from(wbout), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Template generation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate template' }, { status: 500 });
  }
}
