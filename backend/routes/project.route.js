import express from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import adminAuth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const projectRouter = express.Router();

projectRouter.get("/list", getProjects);
projectRouter.post("/add", adminAuth, upload.single('image'), createProject);
projectRouter.post("/update/:id", adminAuth, upload.single('image'), updateProject);
projectRouter.delete("/remove/:id", adminAuth, deleteProject);

export default projectRouter;
