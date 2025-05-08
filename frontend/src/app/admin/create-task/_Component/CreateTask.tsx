'use client';

import '@/index.css';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';
import { PRIORITY_DATA } from '@/lib/data';
import axiosInstance  from '@/lib/api';

import { toast } from 'react-hot-toast';

import moment from 'moment';
import { LuTrash2 } from 'react-icons/lu';
import SelectDropdown from '@/components/SelectDropdown';
import SelectUsers from '@/components/SelectUsers';
import TodoListInput from '@/components/TodoListInput';
// import AddAttachmentsInput from '@/components/AddAttachmentsInput';
import { API_PATHS } from '@/lib/paths';
import Modal from '@/components/Modal';
import DeleteAlert from '@/components/DeleteAlert';
import { socket } from '@/lib/socket';


type TaskData = {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  assignedTo: string[];
  todoChecklist: {text:string, completed:boolean}[];
  attachments?: string[];
};

type AssignedUser = {
  _id: string;
};

type TodoChecklistItem = {
  text: string;
};

const CreateTask = () => {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
 const router = useRouter()



  const [taskData, setTaskData] = useState<TaskData>({
      title: '',
      description: '',
      priority: 'low',
      dueDate: '',
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
 
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (field: string, value: string | string[] | {text:string}[]) => {
    setTaskData((prevState: TaskData) => ({
      ...prevState,
      [field]: value,
    }));

    console.log('taskdata',taskData);
  };
  
  const clearData = ()=>{
    setTaskData({
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
    
  }

  const createTask = async () => {
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item.text,
        completed: false,
      }));
      console.log('taskdataaa',taskData);
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });
      console.log('response.data',response.data);
     if(response.data){
     
        socket.emit("sendNotification", { assignedTo: taskData.assignedTo, title: taskData.title });
     }
      
      toast.success("Task Created Successfully");
    
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
    }
    
  };

  const updateTask = async () => {
    setLoading(true);
  
    try {
     
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task:{text:string, completed:boolean}) => task.text === item.text);
      
        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });
      
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId!),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoCheckList: todolist,
        }
      );
  if(response.status === 200){
    toast.success("Task Updated Successfully");
  }
  } catch (error) {
    console.error("Error updating task:", error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
}

  const handleSubmit = async () => {
    setError(null);
    
    if(taskId){
      
      await updateTask();
      toast.success("Task Updated Successfully");
      return;
    }
   
    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }
  
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
  
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if(!taskData.assignedTo.length){
      setError("Assigned users is required.");
      return;
    }
    if(!taskData.todoChecklist.length){
      setError("Todo list is required.");
      return;
    }

    createTask();
  };
  

  const getTaskDetailsByID = async () => {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId!));
    
    if(response.data){
      const taskInfo = response.data;
       setCurrentTask(taskInfo);

     
      setTaskData(() => ({
       title: taskInfo.title,
       description: taskInfo.description,
       priority: taskInfo.priority,
       dueDate: moment(taskInfo.dueDate).format("YYYY-MM-DD"),
       assignedTo: taskInfo?.assignedTo?.map((item: AssignedUser) => item?._id) || [],
       todoChecklist: taskInfo?.todoChecklist?.map((item: TodoChecklistItem) => item?.text) || [],
       attachments: taskInfo?.attachments || [],
          }));
    }
  }

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId!));
      toast.success("Task Deleted Successfully");
      router.push('/admin/tasks');
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  useEffect(()=>{
    if(taskId){
      getTaskDetailsByID();
    }
  },[taskId])

  return (
    <div className='mt-5'>
      <div className='grid grid-col-1 md:grid-cols-4 mt-4'>
        <div className='form-card col-span-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl md:text-xl font-medium'>
              {taskId ? 'Update Task' : 'Create Task'}
            </h2>
            { taskId && (
                  <button
                    className="flex items-center gap-1.5 
                    text-[13px] font-medium text-rose-500 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                    onClick={() => {
                      setOpenDeleteAlert(true);
                    }}
                  >
                    <LuTrash2 className='text-base' />
                    Delete Task
                  </button>
                   )}
            </div>

          <div className='mt-4 flex flex-col'>
              <label className='text-xs font-medium text-slate-500'>Task Title</label>
              <input
                className='form-input'
                placeholder="Create App UI"
                value={taskData.title}
                onChange={({target})=>handleValueChange(
                       "title",
                       target.value
                    )}
              />
          </div>

           <div className='mt-3 flex flex-col'>
              <label className='text-xs font-medium text-slate-600 p-2'>Description</label>
                <textarea
                  placeholder="Enter Task Description"
                  className='form-input'
                  value={taskData.description}
                  onChange={({target})=>handleValueChange(
                       "description",
                       target.value
                    )}
                />
                </div>

            <div className="mt-3">
              <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">
                    Priority
                  </label>

                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={({value}:{value:string}) => handleValueChange("priority", value)}
                    placeholder="Select Priority"
                  />
                </div>


                <div className='col-sapn-6 md:col-span-4'>
                  <label className='text-xs font-medium text-slate-600'>
                    Due Date
                  </label>
                  <input 
                  type='date'
                  className="form-input" placeholder="Due Date" 
                  value={taskData.dueDate} onChange={({target})=>handleValueChange("dueDate", target.value)}/>
                </div>

                <div className='col-sapn-12 md:col-span-3'>
                  <label className='text-xs font-medium text-slate-600'>Assigned To</label>
                  <SelectUsers 
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value:string[])=>handleValueChange("assignedTo", value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
               <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value:{text:string,completed:boolean}[]) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

        {/* <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">
            Add Attachments
          </label>

          <AddAttachmentsInput
            attachments={taskData?.attachments}
            setAttachments={(value:any) =>
              handleValueChange("attachments", value)
            }
          />
        </div> */}
       {error && <p className="text-sm text-red-600">{error}</p>}
        
        <div className='flex justify-end mt-7'>
          <button
          className='cursor-pointer border border-gray-100 px-4 py-1.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nowrap'
          onClick={handleSubmit}
          disabled={loading}
          >
            {taskId ? "Update Task" : "Create Task"}
          </button>
        </div>
        </div>
      </div>

          <Modal
      isOpen={openDeleteAlert}
      onClose={() => setOpenDeleteAlert(false)}
      title="Delete Task"
    >
      <DeleteAlert
        content="Are you sure you want to delete this task?"
        onDelete={() => deleteTask()}
      />
    </Modal>

    </div>
  );
};

export default CreateTask;

