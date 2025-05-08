
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
    deleteTask, 
    updateTaskStatus,
    updateTaskChecklist,
} from '../controllers/taskController.js' 

router.get("/dashboard-data", protect, adminOnly, getDashboardData); 
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); 
router.get("/:id", protect, getTaskById); 
router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, updateTask); 
router.delete("/:id", protect, adminOnly, deleteTask); 
router.patch("/status/:id", protect, updateTaskStatus); 
router.patch("/checklist/:id", protect, updateTaskChecklist); 

export default router;