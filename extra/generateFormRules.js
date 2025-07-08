const fs = require("fs");
const axios = require("axios");

const API_KEY = `${process.env.GEMINI_API_KEY}`; 
const EXERCISES = require("./exercises.json");

async function generateFormRules(exercise) {
  const prompt = `
You are a fitness assistant AI for pose detection. Based on the exercise details below, generate a JSON array of form-check rules.

Each rule helps detect poor form using joint angles. Use the following format:

[
  {
    "angleName": "backAngle",
    "joints": ["left_shoulder", "left_hip", "left_knee"],
    "comparison": "<",
    "threshold": 140,
    "message": "Keep your back straight"
  }
]

Exercise details:
Title: ${exercise.title}
Type: ${exercise.type}
Primary Muscle Group: ${exercise.bodyPart}
Equipment: ${exercise.equipment}
Difficulty: ${exercise.level}
Description: ${exercise.desc}

Only return the array of rules as valid JSON.
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    const jsonStart = reply.indexOf("[");
    const jsonEnd = reply.lastIndexOf("]") + 1;
    const jsonString = reply.slice(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error(`❌ Failed for "${exercise.title}": ${err.message}`);
    return [];
  }
}

(async () => {
  const results = {};

  for (const ex of EXERCISES) {
    console.log(`⏳ Processing: ${ex.title}`);
    const rules = await generateFormRules(ex);
    results[ex.title] = rules;
  }

  fs.writeFileSync("generated_rules.json", JSON.stringify(results, null, 2));
  console.log("✅ Form rules saved to generated_rules.json");
})();
