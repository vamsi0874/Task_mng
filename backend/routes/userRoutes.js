import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { deleteUser, getUserById, getUsers } from '../controllers/userController.js';

const router = express.Router();

// GET profile - accessible by any authenticated user
router.get('/', protect, adminOnly, getUsers);

// GET admin dashboard - only accessible by admin
router.get('/:id', protect, protect, getUserById);


// GET manager panel - only accessible by manager
router.delete('/:id', protect, adminOnly, deleteUser);


export default router;
