# Portfolio Website - Complete Setup Guide

This guide will help you set up the entire portfolio website with backend API, frontend, and admin panel.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)
- Git

## 🚀 Step-by-Step Setup

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Variables
Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### MongoDB Setup
**Option A: Local MongoDB**
- Install MongoDB on your system
- Start MongoDB service
- Use: `mongodb://localhost:27017/portfolio`

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

#### Cloudinary Setup
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Go to Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret
5. Add them to your `.env` file

#### Start Backend Server
```bash
npm start
# or for development with auto-restart
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### 3. Admin Panel Setup

#### Install Dependencies
```bash
cd admin
npm install
```

#### Start Admin Panel
```bash
npm run dev
```

The admin panel will run on `http://localhost:5174` (or another port)

## 📡 API Endpoints

All API endpoints are prefixed with `/api`:

### About
- `GET /api/about` - Get about content
- `PUT /api/about` - Update about content

### Resume
- `GET /api/resume` - Get resume content
- `PUT /api/resume` - Update resume content

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (with image upload)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `GET /api/contact` - Get contact information
- `PUT /api/contact` - Update contact information

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile (with image upload)

## 🎨 Features

### Frontend Website
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Light theme with Poppins font
- ✅ Dynamic content from backend
- ✅ Smooth animations with Framer Motion
- ✅ About, Resume, Projects, Contact pages

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Manage About page content
- ✅ Manage Resume (education, experience, skills)
- ✅ Manage Projects (with image uploads)
- ✅ Manage Contact information
- ✅ Manage Profile (with image upload)

### Backend API
- ✅ RESTful API design
- ✅ MongoDB database
- ✅ Image uploads with Multer + Cloudinary
- ✅ CORS enabled for frontend access
- ✅ Error handling

## 📁 Project Structure

```
Portfolio 2.0/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── aboutController.js
│   │   ├── resumeController.js
│   │   ├── projectController.js
│   │   ├── contactController.js
│   │   └── profileController.js
│   ├── helpers/
│   │   └── cloudinaryHelper.js
│   ├── middlewares/
│   │   └── upload.js
│   ├── models/
│   │   ├── About.js
│   │   ├── Resume.js
│   │   ├── Project.js
│   │   ├── Contact.js
│   │   └── Profile.js
│   ├── routes/
│   │   ├── aboutRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── contactRoutes.js
│   │   └── profileRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   │   ├── axiosInstance.js
│   │   │   └── apiHelpers.js
│   │   └── App.jsx
│   └── package.json
└── admin/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   │   ├── axiosInstance.js
    │   │   └── apiHelpers.js
    │   └── App.jsx
    └── package.json
```

## 🔧 Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check if MongoDB is running and connection string is correct
- **Cloudinary Upload Error**: Verify API credentials in `.env`
- **Port Already in Use**: Change `PORT` in `.env` or kill the process using port 5000

### Frontend Issues
- **API Connection Error**: Make sure backend is running on port 5000
- **CORS Error**: Backend CORS is enabled, check if backend is running

### Admin Panel Issues
- **Cannot Load Data**: Check if backend is running and API endpoints are accessible
- **Image Upload Fails**: Verify Cloudinary credentials in backend `.env`

## 📝 Notes

- All code is written in simple, beginner-friendly language
- Axios instances are centralized in `utils/axiosInstance.js`
- API helpers are in `utils/apiHelpers.js`
- Image uploads use Multer (temporary storage) + Cloudinary (permanent storage)
- All content is managed through the admin panel

## 🎯 Next Steps

1. Start all three servers (backend, frontend, admin)
2. Access admin panel and add your content
3. View your portfolio on the frontend
4. Customize colors, fonts, and styles as needed

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB and backend are running

Happy coding! 🚀

