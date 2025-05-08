import express from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
// import { upload } from '../middleware/uploadMiddleware.js';
import multer from 'multer';
const storage = multer.memoryStorage(); // or configure disk storage
const upload = multer({ storage });
const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,upload.single("profileImageUrl"),updateUserProfile);

// router.post("/upload-image",upload.single("image"), async (req, res) => {
 
//     if (!req.file) {
//         return res.status(400).json({ error: "No image uploaded" });
//     }
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// })

export default router;
