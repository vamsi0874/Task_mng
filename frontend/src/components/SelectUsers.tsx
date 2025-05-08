// 'use client'
// import '@/index.css';
// import axiosInstance from "@/lib/api";
// import { API_PATHS } from "@/lib/paths";
// import { useEffect, useState } from "react";
// import { LuUsers } from "react-icons/lu";
// import Modal from "./Modal";
// import Image from "next/image";
// import AvatarGroup from './AvatarGroup';

// const SelectUsers = ({ selectedUsers, setSelectedUsers }:{
//   selectedUsers:string[],
//   setSelectedUsers:any
// }) => {
//     const [allUsers, setAllUsers] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [tempSelectedUsers, setTempSelectedUsers] = useState<string[]>([]);
  
//     const getAllUsers = async () => {
//       try {
//         const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

//       console.log("response.data", response.data);
//         if (response.data?.length > 0) {
//           setAllUsers(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
  
//     const toggleUserSelection = (userId:any) => {
//       console.log("userId", typeof userId);
//       setTempSelectedUsers((prev) =>
//         prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
//       );
//     };

//     const handleAssign = () => {
//         setSelectedUsers(tempSelectedUsers);
//         setIsModalOpen(false);
//       };
      
//       const selectedUserAvatars = allUsers
//         .filter((user:any) => selectedUsers?.includes(user._id))
//         .map((user:any) => user.profileImageUrl);
      
//       useEffect(() => {
//         getAllUsers();
//       }, []);
      
//       useEffect(() => {
//         if (selectedUsers?.length === 0) {
//           setTempSelectedUsers([]);
//         }
//         return () => {};
//       }, [selectedUsers]);
  
//     return <div className="space-y-4 mt-2">
//         {selectedUserAvatars.length ===0 && (
//             <button className="card-btn"
//             onClick={()=>setIsModalOpen(true)}
//             >
//                 <LuUsers className="text-sm" />
//                 Add Users
//             </button>
//         )}

//         {
//             selectedUserAvatars.length > 0 && (
//                 <div className='cursor-pointer'>
//                  <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
//                 </div>
//             )
                
//         }
//         <Modal
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   title="Select Users"
// >
//   <div className="space-y-4 h-[60vh] overflow-y-auto">
//     {allUsers.map((user:any) => (
//       <div key={user._id} className="flex items-center gap-4 p-3 border-b border-gray-200">
//            <Image src={"/logx.png"}
//           alt={user.username}
//           width={50}
//           height={50}
//           className="w-10 h-10 rounded-full"
//         />
//         <div className="flex-1">
//             <p className="text-sm text-gray-800 dark:text-black">
//                 {user.username}
//             </p>
//             <p className="text-[13px] text-gray-500">
//                 {user.email}
//             </p>
//         </div>
//         <input type="checkbox" checked={tempSelectedUsers.includes(user._id)} onChange={() => toggleUserSelection(user._id)}
//         className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none" 
//         />
//       </div>
//     ))}
//   </div>

//   <div className="flex justify-end gap-4 pt-4">
//     <button onClick={()=>setIsModalOpen(false)} className="cursor-pointer">Cancel</button>
//     <button className="flex items-center gap-3 text-[12px] font-medium text-white hover:text-primary
//     bg-primary hover:bg-blue-500 px-4 py-1.5 rounded-lg border border-primary cursor-pointer bg-blue-600" onClick={handleAssign}>Done</button>
//   </div>
//    </Modal>
//     </div>;
//   };
  
//   export default SelectUsers;

'use client'
import '@/index.css';
import axiosInstance from "@/lib/api";
import { API_PATHS } from "@/lib/paths";
import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import Modal from "./Modal";
import Image from "next/image";
import AvatarGroup from './AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }:{
  selectedUsers:string[],
  setSelectedUsers:(value:string[])=>void
}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState<string[]>([]);
  
    const getAllUsers = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      console.log("response.data", response.data);
        if (response.data?.length > 0) {
          setAllUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    const toggleUserSelection = (userId:string) => {
      console.log("userId", typeof userId);
      setTempSelectedUsers((prev) =>
        prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
      };
      
      const selectedUserAvatars = allUsers
        .filter((user:{_id:string}) => selectedUsers?.includes(user._id))
        .map((user:{profileImageUrl:string}) => user.profileImageUrl);
      
      useEffect(() => {
        getAllUsers();
      }, []);
      
      useEffect(() => {
        if (selectedUsers?.length === 0) {
          setTempSelectedUsers([]);
        }
        return () => {};
      }, [selectedUsers]);
  
    return <div className="space-y-4 mt-2">
        {selectedUserAvatars.length ===0 && (
            <button className="card-btn"
            onClick={()=>setIsModalOpen(true)}
            >
                <LuUsers className="text-sm" />
                Add Users
            </button>
        )}

        {
            selectedUserAvatars.length > 0 && (
                <div className='cursor-pointer'>
                 <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </div>
            )
                
        }
        <Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Select Users"
>
  <div className="space-y-4 h-[60vh] overflow-y-auto">
    {allUsers.map((user:{
      username:string,
      profileImageUrl:string,
      _id:string
      email:string
    }) => (
      <div key={user._id} className="flex items-center gap-4 p-3 border-b border-gray-200">
           <Image src={"/logx.png"}
          alt={user.username}
          width={50}
          height={50}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
            <p className="text-sm text-gray-800 dark:text-black">
                {user.username}
            </p>
            <p className="text-[13px] text-gray-500">
                {user.email}
            </p>
        </div>
        <input type="checkbox" checked={tempSelectedUsers.includes(user._id)} onChange={() => toggleUserSelection(user._id)}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none" 
        />
      </div>
    ))}
  </div>

  <div className="flex justify-end gap-4 pt-4">
    <button onClick={()=>setIsModalOpen(false)} className="cursor-pointer">Cancel</button>
    <button className="flex items-center gap-3 text-[12px] font-medium text-white hover:text-primary
    bg-primary hover:bg-blue-500 px-4 py-1.5 rounded-lg border border-primary cursor-pointer bg-blue-600" onClick={handleAssign}>Done</button>
  </div>
   </Modal>
    </div>;
  };
  
  export default SelectUsers;
