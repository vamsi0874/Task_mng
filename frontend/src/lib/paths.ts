
export const API_PATHS = {
    AUTH: {
      REGISTER: "/api/auth/register", // Register a new user (Admin or Member)
      LOGIN: "/api/auth/login",       // Authenticate user & return JWT token
      GET_PROFILE: "/api/auth/profile" // Get logged-in user details
    },
  
    USERS: {
      GET_ALL_USERS: "/api/users", // Get all users (Admin only)
      GET_USER_BY_ID: (userId: string) => `/api/users/${userId}`, // Get user by ID
      CREATE_USER: "/api/users", // Create a new user (Admin only)
      UPDATE_USER: (userId: string) => `/api/users/${userId}`, // Update user details
      DELETE_USER: (userId: string) => `/api/users/${userId}`  // Delete a user
    },
  
    TASKS: {
      GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", // Get Admin Dashboard Data
      GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", // Get User Dashboard Data
      GET_ALL_TASKS: "/api/tasks", // Get all tasks (Admin: all, User: only assigned)
      CREATE_TASK: "/api/tasks", // Create a new task (Admin only)
      GET_TASK_BY_ID: (taskId: string) => `/api/tasks/${taskId}`, // Get task by ID
      UPDATE_TASK: (taskId: string) => `/api/tasks/${taskId}`, // Update task
      DELETE_TASK: (taskId: string) => `/api/tasks/${taskId}`, // Delete task (Admin only)
      UPDATE_TASK_STATUS: (taskId: string) => `/api/tasks/${taskId}/status`, // Update task status
      UPDATE_TODO_CHECKLIST: (taskId: string) => `/api/tasks/${taskId}`, // Update checklist
      
    },
  
    REPORTS: {
      EXPORT_TASKS: "/api/reports/export/tasks" // Download all tasks as Excel
    }
  };
  