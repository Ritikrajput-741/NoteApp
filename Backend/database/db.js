import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Mongo Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("❌ Mongo Database connection failed!");
    process.exit(1);
  }
};
