require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: projectRef + '.supabase.co',
      path,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d ? JSON.parse(d) : null }));
    });
    req.on('error', reject);
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

// Correct sheet data from user
const correctSheet = [
  { name: "Abdul Hadi", class: "Class 9A", email: "abdul_hadi@mentormeright.in", password: "MMabdulhadi@123" },
  { name: "Abdullah Yousuf", class: "Class 9A", email: "abdullah_yousuf@mentormeright.in", password: "MMabdullahyousuf@123" },
  { name: "Ashraf Shaik", class: "Class 9A", email: "ashraf_shaik@mentormeright.in", password: "MMashrafshaik@123" },
  { name: "Mohammed Maaz", class: "Class 9A", email: "mohammed_maaz@mentormeright.in", password: "MMmohammedmaaz@123" },
  { name: "Ammaar Imam", class: "Class 9A", email: "ammaar_imam@mentormeright.in", password: "MMammaarimam@123" },
  { name: "Fatima Bint Ayub", class: "Class 9A", email: "fatima_bint_ayub@mentormeright.in", password: "MMfatimabintayub@123" },
  { name: "Maryam Zuha", class: "Class 9A", email: "maryam_zuha@mentormeright.in", password: "MMmaryamzuha@123" },
  { name: "Mohammed Hashir Maddekar", class: "Class 9A", email: "mohammed_hashir_maddekar@mentormeright.in", password: "MMmohammedhashirmaddekar@123" },
  { name: "Mohammed Usman", class: "Class 9A", email: "mohammed_usman@mentormeright.in", password: "MMmohammedusman@123" },
  { name: "Mohammed Rihan", class: "Class 9A", email: "mohammed_rihan@mentormeright.in", password: "MMmohammedrihan@123" },
  { name: "Rumaysa Khan", class: "Class 9A", email: "rumaysa_khan@mentormeright.in", password: "MMrumaysakhan@123" },
  { name: "Samrah Aftab", class: "Class 9A", email: "samrah_aftab@mentormeright.in", password: "MMsamrahaftab@123" },
  { name: "Shaista Zarin", class: "Class 9A", email: "shaista_zarin@mentormeright.in", password: "MMshaistazarin@123" },
  { name: "Syed Mustafa", class: "Class 9A", email: "syed_mustafa@mentormeright.in", password: "MMsyedmustafa@123" },
  { name: "V. K. Areeba Manha", class: "Class 9A", email: "v_k_areeba_manha@mentormeright.in", password: "MMvkareebamanha@123" },
  { name: "Syed Umar Shariff", class: "Class 9A", email: "syed_umar_shariff@mentormeright.in", password: "MMsyedumarshariff@123" },
  { name: "Zaina Jamshed", class: "Class 9A", email: "zaina_jamshed@mentormeright.in", password: "MMzainajamshed@123" },
  { name: "Sayeeda Aafra", class: "Class 9A", email: "sayeeda_aafra@mentormeright.in", password: "MMsayeedaaafra@123" },
  { name: "Nadra Simaat", class: "Class 9A", email: "nadra_simaat@mentormeright.in", password: "MMnadrasimaat@123" },
  { name: "Mohammed Anas", class: "Class 9A", email: "mohammedanas@mentormeright.in", password: "MMmohammedanas@123" },
  { name: "Muhammad Ibraheem Ali", class: "Class 9A", email: "muhammad_ibraheem_ali@mentormeright.in", password: "MMmuhammadibraheemali@123" },
  { name: "Nurah Suhael", class: "Class 9A", email: "nurah_suhael@mentormeright.in", password: "MMnurahsuhael@123" },
  { name: "Abdur Rahman Fuzail", class: "Class 9A", email: "abdur_rahman_fuzail@mentormeright.in", password: "MMabdurrahmanfuzail@123" },
  { name: "Amna Imran", class: "Class 9A", email: "amna_imran@mentormeright.in", password: "MMamnaimran@123" },
  { name: "Muadh Ahmed Patel", class: "Class 9A", email: "muadh_ahmed_patel@mentormeright.in", password: "MMmuadhahmedpatel@123" },
  { name: "Arham", class: "Class 9A", email: "arham@mentormeright.in", password: "MMarham@123" },
  { name: "Abdulla Sabeeh", class: "Class 9A", email: "abdulla_sabeeh@mentormeright.in", password: "MMabdullasabeeh@123" },
  { name: "Khattab Irfan Nasir", class: "Class 9A", email: "khattab_irfan_nasir@mentormeright.in", password: "MMkhattabirfannasir@123" },
  { name: "Reyyan Rahil Ghaffar", class: "Class 9A", email: "reyyan@mentormeright.com", password: "MMreyyan@123" },
  { name: "Mokksha Mahtani", class: "Class 9A", email: "mokksha@mentormeright.com", password: "MMmokksha@123" },
  { name: "Mohammed AyaanM", class: "Class 9A", email: "mohammed@mentormeright.com", password: "MMmohammed@123" },
  { name: "Adam Saheed", class: "Class 9B", email: "adam_saheed@mentormeright.in", password: "MMadamsaheed@123" },
  { name: "Arianna Jane Roys", class: "Class 9B", email: "arianna_jane_roys@mentormeright.in", password: "MMariannajaneroys@123" },
  { name: "Erum Fatima Khan", class: "Class 9B", email: "erum_fatima_khan@mentormeright.in", password: "MMerumfatimakhan@123" },
  { name: "K. Sufiya Raheema", class: "Class 9B", email: "k_sufiya_raheema@mentormeright.in", password: "MMksufiyaraheema@123" },
  { name: "Iqra Fathima", class: "Class 9B", email: "iqra_fathima@mentormeright.in", password: "MMiqrafathima@123" },
  { name: "Laiba Rahman", class: "Class 9B", email: "laiba_rahman@mentormeright.in", password: "MMlaibarahman@123" },
  { name: "Mahmood Damudi", class: "Class 9B", email: "mahmood_damudi@mentormeright.in", password: "MMmahmooddamudi@123" },
  { name: "Aisha Adil", class: "Class 9B", email: "aisha_adil@mentormeright.in", password: "MMaishaadil@123" },
  { name: "Mays Mohammed Ali Hassan", class: "Class 9B", email: "mays_mohammed_ali_hassan@mentormeright.in", password: "MMmaysmohammedalihassan@123" },
  { name: "Maimoona Sarosh Rahman", class: "Class 9B", email: "maimoona_sarosh_rahman@mentormeright.in", password: "MMmaimoonasaroshrahman@123" },
  { name: "Muhammad Azfaar Quadri", class: "Class 9B", email: "muhammad_azfaar_quadri@mentormeright.in", password: "MMmuhammadazfaarquadri@123" },
  { name: "Muhammad Aahil Khan", class: "Class 9B", email: "muhammad_aahil_khan@mentormeright.in", password: "MMmuhammadaahilkhan@123" },
  { name: "Nabhan Jamshad", class: "Class 9B", email: "nabhan_jamshad@mentormeright.in", password: "MMnabhanjamshad@123" },
  { name: "Niha Shirin", class: "Class 9B", email: "niha_shirin@mentormeright.in", password: "MMnihashirin@123" },
  { name: "Nora Fatima Zama", class: "Class 9B", email: "nora_fatima_zama@mentormeright.in", password: "MMnorafatimazama@123" },
  { name: "Raaid Mohammed Rizwan", class: "Class 9B", email: "raaid_mohammed_rizwan@mentormeright.in", password: "MMraaidmohammedrizwan@123" },
  { name: "Syed Qanit Ahmed", class: "Class 9B", email: "syed_qanit_ahmed@mentormeright.in", password: "MMsyedqanitahmed@123" },
  { name: "Yvonne Aasiya Ahmed", class: "Class 9B", email: "yvonne_aasiya_ahmed@mentormeright.in", password: "MMyvonneaasiyaahmed@123" },
  { name: "Zahrah Shaikh", class: "Class 9B", email: "zahrah_shaikh@mentormeright.in", password: "MMzahrahshaikh@123" },
  { name: "Zoey Mohammed", class: "Class 9B", email: "zoey_mohammed@mentormeright.in", password: "MMzoeymohammed@123" },
  { name: "Zoha Kahnum Pathan", class: "Class 9B", email: "zoha_kahnum_pathan@mentormeright.in", password: "MMzohakahnumpathan@123" },
  { name: "Haniya Anaum", class: "Class 9B", email: "haniya_anaum@mentormeright.in", password: "MMhaniyaanaum@123" },
  { name: "Idhant Bhaumik", class: "Class 9B", email: "idhant_bhaumik@mentormeright.in", password: "MMidhantbhaumik@123" },
  { name: "Mehwish Manosha", class: "Class 9B", email: "mehwish_manosha@mentormeright.in", password: "MMmehwishmanosha@123" },
  { name: "Syed Humza Zayn", class: "Class 9B", email: "syed_humza_zayn@mentormeright.in", password: "MMsyedhumzazayn@123" },
  { name: "Hamdan Mohammed Mansoor", class: "Class 9B", email: "hamdan_mohammed_mansoor@mentormeright.in", password: "MMhamdanmohammedmansoor@123" },
  { name: "Muhammed Zayd Nadeem Ahmed", class: "Class 9B", email: "muhammed_zayd_nadeem_ahmed@mentormeright.in", password: "MMmuhammedzaydnadeemahmed@123" },
  { name: "Nivaan Sharath Rajan", class: "Class 9B", email: "nivaan_sharath_rajan@mentormeright.in", password: "MMnivaansharathrajan@123" },
  { name: "Sarah Afsheen", class: "Class 9B", email: "sarah_afsheen@mentormeright.in", password: "MMsarahafsheen@123" },
  { name: "Rayyan", class: "Class 9B", email: "rayyan@mentormeright.in", password: "MMrayyan@123" },
  { name: "Inara matin Ansari", class: "Class 9B", email: "inara@mentormeright.com", password: "MMinara@123" },
  { name: "Hana Kausar", class: "Class 10A", email: "hana_kausar@mentormeright.in", password: "MMhanakausar@123" },
  { name: "Rumaisa Afroz", class: "Class 10A", email: "rumaisa_afroz@mentormeright.in", password: "MMrumaisaafroz@123" },
  { name: "Umme Kulsum Sardar", class: "Class 10A", email: "umme_kulsum_sardar@mentormeright.in", password: "MMummekulsumsardar@123" },
  { name: "Aziza Fathima", class: "Class 10A", email: "aziza_fathima@mentormeright.in", password: "MMazizafathima@123" },
  { name: "Md.Shahir Pasha", class: "Class 10A", email: "md_shahir_pasha@mentormeright.in", password: "MMmdshahirpasha@123" },
  { name: "Shayan", class: "Class 10A", email: "shayan@mentormeright.in", password: "MMshayan@123" },
  { name: "Rhythm Rai", class: "Class 10B", email: "rhythm_rai@mentormeright.in", password: "MMrhythmrai@123" },
  { name: "Shayan Talha", class: "Class 10B", email: "shayan_talha@mentormeright.in", password: "MMshayantalha@123" },
  { name: "Haziqah Kasheef", class: "Class 10B", email: "haziqah_kasheef@mentormeright.in", password: "MMhaziqahkasheef@123" }
];

