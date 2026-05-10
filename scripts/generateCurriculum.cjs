const fs = require('fs');
const path = require('path');

const phases = [
  { id: '03', title: 'Risk Management (The Holy Grail)' },
  { id: '06', title: 'Derivative Markets' },
  { id: '07', title: 'The Crypto Ecosystem & Blockchain' },
  { id: '08', title: 'Web3 & Decentralized Finance' },
  { id: '09', title: 'Tokenomics & Utility' },
  { id: '10', title: 'NFTs and Digital Property Rights' },
  { id: '11', title: 'Trading Psychology & Emotional Control' },
  { id: '12', title: 'Advanced Charting & Indicators' },
  { id: '13', title: 'Portfolio Construction' },
  { id: '14', title: 'Taxes and the Legal Framework' },
  { id: '15', title: 'Putting It All Together' }
];

const levels = ['beginner', 'intermediate', 'pro'];

async function generateCards(phaseId, phaseTitle, level) {
  const prompt = `
Generate exactly 30 micro-learning cards for the ${level} tier of a financial education module called "Phase ${phaseId}: ${phaseTitle}".
You are an elite Wall Street instructor. Do not write generic fluff. Write deep, highly-advanced, institutional-level concepts.

OUTPUT FORMAT:
Output ONLY pure, valid JSON. No markdown code blocks (do NOT wrap in \`\`\`json). No conversational text. Just the raw JSON array.

ARRAY STRUCTURE:
[
  {
    "id": "p${parseInt(phaseId)}-${level.charAt(0)}1",
    "type": "concept" | "insight" | "warning" | "example" | "exercise",
    "title": "Short, punchy title",
    "content": "Deep, highly detailed explanation. Use \\n\\n for paragraph breaks.",
    "options": ["Option A", "Option B", "Option C"], // Include ONLY if type is 'exercise'
    "correctAnswer": "Option A" // Include ONLY if type is 'exercise'
  }
  // ... continue for 30 cards
]

IMPORTANT RULES:
- Cards 1-29 should rotate between concept, insight, example, warning, and exercise.
- Card 30 MUST be type "concept" with title "Live Scenario", and MUST include the dynamic simulator tool. It must look exactly like this:
  {
    "id": "p${parseInt(phaseId)}-${level.charAt(0)}30",
    "type": "concept",
    "title": "Live Scenario",
    "content": "Test your mastery of this lesson in a live dynamic scenario.",
    "tool": "dynamic",
    "toolProps": {
      "scenario": "A highly detailed financial scenario testing the concepts just taught.",
      "startingBalance": 10000,
      "choices": [
        { "text": "A terrible decision.", "result": -5000, "feedback": "Detailed explanation of why this was wrong." },
        { "text": "A mediocre decision.", "result": 0, "feedback": "Detailed explanation." },
        { "text": "The perfect execution.", "result": 5000, "feedback": "Detailed explanation of why this was right." }
      ]
    }
  }
`;

  try {
    const response = await fetch('http://localhost:8080/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      })
    });

    const data = await response.json();
    if (!data.choices) {
        console.error("API Error Response:", data);
        return null;
    }
    let text = data.choices[0].message.content.trim();
    if (text.startsWith('```json')) text = text.replace('```json', '');
    if (text.startsWith('```')) text = text.replace('```', '');
    if (text.endsWith('```')) text = text.slice(0, -3);

    return JSON.parse(text);
  } catch (err) {
    console.error("Failed generating Phase " + phaseId + " " + level + ": ", err);
    return null;
  }
}

async function run() {
  for (const phase of phases) {
    console.log("\\n--- Starting Phase " + phase.id + ": " + phase.title + " ---");
    const dirPath = path.join(__dirname, '..', 'src', 'data', 'curriculum', "phase-" + phase.id);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    for (const level of levels) {
      console.log("Generating " + level + " lesson...");
      const cards = await generateCards(phase.id, phase.title, level);
      
      if (cards) {
        const fileContent = "import { Lesson } from '../../../types/curriculum';\\n\\nexport const " + level + "Lesson: Lesson = {\\n  id: 'p" + parseInt(phase.id) + "-" + level + "',\\n  title: '" + phase.title + " - " + level.charAt(0).toUpperCase() + level.slice(1) + "',\\n  level: '" + level + "',\\n  cards: " + JSON.stringify(cards, null, 2) + "\\n};\\n";
        fs.writeFileSync(path.join(dirPath, level + ".ts"), fileContent);
        console.log("✅ Saved " + level + ".ts");
      } else {
        console.log("❌ Failed to generate " + level + ".ts");
      }
    }

    // Generate the index file for the phase
    const indexContent = "import { Phase } from '../../types/curriculum';\\nimport { beginnerLesson } from './phase-" + phase.id + "/beginner';\\nimport { intermediateLesson } from './phase-" + phase.id + "/intermediate';\\nimport { proLesson } from './phase-" + phase.id + "/pro';\\n\\nexport const phase" + phase.id + ": Phase = {\\n  id: 'phase-" + phase.id + "',\\n  title: 'Phase " + parseInt(phase.id) + ": " + phase.title + "',\\n  description: 'Master " + phase.title.replace(/'/g, "\\'") + " through deep, interactive micro-learning.',\\n  lessons: [\\n    beginnerLesson,\\n    intermediateLesson,\\n    proLesson\\n  ]\\n};\\n";
    const targetFileName = phase.id === '03' ? 'phase-03-risk-management.ts' :
                         phase.id === '06' ? 'phase-06-derivatives.ts' :
                         phase.id === '07' ? 'phase-07-crypto.ts' :
                         phase.id === '08' ? 'phase-08-web3.ts' :
                         phase.id === '09' ? 'phase-09-tokenomics.ts' :
                         phase.id === '10' ? 'phase-10-nfts.ts' :
                         phase.id === '11' ? 'phase-11-psychology.ts' :
                         phase.id === '12' ? 'phase-12-charting.ts' :
                         phase.id === '13' ? 'phase-13-portfolio.ts' :
                         phase.id === '14' ? 'phase-14-taxes.ts' :
                         'phase-15-mastery.ts';
                         
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'curriculum', targetFileName), indexContent);
    console.log("✅ Wired phase-" + phase.id + " into " + targetFileName);
  }
  
  console.log('\\n🎉 All curriculum generation complete!');
}

run();
