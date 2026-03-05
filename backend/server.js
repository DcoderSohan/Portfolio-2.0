import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import connectCloudinary from './config/cloudinary.js';

import projectRouter from './routes/project.route.js';
import adminRouter from './routes/admin.route.js';
import messageRouter from './routes/message.route.js';

// Application Configuration
const app = express();
const port = process.env.PORT || 4000;

// Database & Cloudinary Connection
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/project', projectRouter);
app.use('/api/admin', adminRouter);
app.use('/api/message', messageRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