async function main() {
  const dbUsers = await getAllUsers();
  console.log(`Database users: ${dbUsers.length}\n`);

  const dbByEmail = {};
  dbUsers.forEach(u => { dbByEmail[String(u.email || '').toLowerCase().trim()] = u; });

  let totalChecked = 0;
  let emailMismatches = 0;
  let classMismatches = 0;
  let notFound = 0;

  for (const entry of correctSheet) {
    totalChecked++;
    const dbUser = dbByEmail[entry.email.toLowerCase()];
    
    if (!dbUser) {
      // Try matching by name
      const byName = dbUsers.find(u => String(u.name || '').toLowerCase().trim() === entry.name.toLowerCase().trim());
      if (byName) {
        console.log(`NAME MATCH: ${entry.name} - DB email=${byName.email}, Sheet email=${entry.email}`);
        notFound++;
        continue;
      }
      console.log(`NOT FOUND: ${entry.name} <${entry.email}>`);
      notFound++;
      continue;
    }

    // Check class
    if (String(dbUser.education_level || '').trim().toLowerCase() !== entry.class.toLowerCase().replace('class ', '').trim()) {
      console.log(`CLASS MISMATCH: ${entry.name} - DB class="${dbUser.education_level}", Sheet class="${entry.class}"`);
      classMismatches++;
    }

    // Check email
    if (String(dbUser.email || '').toLowerCase().trim() !== entry.email.toLowerCase().trim()) {
      console.log(`EMAIL MISMATCH: ${entry.name} - DB email="${dbUser.email}", Sheet email="${entry.email}"`);
      emailMismatches++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total checked: ${totalChecked}`);
  console.log(`Email mismatches: ${emailMismatches}`);
  console.log(`Class mismatches: ${classMismatches}`);
  console.log(`Not found: ${notFound}`);
}

main().catch(e => console.error(e));
