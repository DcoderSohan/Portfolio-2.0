import Project from "../models/projects.model.js";
import { v2 as cloudinary } from 'cloudinary';

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { title, description, liveLink, tags } = req.body;
        const imageFile = req.file;

        if (!title || !description || !liveLink || !tags || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(fileBuffer);
            });
        };

        const imageUpload = await uploadToCloudinary(imageFile.buffer);
        const imageUrl = imageUpload.secure_url;

        const newProject = new Project({
            title,
            description,
            image: imageUrl,
            liveLink,
            tags: JSON.parse(tags)
        });

        await newProject.save();
        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, liveLink, tags } = req.body;
        const imageFile = req.file;

        let updateData = { title, description, liveLink };
        if (tags) {
            updateData.tags = JSON.parse(tags);
        }

        if (imageFile) {
            const uploadToCloudinary = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(fileBuffer);
                });
            };

            const imageUpload = await uploadToCloudinary(imageFile.buffer);
            updateData.image = imageUpload.secure_url;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
