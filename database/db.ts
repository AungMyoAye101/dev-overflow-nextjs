import mongoose from "mongoose";

let connected = false as boolean;

const url = process.env.MONGODB_URI as string;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!url) {
    return console.error("MongoDB URI is required");
  }
  if (!connected) return console.log("MongoDB is connected.");
  try {
    await mongoose.connect(url, {
      dbName: "DevOverFlow",
    });
    connected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;
