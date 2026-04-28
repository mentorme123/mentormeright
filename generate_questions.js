const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY not found in .env.local file.");
  console.error("Please add your key to .env.local and run again.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

const TARGET_AUDIENCES = ['Students', 'Working Professionals', 'Graduates', 'College Students'];
const BATCH_SIZE = 5; // How many questions to generate per API call (keep it low to ensure high quality and prevent timeouts)
const TARGET_TOTAL = 5000; // Overall goal

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const basePrompt = fs.readFileSync(path.join(__dirname, 'MentorMe_Question_Generator_Prompt.txt'), 'utf8');

async function generateBatch(audience, sectionNum, currentCount) {
  console.log(`Generating batch for ${audience} - Section ${sectionNum}...`);
  
  let sectionDetails = "";
  if (sectionNum === 1) {
    sectionDetails = "Focus: Passion Exploration (RIASEC). Generate trade-offs.";
  } else if (sectionNum === 2) {
    sectionDetails = "Focus: Individuality (Emotional Intelligence, Efficiency, Empathy, Engagement, Exploration). Generate Situational Judgment Tests (SJT).";
  } else {
    sectionDetails = "Focus: Skill Proficiency (Logical, Numerical, Mechanical, Verbal, Administrative). Generate strict cognitive tests with 1 correct answer.";
  }

  const prompt = basePrompt
    .replace('[INSERT TARGET AUDIENCE HERE - e.g., High School Students / College Students / Graduates / Working Professionals]', audience)
    .replace('[INSERT NUMBER]', BATCH_SIZE)
    + `\n\nCRITICAL INSTRUCTION FOR THIS SPECIFIC BATCH: You are generating ${BATCH_SIZE} questions exclusively for Section ${sectionNum}. ${sectionDetails}`;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    // Clean up markdown blocks if the model wrapped it
    const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsed = JSON.parse(cleanJson);
    return parsed;
  } catch (error) {
    console.error(`Error generating batch (Rate limit or JSON parse error): ${error.message}`);
    return null;
  }
}

async function runGenerator() {
  const dbDir = path.join(__dirname, 'db');
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
  
  const masterFile = path.join(dbDir, 'master_questions_db.json');
  let masterDB = [];
  if (fs.existsSync(masterFile)) {
    masterDB = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
  }

  console.log(`Starting generation. Current DB Size: ${masterDB.length} questions.`);

  let cycleSection = 1;

  while (masterDB.length < TARGET_TOTAL) {
    for (const audience of TARGET_AUDIENCES) {
      const newQuestions = await generateBatch(audience, cycleSection, masterDB.length);
      
      if (newQuestions && Array.isArray(newQuestions)) {
        masterDB.push(...newQuestions);
        fs.writeFileSync(masterFile, JSON.stringify(masterDB, null, 2));
        console.log(`Success! Saved ${newQuestions.length} questions. DB Size: ${masterDB.length}`);
      } else {
        console.log("Retrying in 10 seconds...");
        await delay(10000); // Backoff on failure
      }

      // Cycle sections 1 -> 2 -> 3
      cycleSection = cycleSection >= 3 ? 1 : cycleSection + 1;

      // Anti-rate-limit delay
      await delay(5000); 
    }
  }
  
  console.log("Successfully generated all target questions!");
}

runGenerator();
