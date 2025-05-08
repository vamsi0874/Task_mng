import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import dotenv from 'dotenv';
import cloudinary from '../lib/cloudinary.js';
dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
    // const { username, email, password,profileImageUrl, role , adminInviteToken } = req.body;
    const { username, email, password } = req.body;
    // console.log("req.body",req.body);
    const adminInviteToken = req.body.adminInviteToken || "";

    console.log("adminInviteToken",adminInviteToken);
  
    const profileImageUrl = req.body.profileImageUrl || "";

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let role = "user";
    
   
    if (adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = 'admin';
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword, profileImageUrl, role });

    await user.save();
    res.status(201).json({ 
      token: generateToken(user._id),
      user
     });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    
    res.json({ token: generateToken(user._id),  user});
  } catch (err) {
    res.status(500).json({ message:"server error",error: err.message });
  }
}

export const getUserProfile = async (req, res) => {
  const userId = req.user.userId; // Assuming you have middleware to set req.user
  const user = await User.findById(userId).select("-password"); // Exclude password from response
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({user});
}
export const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    // Convert file buffer to base64 (for Cloudinary or similar)
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(base64Image);
  // console.log("uploadResponse",uploadResponse);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImageUrl: uploadResponse.secure_url },
      { new: true }
    );


    res.json({
      message: "User updated successfully",
     user: {username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
     
      profileImageUrl: updatedUser.profileImageUrl,
      _id: updatedUser._id
    },
    token: generateToken(updatedUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
