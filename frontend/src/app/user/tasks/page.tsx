
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // useRouter is used in the App Router
// import axiosInstance from '@/lib/api';
// import { API_PATHS } from '@/lib/paths';
// import { LuFileSpreadsheet } from 'react-icons/lu';
// import TaskStatusTabs from '@/components/TaskStatusTabs';
// import TaskCard from '@/components/TaskCard';

// const MyTasks = () => {
//   const [allTasks, setAllTasks] = useState([]);
//   const [tabs, setTabs] = useState<{ label: string; count: number }[]>([]);
//   const [filterStatus, setFilterStatus] = useState('All');

//   const router = useRouter();

//   const getAllTasks = async (filterStatus:string) => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,
//         {
//           params: {
//             status: filterStatus === 'All' ? '' : filterStatus,
//           },
//         }
//       );
//      console.log('response.data', response.data);
//       setAllTasks(response.data.tasks.length > 0 ? response.data.tasks : []);
//       const statusSummary = response.data.statusSummary || {};

//       const statusArray = [
//         {label: 'All', count: statusSummary.allTasks || 0},
//         {label: "pending", count: statusSummary.pendingTasks || 0},
//         {label: 'inProgress', count: statusSummary.inProgressTasks || 0},
//         {label: 'completed', count: statusSummary.completedTasks || 0},
//       ];
//       setTabs(statusArray);
//     }

//     catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleClick = (taskId:any) => {
//     router.push(`/user/task-details/${taskId}`);
//   };



//   useEffect(() => {
//     getAllTasks(filterStatus);
//   }, [filterStatus]);

//   return (
    
//      <div className="my-5">
//       <div className="flex flex-col md:items-center justify-between">
//           <h2 className="text-xl md:text-xl font-medium">Manage Tasks</h2>

//         {/* {tabs?.[0]?.count > 0 && ( */}
     
//         {tabs?.[0]?.count > 0 && (
          
//             <TaskStatusTabs
//               tabs={tabs}
//               activeTab={filterStatus}
//               setActiveTab={setFilterStatus}
//             />
           
          
//         )}
   
//       </div>

//       <div className="">
//   {allTasks?.length > 0 && allTasks?.map((item:any, index) => (
//     <TaskCard
//       key={item._id}
//       title={item.title}
//       description={item.description}
//       priority={item.priority}
//       status={item.status}
//       progress={item.progress}
//       createdAt={item.createdAt}
//       dueDate={item.dueDate}
//       assignedTo={item.assignedTo?.map((item:any) => item.profileImageUrl)}
//       attachmentCount={item.attachments?.length || 0}
//       completedTodoCount={item.completedTodoCount || 0}
//       todoChecklist={item.todoChecklist || []}
//       onClick={() => {
//         handleClick(item._id);
//       }}
//     />
//   ))}
// </div>

//     </div>

//   );
// };

// export default MyTasks;


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/api';
import { API_PATHS } from '@/lib/paths';
import TaskStatusTabs from '@/components/TaskStatusTabs';
import TaskCard from '@/components/TaskCard';

interface User {
  _id: string;
  username: string;
  profileImageUrl: string;
  email: string;
  role: string;
}
// interface statusSummary{
//   allTasks: number;
//   pendingTasks: number;
//   inProgressTasks: number;
//   completedTasks: number;
// }

interface task{
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  progress: number;
  createdAt: string;
  dueDate: string;
  assignedTo: User[] | User;
  attachments: string[];
  completedTodoCount: number;
  profileImageUrl: string;
  todoChecklist: string[];
  createdBy: string;
}
// interface allTasks {
//   // statusSummary: statusSummary;
//   tasks: task[];
// }

const MyTasks = () => {
  const [allTasks, setAllTasks] = useState<task[] | null>(null);
  const [tabs, setTabs] = useState<{ label: string; count: number }[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const router = useRouter();

  const getAllTasks = async (filterStatus: string) => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === 'All' ? '' : filterStatus,
        },
      });
      console.log('response.dataaaaaa', response.data);

      const tasks = response.data.tasks || [];
      const statusSummary = response.data.statusSummary || {};

      setAllTasks(tasks);

      const statusArray = [
        { label: 'All', count: statusSummary.allTasks || 0 },
        { label: 'pending', count: statusSummary.pendingTasks || 0 },
        { label: 'inProgress', count: statusSummary.inProgressTasks || 0 },
        { label: 'completed', count: statusSummary.completedTasks || 0 },
      ];
      setTabs(statusArray);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleClick = (taskId: string) => {
    router.push(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <div className="my-5">
      <div className="flex flex-col md:items-center justify-between">
        <h2 className="text-xl md:text-xl font-medium">Manage Tasks</h2>

        {tabs?.[0]?.count > 0 && (
          <TaskStatusTabs
            tabs={tabs}
            activeTab={filterStatus}
            setActiveTab={setFilterStatus}
          />
        )}
      </div>

      <div>
        {allTasks && allTasks.length > 0 ? (
          allTasks?.map((item: task) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={
                Array.isArray(item.assignedTo)
                  ? item.assignedTo.map((person: User) => person.profileImageUrl)
                  : [item.assignedTo?.profileImageUrl]
              }
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item._id)}
            />
          ))
        ) : (
          <div className='w-full flex justify-center items-center h-20'>No tasks available.</div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
