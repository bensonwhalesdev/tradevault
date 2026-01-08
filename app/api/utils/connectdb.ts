import mongoose from "mongoose";

const MONGODB_URL = process.env.NEXT_MONGODB_URL;

export async function connectDB() {
  if (!MONGODB_URL) {
    throw new Error("No MONGODB_URL found");
  }

  // If already connected, return early
  if (mongoose.connections[0].readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}
