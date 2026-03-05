import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return res.json({ success: false, message: "Server configuration error: Admin credentials not found in environment" });
        }

        if (email.trim().toLowerCase() === adminEmail.trim().toLowerCase() && password.trim() === adminPassword.trim()) {
            const token = jwt.sign(adminEmail + adminPassword, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { adminLogin };
