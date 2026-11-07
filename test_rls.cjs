require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const sbAnon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth:{autoRefreshToken:false,persistSession:false} });

(async () => {
  // sign in as ruba first to get session
  const { data } = await sbAnon.auth.signInWithPassword({ email:'ruba1032208@gmail.com', password:'MMRuba@123' });
  console.log('signed in', !!data.session);
  const { data: profile, error } = await sbAnon.from('users').select('name, education_level, institution_name').eq('id', data.user.id).maybeSingle();
  console.log('profile', JSON.stringify(profile), 'err', error?.message);
})();