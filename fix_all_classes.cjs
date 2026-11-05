require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    };
    if (body) {
      const bodyStr = JSON.stringify(body);
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d ? JSON.parse(d) : null }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAllUsers() {
  const perPage = 1000;
  let all = [];
  let page = 0;
  while (true) {
    const { body, status } = await api(`/rest/v1/users?select=id,name,email,education_level&role=eq.individual&institution_name=ilike.*Oasis%20International%20School*&limit=${perPage}&offset=${page * perPage}`);
    if (status !== 200 || !Array.isArray(body) || body.length === 0) break;
    all = all.concat(body);
    if (body.length < perPage) break;
    page++;
  }
  return all;
}

const correctSheet = [
  { name: "Abdul Hadi", class: "9A" },
  { name: "Abdullah Yousuf", class: "9A" },
  { name: "Ashraf Shaik", class: "9A" },
  { name: "Mohammed Maaz", class: "9A" },
  { name: "Ammaar Imam", class: "9A" },
  { name: "Fatima Bint Ayub", class: "9A" },
  { name: "Maryam Zuha", class: "9A" },
  { name: "Mohammed Hashir Maddekar", class: "9A" },
  { name: "Mohammed Usman", class: "9A" },
  { name: "Mohammed Rihan", class: "9A" },
  { name: "Rumaysa Khan", class: "9A" },
  { name: "Samrah Aftab", class: "9A" },
  { name: "Shaista Zarin", class: "9A" },
  { name: "Syed Mustafa", class: "9A" },
  { name: "V. K. Areeba Manha", class: "9A" },
  { name: "Syed Umar Shariff", class: "9A" },
  { name: "Zaina Jamshed", class: "9A" },
  { name: "Sayeeda Aafra", class: "9A" },
  { name: "Nadra Simaat", class: "9A" },
  { name: "Mohammed Anas", class: "9A" },
  { name: "Muhammad Ibraheem Ali", class: "9A" },
  { name: "Nurah Suhael", class: "9A" },
  { name: "Abdur Rahman Fuzail", class: "9A" },
  { name: "Amna Imran", class: "9A" },
  { name: "Muadh Ahmed Patel", class: "9A" },
  { name: "Arham", class: "9A" },
  { name: "Abdulla Sabeeh", class: "9A" },
  { name: "Khattab Irfan Nasir", class: "9A" },
  { name: "Reyyan Rahil Ghaffar", class: "9A" },
  { name: "Mokksha Mahtani", class: "9A" },
  { name: "Mohammed AyaanM", class: "9A" },
  { name: "Adam Saheed", class: "9B" },
  { name: "Arianna Jane Roys", class: "9B" },
  { name: "Erum Fatima Khan", class: "9B" },
  { name: "K. Sufiya Raheema", class: "9B" },
  { name: "Iqra Fathima", class: "9B" },
  { name: "Laiba Rahman", class: "9B" },
  { name: "Mahmood Damudi", class: "9B" },
  { name: "Aisha Adil", class: "9B" },
  { name: "Mays Mohammed Ali Hassan", class: "9B" },
  { name: "Maimoona Sarosh Rahman", class: "9B" },
  { name: "Muhammad Azfaar Quadri", class: "9B" },
  { name: "Muhammad Aahil Khan", class: "9B" },
  { name: "Nabhan Jamshad", class: "9B" },
  { name: "Niha Shirin", class: "9B" },
  { name: "Nora Fatima Zama", class: "9B" },
  { name: "Raaid Mohammed Rizwan", class: "9B" },
  { name: "Syed Qanit Ahmed", class: "9B" },
  { name: "Yvonne Aasiya Ahmed", class: "9B" },
  { name: "Zahrah Shaikh", class: "9B" },
  { name: "Zoey Mohammed", class: "9B" },
  { name: "Zoha Kahnum Pathan", class: "9B" },
  { name: "Haniya Anaum", class: "9B" },
  { name: "Idhant Bhaumik", class: "9B" },
  { name: "Mehwish Manosha", class: "9B" },
  { name: "Syed Humza Zayn", class: "9B" },
  { name: "Hamdan Mohammed Mansoor", class: "9B" },
  { name: "Muhammed Zayd Nadeem Ahmed", class: "9B" },
  { name: "Nivaan Sharath Rajan", class: "9B" },
  { name: "Sarah Afsheen", class: "9B" },
  { name: "Rayyan", class: "9B" },
  { name: "Inara matin Ansari", class: "9B" },
  { name: "Hana Kausar", class: "10A" },
  { name: "Rumaisa Afroz", class: "10A" },
  { name: "Umme Kulsum Sardar", class: "10A" },
  { name: "Aziza Fathima", class: "10A" },
  { name: "Md.Shahir Pasha", class: "10A" },
  { name: "Shayan", class: "10A" },
  { name: "Rhythm Rai", class: "10B" },
  { name: "Shayan Talha", class: "10B" },
  { name: "Haziqah Kasheef", class: "10B" }
];

async function main() {
  const dbUsers = await getAllUsers();
  const dbByName = {};
  dbUsers.forEach(u => { dbByName[String(u.name || '').toLowerCase().trim()] = u; });

  let updated = 0, notFound = 0, skipped = 0, errors = 0;

  for (const entry of correctSheet) {
    const dbUser = dbByName[entry.name.toLowerCase().trim()];
    if (!dbUser) {
      console.log(`NOT FOUND: ${entry.name}`);
      notFound++;
      continue;
    }
    if (String(dbUser.education_level || '').trim() === entry.class) {
      skipped++;
      continue;
    }
    const r = await api(`/rest/v1/users?id=eq.${encodeURIComponent(dbUser.id)}`, 'PATCH', { education_level: entry.class });
    if (r.status === 200 || r.status === 204) {
      console.log(`UPDATED: ${entry.name} -> class ${entry.class} (was ${dbUser.education_level || 'null'})`);
      updated++;
    } else {
      console.error(`ERROR: ${entry.name} class update: ${r.status}`);
      errors++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated}, Not found: ${notFound}, Skipped: ${skipped}, Errors: ${errors}`);
}

main().catch(e => console.error(e));
