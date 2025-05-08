import express from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
const storage = multer.memoryStorage(); // or configure disk storage
const upload = multer({ storage });
const router = express.Router();

router.post("/register", registerUser);


router.post("/login", loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,upload.single("profileImageUrl"),updateUserProfile);


export default router;
