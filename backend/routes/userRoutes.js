import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { deleteUser, getUserById, getUsers } from '../controllers/userController.js';

const router = express.Router();


router.get('/', protect, adminOnly, getUsers);


router.get('/:id', protect, protect, getUserById);



router.delete('/:id', protect, adminOnly, deleteUser);


export default router;
