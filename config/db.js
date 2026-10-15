const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas bilan ulanish muvaffaqiyatli!");
  } catch (error) {
    console.error("MongoDB ulanishida xatolik:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;