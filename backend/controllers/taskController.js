import mongoose from "mongoose";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getDashboardData = async (req, res) => {

  try {
    const totalTasks = await Task.countDocuments({});

    const pendingTasks = await Task.countDocuments({ status: "pending" });
    // console.log("pendingTasks",pendingTasks);
    const inProgressTasks = await Task.countDocuments({ status: "inProgress" });
    const completedTasks = await Task.countDocuments({ status: "completed" });
    const overdueTasks = await Task.countDocuments({ dueDate: { $lt: new Date() }, status: {$ne : "pending"} });

    // ooooooooooo
const taskStatuses = ["pending", "inProgress", "completed"];


    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 }, // Count occurrences of each status
        },
      },
    ]);

   
    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.toLowerCase().replace(/\s+/g, ""); // Remove spaces, lowercase
      
      acc[formattedKey] = taskDistributionRaw.find(item => item._id === status)?.count || 0;
      
      return acc;
    }, {});

    taskDistribution["All"] = totalTasks; // Add total count

    const taskpriorities = ["high", "medium", "low"];
    const taskPrioprityLevelsRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority", // ✅ Correct format
          count: { $sum: 1 }
        }
      }
    ])

    const taskPriorityLevels = taskpriorities.reduce((acc, priority) => {
      const formattedKey = priority.toLowerCase().replace(/\s+/g, ""); // Remove spaces, lowercase
      acc[formattedKey] = taskPrioprityLevelsRaw.find(item => item._id === priority)?.count || 0;
      return acc;
    },{})

    const recentTasks = await Task.find({}).sort({ createdAt: -1 }).limit(10).select("title description dueDate priority status createdAt");
  
   res.json({
    statistics : {
      totalTasks,
      pendingTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
    },
    charts : {
      taskDistribution,
      taskPriorityLevels,
    },
    recentTasks,
   })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserDashboardData = async (req, res) => {
  try {
     const {userId} = req.user; // Get the user ID from the request object
    const totalTasks = await Task.countDocuments({ assignedTo: userId});
   
    console.log('userId',userId);
    
    const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: "pending" });
    const completedTasks = await Task.countDocuments({ assignedTo: userId, status: "completed" });

    const overdueTasks = await Task.countDocuments({ assignedTo: userId, dueDate: { $lt: new Date() }, status: {$ne : "completed"} });

    const taskStatuses = ["pending", "inProgress", "completed"];

    const taskDistributionRaw = await Task.aggregate([
      { 
        $match: { assignedTo:  new mongoose.Types.ObjectId(userId) } 
      },
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 }, // Count occurrences of each status
        },
      }
    ])
    console.log('taskDistributionRaw',taskDistributionRaw);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.toLowerCase().replace(/\s+/g, ""); // Remove spaces, lowercase
      acc[formattedKey] = taskDistributionRaw.find(item => item._id === status)?.count || 0;
      return acc;
    }
    , {});
    taskDistribution["All"] = totalTasks; // Add total count

    const taskpriorities = ["high", "medium", "low"];
    const taskPrioprityLevelsRaw = await Task.aggregate([
      {
        $match: { assignedTo:  new mongoose.Types.ObjectId(userId) } 
      },
      {
        $group: {
          _id: "$priority", // ✅ Correct format
          count: { $sum: 1 }
        }
      }
    ]);

    const taskPriorityLevels = taskpriorities.reduce((acc, priority) => {
      acc[priority] = taskPrioprityLevelsRaw.find(item => item._id === priority)?.count || 0;
      return acc;
    },{});

    const recentTasks = await Task.find({ assignedTo: userId }).sort({ createdAt: -1 }).limit(10).select("title description dueDate priority status createdAt");

    res.json({
      statistics : {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts : {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    })

 
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// export const getTasks = async (req, res) => {
//   try {
//     const {status} = req.query; 
//     console.log('status', status);
  
//     const userRole = await User.findById(req.user.userId);
//     let tasks;
//     if(userRole.role === "admin") {
//        tasks = await Task.find((status==='' ? {} : { status })).populate("assignedTo","username email profileImageUrl").populate("assignedTo.role");
//         // console.log('tasks', tasks);
//     } else {
//       const query = { assignedTo: req.user.userId };

//         if (status && status !== '') {
//           query.status = status;
//         }
//         const tasks = await Task.find(query).populate("assignedTo", "username email profileImageUrl");

//       }
//     tasks = await Promise.all(tasks.map(async (task) => {
//       const completedCount =  task.todoCheckList.filter(item => item.completed).length;
//       return {...task._doc,  completedTodoCount: completedCount};

//     }));

//     const allTasks = await Task.countDocuments(userRole.role === "admin" ? {} : { assignedTo: req.user.userId });

//     // console.log('allTasks', allTasks);

//     const pendingTasks = await Task.countDocuments({ status: "pending",...(userRole.role !== "admin" && { assignedTo: req.user.userId }) });

//     const inProgressTasks = await Task.countDocuments({ status: "inProgress",...(userRole.role !== "admin" && { assignedTo: req.user.userId }) });

//     const completedTasks = await Task.countDocuments({ status: "completed",...(userRole.role !== "admin" && { assignedTo: req.user.userId }) });

//     console.log('tasks', tasks); 
//     res.json({
//       tasks,
//       statusSummary:{
//       allTasks,
//       pendingTasks,
//       inProgressTasks,
//       completedTasks,
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    console.log('status', status);

    const user = await User.findById(req.user.userId);
    let query = {};

    if (user.role !== "admin") {
      query.assignedTo = req.user.userId;
    }

    if (status && status !== '') {
      query.status = status;
    }
  //  console.log('query', query);
    let tasks = await Task.find(query)
      .populate("assignedTo", "username email profileImageUrl role");
    //  console.log('tasks', tasks);
    // Add completedTodoCount to each task
    tasks = await Promise.all(tasks.map(async (task) => {
      const completedCount = task.todoCheckList.filter(item => item.completed).length;
      return { ...task._doc, completedTodoCount: completedCount };
    }));

    // Status summary counts
    const countFilter = user.role === "admin" ? {} : { assignedTo: req.user.userId };

    const allTasks = await Task.countDocuments(countFilter);
    const pendingTasks = await Task.countDocuments({ status: "pending", ...countFilter });
    const inProgressTasks = await Task.countDocuments({ status: "inProgress", ...countFilter });
    const completedTasks = await Task.countDocuments({ status: "completed", ...countFilter });

    res.json({
      tasks,
      statusSummary: {
        allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId).populate("assignedTo","username email profileImageUrl");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, userId,status, assignedTo, attachments, todoCheckList } = req.body;
  try {
    const task = new Task({ title, description, dueDate, priority, userId, assignedTo, attachments, todoCheckList , 
        status,
        createdBy : req.user.userId, 
     });
    await task.save();
    res.json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.priority = req.body.priority || task.priority;
    task.todoCheckList = req.body.todoCheckList || task.todoCheckList;
    task.attachments = req.body.attachments || task.attachments;
    task.assignedTo = req.body.assignedTo || task.assignedTo;

    await task.save();

    // console.log('task', task);

    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(user => user.toString() === req.user.userId.toString());
    
    const isAdmin = await User.findById(req.user.userId).select("role").role;
    
    if(!isAssigned && isAdmin !=="admin") return res.status(403).json({ message: "You are not authorized to update this task" });
    
    task.status = req.body.status;

    if(task.status === "completed") {
      task.todoCheckList.forEach(item => item.completed = true)
      task.progress = 100;
    } 
    await task.save();

    res.json({ message: "Task status updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateTaskChecklist = async (req, res) => {
  const taskId = req.params.id;
  const { todoCheckList } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
     
    const userRole = await User.findById(req.user.userId).select("role");


    if(!task.assignedTo.includes(req.user.userId) && userRole.role !== "admin"){
      return res.status(403).json({ message: "You are not authorized to update this task" });
    }

    task.todoCheckList = todoCheckList;

    const completedCount = todoCheckList.filter(item => item.completed).length;

    const totalCount = todoCheckList.length;

    task.progress = totalCount >0 ? Math.round((completedCount / totalCount) * 100) : 0;
   
    if(task.progress === 100) {
      task.status = "completed";
    } else if(task.progress > 0) {
      task.status = "inProgress";
    } else {
      task.status = "pending";
    }
    await task.save();
   const updatedTask = await Task.findById(taskId).populate("assignedTo","username email profileImageUrl");
    res.json({ message: "Task checklist updated successfully", task: updatedTask });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
    
    
    
// v4 :6814d2353ce4151ade3fc421
//v5 : 6814d26395c66a48d89199d5