import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let conn = await mongoose.connect("mongodb://localhost:27017/Batch1");
    console.log(`Connected to db at ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error connected to db `, err.message);
    process.exit(1);
  }
};

export default connectDB;
