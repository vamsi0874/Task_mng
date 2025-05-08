
import express from 'express'; 
import { protect, adminOnly } from '../middleware/authMiddleware.js'; 
const router = express.Router();



import {
    getDashboardData,
    getUserDashboardData,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask, // Corrected spelling
    updateTaskStatus,
    updateTaskChecklist, // Corrected spelling and path
} from '../controllers/taskController.js' // Added path to taskController.js

// Task Management Routes
router.get("/dashboard-data", protect, adminOnly, getDashboardData); // Added adminOnly
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get all tasks (Admin: all, User: assigned)
router.get("/:id", protect, getTaskById); // Get task by ID.  Colon for path parameter.
router.post("/", protect, adminOnly, createTask); // Create a task (Admin only)
router.put("/:id", protect, updateTask); // Update task details.  Use PUT for updates.
router.delete("/:id", protect, adminOnly, deleteTask); // Delete a task (Admin only).  Use DELETE.
router.patch("/status/:id", protect, updateTaskStatus); // Update task status.  Use PATCH for partial updates, added status to route.
router.patch("/checklist/:id", protect, updateTaskChecklist); // Update task checklist.  Use PATCH, corrected route.

export default router;