
import User from '../models/User.js';
import Task from '../models/Task.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({role:"user"}).select("-password"); //  

     const userWithTaskCounts = await Promise.all(users.map(async (user) => {
       const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "pending" });
       const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "inProgress" });
       const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "completed" });
       return { ...user._doc,  pendingTasks, inProgressTasks, completedTasks };
 
    }));
    res.json(userWithTaskCounts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password"); // Exclude password from response
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};