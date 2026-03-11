import Project from "../models/projects.model.js";
import { v2 as cloudinary } from 'cloudinary';

// HELPER: Reusable upload function to avoid repeating code
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "projects",
                resource_type: "auto"
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
};

// --- In-Memory Cache (5-minute TTL) ---
let projectCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const invalidateCache = () => {
    projectCache = null;
    cacheTimestamp = 0;
};

// --- Controllers ---

export const getProjects = async (req, res) => {
    try {
        const now = Date.now();

        // Return cached data if still fresh
        if (projectCache && (now - cacheTimestamp) < CACHE_TTL) {
            res.set('Cache-Control', 'public, max-age=300');
            return res.status(200).json({ success: true, projects: projectCache });
        }

        const projects = await Project.find()
            .select("title description image liveLink tags createdAt")
            .sort({ createdAt: -1 })
            .lean();

        // Update cache
        projectCache = projects;
        cacheTimestamp = now;

        res.set('Cache-Control', 'public, max-age=300');
        res.status(200).json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProject = async (req, res) => {
    try {
        const { title, description, liveLink, tags } = req.body;
        const imageFile = req.file;

        if (!title || !description || !liveLink || !tags || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const imageUpload = await uploadToCloudinary(imageFile.buffer);

        const newProject = new Project({
            title,
            description,
            image: imageUpload.secure_url,
            liveLink,
            tags: JSON.parse(tags)
        });

        await newProject.save();
        invalidateCache();
        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Upload failed: " + error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, liveLink, tags } = req.body;

        let updateData = { title, description, liveLink };
        if (tags) updateData.tags = JSON.parse(tags);

        if (req.file) {
            const imageUpload = await uploadToCloudinary(req.file.buffer);
            updateData.image = imageUpload.secure_url;
        }

        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProject) return res.status(404).json({ success: false, message: "Project not found" });

        invalidateCache();
        res.status(200).json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ success: false, message: "Project not found" });

        invalidateCache();
        res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};