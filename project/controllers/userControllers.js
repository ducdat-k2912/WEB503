import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //Validate
        if(!name || !email || !password) {
            return res.status(400).json({ message: "Thất bại" });
        }
        //Check user đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        //Create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashedPassword});
        await newUser.save();
        //Generate token 
        const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET || "secret",{ expiresIn: "1d" });
        //Success
        return res.status(201).json({
            message: "Tạo user thành công",
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email},
        });
    } catch (error) {
        console.error("Lỗi server:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}