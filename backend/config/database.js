import mongoose from 'mongoose';

// Function to connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection pool — reuse connections instead of creating new ones
      maxPoolSize: 10,
      minPoolSize: 2,
      // Timeouts — fail fast instead of hanging
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Buffering — allow commands while connecting
      bufferCommands: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
