import { prisma } from "../lib/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // check if all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "เปิดกรอกข้อมูลให้ครบ" });
    }
    // check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "รหัสผ่านไม่ตรงกัน" });
    }
    // check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return res.status(400).json({ message: "มีผู้ใช้งานอยู่แล้ว" });
    }
    // create firstuser as admin
    const UserCount = await prisma.user.count();
    const userRole = UserCount === 0 ? "ADMIN" : "USER";
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
      },
    });
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "โปรดกรอกข้อมูลให้ครบ" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "ไม่พบผู้ใช้งาน" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION || "30d",
      }
    );
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
