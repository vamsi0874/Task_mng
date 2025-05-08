'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/api';
import { API_PATHS } from '@/lib/paths';
import moment from 'moment';
import AvatarGroup from '@/components/AvatarGroup';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';


interface User {
  _id: string;
  username: string;
  profileImageUrl: string;
  email: string;
  role: string;
}

interface TodoChecklistItem {
  text: string;
  completed: boolean;
}
interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  progress: number;
  createdAt: string;
  dueDate: string;
  assignedTo: User[];
  attachmentCount: number;
  completedTodoCount: number;
  todoCheckList: TodoChecklistItem[];
  attachments: string[];
}
const ViewTaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  const getStatusTagColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-50 border border-cyan-500/10';
      case 'Completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500/20';
      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500/10';
    }
  };

  const getTaskDetailsByID = async () => {
    try {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId as string));

    console.log('response.kkkkkk',response.data);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };


  
  const updateTodoChecklist = async (index: number) => {
    const prevChecklist = [...(task?.todoCheckList || [])];
    const updatedChecklist = prevChecklist.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
  
 
    setTask((prev) => (prev ? { ...prev, todoCheckList: updatedChecklist } : prev));
  
    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId as string),
        { todoChecklist: updatedChecklist }
      );
  
      if (response.status === 200 && response.data?.task) {
        setTask(response.data.task); 
      } else {
        
        setTask((prev) => (prev ? { ...prev, todoCheckList: prevChecklist } : prev));
      }
    } catch (error) {
      
      console.log('error',error);
      setTask((prev) => (prev ? { ...prev, todoCheckList: prevChecklist } : prev));
    }
  };
  
  

  
  const handleLinkClick = (url: string) => {
    url = 'https://' + url;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID();
    }
    return () => {}
  }, [taskId,getTaskDetailsByID]);

  return (
    <div className="mt-5">
  {task && (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
      <div className="form-card col-span-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">
            {(task)?.title}
          </h2>

          <div
            className={`text-[13px] font-medium ${getStatusTagColor(
              task?.status
            )} px-4 py-0.5 rounded`}
          >
            {task?.status}
          </div>
        </div>

        <div className="mt-4">
            <InfoBox label="Description" value={task?.description} />
        </div>

        <div className='grid grid-cols-12 gap-4 mt-4'>
          <div className='col-span-6 md:col-span-4'>
            <InfoBox label="Priority" value={task?.priority} />
            </div>
            <div>
              <InfoBox label="Due Date" value={task?.dueDate ?
                moment(task?.dueDate).format('DD/MM/YYYY') : 'N/A'
              } />
              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='block text-xs font-medium'>
                  Assigned To
                </label>
                <AvatarGroup avatars={task?.assignedTo.map((item)=>item.profileImageUrl)||[]}
                maxVisible={5}
                />
              </div>
          </div>

                <div className="mt-2">
        <label className="text-xs font-medium text-slate-500">
          Todo Checklist
        </label>

        {task?.todoCheckList?.map((item:TodoChecklistItem, index:number) => (
          <TodoCheckList
            key={`todo_${index}`}
            text={item.text}
            isChecked={item?.completed}
            onChange={() => updateTodoChecklist(index)}
          />
        ))}
      </div>
      {task?.attachments?.length > 0 && (
  <div className="mt-2">
    <label className="text-xs font-medium text-slate-500">
      Attachments
    </label>

    {task?.attachments?.map((link: string, index: number) => (
      <Attachment
        key={`link_${index}`}
        link={link}
        index={index}
        onClick={() => handleLinkClick(link)}
      />
    ))}
  </div>
)}

      </div>
    </div>
  )}
</div>

  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }: { label: string; value: string }) => {
  return (
    <>
    <label
    className='text-xs font-medium text-slate-500'
    >{label}</label>
    <p className='text-sm text-slate-500'>{value}</p>
    </>
  );
};

const TodoCheckList = ({ text }:
  {
    text: string;
    isChecked?: boolean;
    onChange?: () => void;
  }
) => {
  return (
    <div className="flex items-center gap-3 p-3">
      {/* <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm"
      /> */}
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }:{
  link: string;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3 border-r border-gray-100">
        <span className="text-xs text-gray-400 font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className="text-xs text-black">{link}</p>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-400" />
    </div>
  );
};
