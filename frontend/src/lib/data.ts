import {
  LayoutDashboard,
  ClipboardCheck,
  SquarePlus,
  Users,
  LogOut,
} from 'lucide-react';

import { LuClipboardCheck, LuLogOut } from 'react-icons/lu';

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Manage Tasks",
    icon: ClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: "03",
    label: "Create Task",
    icon: SquarePlus ,
    path: "/admin/create-task",
  },
  {
    id: "04",
    label: "Users",
    icon: Users,
    path: "/admin/users"
  },
  {
    id: "05",
    label: "Logout",
    icon: LogOut,
    path: "/auth/login",
  }
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "My Tasks",
    icon: LuClipboardCheck,
    path: "/user/tasks",
  },
  {
    id: "03",
    label: "Logout",
    icon: LuLogOut,
    path: "/auth/login",
  },
];

export const PRIORITY_DATA = [
    {label: "Low", value: "low"},
    {label: "Medium", value: "medium"},
    {label: "High", value: "high"},
];

export const STATUS_DATA = [
    {label: "Pending", value: "pending"},
    {label: "In Progress", value: "inProgress"},
    {label: "Completed", value: "completed"},
];