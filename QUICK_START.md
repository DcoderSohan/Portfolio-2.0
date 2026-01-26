# 🚀 Quick Start Guide - Fix Connection Refused Error

## The Problem
You're seeing `ERR_CONNECTION_REFUSED` because **the backend server is not running**.

## Solution: Start the Backend Server

### Step 1: Open Terminal/Command Prompt
Navigate to the backend folder:
```bash
cd backend
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

### Step 3: Create .env File
Create a file named `.env` in the `backend` folder with this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=any_random_string_here
```

**Important:** 
- Replace `your_cloud_name`, `your_api_key`, `your_api_secret` with your actual Cloudinary credentials
- For MongoDB, use your connection string (local or Atlas)

### Step 4: Start the Server

**Option A: Using npm (Windows/Mac/Linux)**
```bash
npm start
```

**Option B: Using npm with auto-restart (Development)**
```bash
npm run dev
```

**Option C: Using the start script (Windows)**
Double-click `start.bat` in the backend folder

**Option D: Using the start script (Mac/Linux)**
```bash
chmod +x start.sh
./start.sh
```

### Step 5: Verify Server is Running

You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

Then test it:
- Open: http://localhost:5000/api/health
- Should show: `{"success":true,"message":"Server is running!"}`

### Step 6: Keep Server Running
**IMPORTANT:** Keep the terminal window open! The server must stay running for the admin panel and frontend to work.

## Common Issues & Fixes

### ❌ "Cannot find module 'express'"
**Fix:** Run `npm install` in the backend folder

### ❌ "MongoDB connection failed"
**Fix:** 
- Make sure MongoDB is installed and running
- Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env

### ❌ "Port 5000 already in use"
**Fix:** 
- Change PORT in .env to 5001
- Update axiosInstance.js in admin and frontend to use port 5001

### ❌ "Cannot find .env file"
**Fix:** Create `.env` file in the backend folder (see Step 3)

### ❌ Still getting connection refused
**Fix:**
1. Check if server is actually running (look for "Server running on port 5000" message)
2. Make sure you're using the correct port
3. Check firewall settings
4. Try accessing http://localhost:5000/api/health in browser

## Running All Three Servers

You need to run **3 separate terminals**:

1. **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

2. **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Admin Panel** (Terminal 3):
   ```bash
   cd admin
   npm run dev
   ```

All three must be running simultaneously!

## Need Help?

1. Check `backend/START_SERVER.md` for detailed instructions
2. Make sure all dependencies are installed
3. Verify your .env file has correct values
4. Check that MongoDB is running (if using local MongoDB)

