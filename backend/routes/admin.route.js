import express from "express";
import { adminLogin, verifyAdmin } from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/verify", adminAuth, verifyAdmin);

export default adminRouter;
