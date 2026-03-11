import Message from "../models/messages.model.js";

// --- In-Memory Cache (5-minute TTL) ---
let messageCache = null;
let messageCacheTimestamp = 0;
const MESSAGE_CACHE_TTL = 5 * 60 * 1000;

const invalidateMessageCache = () => {
    messageCache = null;
    messageCacheTimestamp = 0;
};

// Send a new message from public site
export const sendMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMessage = new Message({
            name,
            email,
            phone,
            message
        });

        await newMessage.save();
        invalidateMessageCache();

        res.status(201).json({ success: true, message: "Transmission Successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all messages (Admin Only)
export const getMessages = async (req, res) => {
    try {
        const now = Date.now();

        if (messageCache && (now - messageCacheTimestamp) < MESSAGE_CACHE_TTL) {
            res.set('Cache-Control', 'private, max-age=300');
            return res.status(200).json({ success: true, messages: messageCache });
        }

        const messages = await Message.find().sort({ createdAt: -1 }).lean();

        messageCache = messages;
        messageCacheTimestamp = now;

        res.set('Cache-Control', 'private, max-age=300');
        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a message (Admin Only)
export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        invalidateMessageCache();
        res.status(200).json({ success: true, message: "Record Purged" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
