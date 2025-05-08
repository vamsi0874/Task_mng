import express from 'express';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { exportTasksReports, exportUsersReports } from '../controllers/reportController.js';

const router = express.Router();

router.get("/export/tasks",protect, adminOnly, exportTasksReports);
router.get("/export/users",protect, adminOnly, exportUsersReports);

export default router;