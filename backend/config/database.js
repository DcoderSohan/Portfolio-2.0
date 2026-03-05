import mongoose from 'mongoose';

// Function to connect to database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to database: ${error.message}`);
    // Exit the process if database connection fails
    process.exit(1);
  }
};

export default connectDB;

