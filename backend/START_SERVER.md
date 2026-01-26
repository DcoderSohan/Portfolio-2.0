# How to Start the Backend Server

## Quick Start Guide

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```

### Step 3: Create .env File
Create a `.env` file in the `backend` folder with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_secret_key
```

**Important:** Replace the placeholder values with your actual credentials.

### Step 4: Make Sure MongoDB is Running

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running on your system
- The connection string should be: `mongodb://localhost:27017/portfolio`

**Option B: MongoDB Atlas (Cloud)**
- Use your MongoDB Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

### Step 5: Start the Server

**For Development (with auto-restart):**
```bash
npm run dev
```

**For Production:**
```bash
npm start
```

### Step 6: Verify Server is Running

You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

Then test the health endpoint:
- Open browser: http://localhost:5000/api/health
- Should return: `{"success":true,"message":"Server is running!"}`

## Troubleshooting

### Error: "Cannot find module"
**Solution:** Run `npm install` in the backend folder

### Error: "MongoDB connection failed"
**Solution:** 
- Check if MongoDB is running
- Verify MONGODB_URI in .env file
- Check MongoDB connection string format

### Error: "Port 5000 already in use"
**Solution:**
- Change PORT in .env file to another port (e.g., 5001)
- Or kill the process using port 5000

### Error: "Cloudinary configuration error"
**Solution:**
- Get your Cloudinary credentials from https://cloudinary.com/console
- Update .env file with correct values

## Common Issues

1. **Server not starting:** Check if all dependencies are installed
2. **Connection refused:** Make sure server is running on port 5000
3. **Database error:** Verify MongoDB connection string
4. **CORS error:** Backend has CORS enabled, but make sure server is running

