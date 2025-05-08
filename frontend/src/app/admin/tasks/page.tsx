'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter is used in the App Router
import axiosInstance from '@/lib/api';
import { API_PATHS } from '@/lib/paths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '@/components/TaskStatusTabs';
import TaskCard from '@/components/TaskCard';
interface User {
  _id: string;
  username: string;
  profileImageUrl: string;
  email: string;
  role: string;
}
interface item {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  progress: number;
  createdAt: string;
  dueDate: string;
  assignedTo: User[];
  attachments: string[];
  completedTodoCount: number;
  profileImageUrl: string;
  todoChecklist: string[];
}
const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState<{ label: string; count: number }[]>([]);
  const [filterStatus, setFilterStatus] = useState('All');

  const router = useRouter();

  const getAllTasks = async (filterStatus:string) => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,
        {
          params: {
            status: filterStatus === 'All' ? '' : filterStatus,
          },
        }
      );
     console.log('response.data', response.data);
      setAllTasks(response.data.tasks.length > 0 ? response.data.tasks : []);
      const statusSummary = response.data.statusSummary || {};

      const statusArray = [
        {label: 'All', count: statusSummary.allTasks || 0},
        {label: 'pending', count: statusSummary.pendingTasks || 0},
        {label: 'inProgress', count: statusSummary.inProgressTasks || 0},
        {label: 'completed', count: statusSummary.completedTasks || 0},
      ];
      setTabs(statusArray);
    }

    catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleClick = (taskData:{_id:string}) => {
    router.push(`/admin/create-task?taskId=${taskData?._id}`);
  };

  const handleDownloadReport = async () => {
    // Logic to handle report download
  };

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    
     <div className="my-5">
      <div className="flex flex-col md:items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl md:text-xl font-medium">Manage Tasks</h2>
          <button
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium  hover:bg-primary-dark cursor-pointer"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet />
            Download Report
          </button>
        </div>

    
        {tabs?.[0]?.count > 0 && (
          <div className='flex items-center gap-3'>
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
            <button>
             <LuFileSpreadsheet />
            </button>
          </div>
        )}
   
      </div>

      <div className="">
  {allTasks?.map((item:item) => (
    <TaskCard
      key={item._id}
      title={item.title}
      description={item.description}
      priority={item.priority}
      status={item.status}
      progress={item.progress}
      createdAt={item.createdAt}
      dueDate={item.dueDate}
      assignedTo={item.assignedTo.map((item:User) => item.profileImageUrl)}
      attachmentCount={item.attachments?.length || 0}
      completedTodoCount={item.completedTodoCount || 0}
      todoChecklist={item.todoChecklist || []}
      onClick={() => {
        handleClick(item);
      }}
    />
  ))}
</div>

    </div>

  );
};

export default ManageTasks;

