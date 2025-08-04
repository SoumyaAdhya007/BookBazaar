import mongoose from "mongoose";
import env from "./env.config.js";
import logger from "./logger.config.js";
const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("\n 🌿 MongoDB connected successfully.");
  } catch (error) {
    logger.error(`\n ❌ Error while connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
