const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const Exercise = require('./models/Exercise');
const fs = require('fs');

// Seed to MongoDB
async function seedDatabase() {
  try {
    console.log("🔍 Connecting to MongoDB...");
    const uri = `${process.env.MONGODB_URL}/Exercise?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");

    const count = await Exercise.countDocuments();
    if (count > 0) {
      console.log("⚠️ Exercise data already exists. Skipping seeding.");
      return;
    }

    // Read JSON file and Insert data
    const data = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));

    await Exercise.insertMany(data);
    console.log('✅ Data inserted successfully');

  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}


seedDatabase();
