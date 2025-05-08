import Task from "../models/Task.js";
import User from "../models/User.js";


export const exportTasksReports = async (req, res) => {
  
    try {
        const tasks = await Task.find({}).populate(
            "assignedTo",
            "username email"
        );

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Priority", key: "priority", width: 25 },
            { header: "Status", key: "status", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
        ];
        tasks.forEach((task) => {
            task.assignedTo = task.assignedTo.map((user) => `${user.username} (${user.email})`).join(", ");
            worksheet.addRow({
                _id: task._id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                status: task.status,
                assignedTo: task.assignedTo || "Unassigned",
            })
        })

        res.setHeaders(
            "Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=tasks.xlsx");

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    }
    catch (err) {
        res.status(500).json({ message: "error exporting tasks error", error: err.message });
    }
}

export const exportUsersReports = async (req, res) => {
   try {
     const users = await User.find({}).select("username email _id").lean()

     const userTasks = await Task.find({}).populate(
        "assignedTo",
        "username email _id")
    const userTasksMap = {}
    users.forEach((user) => {
        userTasksMap[user._id] = {
            name: user.username,
            email: user.email,
            taskCount:0,
            pendingTasks:0,
            inProgressTasks:0,
            completedTasks:0,
        }
    })

    userTasks.forEach((task) => {
        task.assignedTo.forEach((assignedUser) => {
            if (userTasksMap[assignedUser._id]) {
                userTasksMap[assignedUser._id].taskCount += 1
                if (task.status === "pending") {
                    userTasksMap[assignedUser._id].pendingTasks += 1
                } else if (task.status === "inProgress") {
                    userTasksMap[assignedUser._id].inProgressTasks += 1
                } else if (task.status === "completed") {
                    userTasksMap[assignedUser._id].completedTasks += 1
                }
            }
        })
    })
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Tasks Report");
    worksheet.columns = [
       
        { header: "Name", key: "name", width: 30 },
        { header: "Email", key: "email", width: 40 },
        { header: "Total Assigned Tasks", key: "taskCount", width: 20 },
        { header: "Pending Tasks", key: "pendingTasks", width: 20 },
        { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
        { header: "Completed Tasks", key: "completedTasks", width: 30 },
    ];

    Object.keys(userTasksMap).forEach((user) => {
        
        worksheet.addRow(user)
    })
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
   res.setHeader("Content-Disposition", 'attachment; filename="users_report.xlsx"');
 
   return workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
   


} catch (err) {
        res.status(500).json({ message: "error exporting users error", error: err.message });
    }
}
