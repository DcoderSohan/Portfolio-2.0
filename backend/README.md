# Portfolio Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend folder with the following:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Cloudinary Setup
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Get your Cloud Name, API Key, and API Secret from the dashboard
4. Add them to your `.env` file

### 4. MongoDB Setup
- Install MongoDB locally, OR
- Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
- Update MONGODB_URI in `.env` file

### 5. Run the Server
```bash
npm start
# or for development with auto-restart
npm run dev
```

## API Endpoints

- GET `/api/about` - Get about content
- PUT `/api/about` - Update about content
- GET `/api/resume` - Get resume content
- PUT `/api/resume` - Update resume content
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project (with image)
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project
- GET `/api/contact` - Get contact info
- PUT `/api/contact` - Update contact info
- GET `/api/profile` - Get profile
- PUT `/api/profile` - Update profile (with image)

