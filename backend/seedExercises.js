const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Exercise = require('./models/Exercise'); // Make sure this uses "exercises" collection

async function seedDatabase() {
  try {
    console.log("🔍 Connecting to MongoDB...");

    // ✅ Use Fitfusion DB now
    const uri = `${process.env.MONGODB_URL}/Fitfusion?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected successfully");

    const count = await Exercise.countDocuments();
    if (count > 0) {
      console.log("⚠️ Exercise data already exists. Skipping seeding.");
      return;
    }

    // ✅ Load exercises from local JSON file
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
