import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/message.controller.js";
import adminAuth from "../middlewares/auth.js";

const messageRouter = express.Router();

messageRouter.post("/send", sendMessage);
messageRouter.get("/list", adminAuth, getMessages);
messageRouter.delete("/remove/:id", adminAuth, deleteMessage);

export default messageRouter;
