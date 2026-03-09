import Project from "../models/projects.model.js";
import { v2 as cloudinary } from 'cloudinary';

// HELPER: Reusable upload function to avoid repeating code
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "projects", // Organizes your images in Cloudinary
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

// --- Controllers ---

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
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

        // Upload image using the helper
        const imageUpload = await uploadToCloudinary(imageFile.buffer);

        const newProject = new Project({
            title,
            description,
            image: imageUpload.secure_url,
            liveLink,
            tags: JSON.parse(tags)
        });

        await newProject.save();
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

        res.status(200).json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ success: false, message: "Project not found" });

        res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};