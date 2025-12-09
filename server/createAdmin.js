import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("⚡ DB connected");

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      name: "Master Admin",
      email: "masteradmin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("🎉 Admin created successfully!");
    console.log("Email: masteradmin@example.com");
    console.log("Password: Admin@123");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
