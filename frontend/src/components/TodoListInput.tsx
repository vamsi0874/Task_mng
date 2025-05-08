import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';
/**
 * 
 {title: '', description: '', priority: 'low', dueDate: '', assignedTo: Array(0), …}
assignedTo
: 
[]
attachments
[]
description
""
dueDate
""
priority 
"low"
title
""
todoChecklist[]
 */

interface TodoListItem {
  text:string,
  completed:boolean
}
const TodoListInput = ({ todoList, setTodoList }:
  {
    todoList:TodoListItem[],
    setTodoList:(value:TodoListItem[])=>void
  }
) => {
  const [option, setOption] = useState("");

  // Function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, { text: option.trim(), completed: false }]);
      setOption("");
    }
  };

  // Function to handle deleting an option
  const handleDeleteOption = (index:number) => {
    const updatedArr = todoList.filter((_:TodoListItem, idx:number) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {todoList.map((item:TodoListItem , index: number) => (
            <div 
            className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2'
            >
                <p className='text-sm text-black'>
                    <span className='text-xs text-gray-500 font-semibold mr-2'>
                        {index < 9 ? `0${index + 1}` : `${index + 1}.`}
                    </span>
                    {item.text}
                </p>
                <button
                 className='cursor-pointer'
                  onClick={() => handleDeleteOption(index)}
                >
               <HiOutlineTrash className='text-lg text-red-500'/>
                </button>
            </div>
      ))}

    <div className='flex items-center gap-5 mt-4'>
        <input
        type='text'
        placeholder='Enter Task'
        value={option}
        onChange={(e) => setOption(e.target.value)}
        className='w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md'
        />
        <button
        onClick={handleAddOption}
        className='bg-gray-100 text-black font-medium text-sm px-4 py-1.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nowrap'
        >
            <HiMiniPlus className='text-lg'/>
            Add
            </button>
      </div>
    </div>
  );
};

export default TodoListInput;
