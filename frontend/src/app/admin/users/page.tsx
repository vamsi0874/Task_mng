'use client';
import UserCard from "@/components/UserCard";
import axiosInstance from "@/lib/api";
import { API_PATHS } from "@/lib/paths";
import { useEffect, useState } from "react";
import { LuFileSpreadsheet } from "react-icons/lu";

const UsersPage = () => {

    const [AllUsers, setAllUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            setAllUsers(response.data);
            console.log('response.data', response.data);
            console.log('response.data', response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDownloadReport = async () => {}

    useEffect(()=>{
        getAllUsers();
        return () => {}
    },[])
  return (
    <div className="mt-5 mb-10">
    <div className="flex md:flex-row md:items-center justify-between">
      <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
      <button
        className="flex md:flex download-btn"
        onClick={handleDownloadReport}
      >
        <LuFileSpreadsheet className="text-lg" />
        Download Report
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {AllUsers?.map((user:{
        _id:string,
        username:string,
        email:string,
        role:string,
        profileImageUrl:string,
        pendingTasks:number,
       inProgressTasks:number,
       completedTasks:number
      }) => (
        <UserCard key={user._id} userInfo={user} />
      ))}
    </div>
  </div>
  );
};

export default UsersPage;

