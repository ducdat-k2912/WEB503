import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const loginSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const register = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    // Validate dữ liệu
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((e) => e.message);
      return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: messages });
    }

    const {name, email, password } = req.body;

    // Kiểm tra user tồn tại
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

    // Tạo JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "1h" }
    );

    // Trả về kết quả
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
