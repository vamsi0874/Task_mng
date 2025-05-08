// "use client"
// import { useAuth } from "@/context/AuthContext"
// import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "@/lib/data"

// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import React, { useEffect, useState } from "react"
// import { Camera, Mail, User } from "lucide-react";


// const Sidebar = ( {activeMenu}:any ) => {
   
    
//     const { user, clearUser, updateProfile ,isUpdatingProfile } = useAuth()
//     const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null);
//     const [sideMenuData, setSideMenuData] = useState<any>([])
//     const router = useRouter()
//     const handleClick = (path:string) => {
//          if(path === '/auth/login'){
//             clearUser()
//          }
        
//         router.push(path)
//     }

    
// //   const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target?.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();

// //     reader.readAsDataURL(file);

// //     reader.onload = async () => {
// //       const base64Image = reader.result;
// //       setSelectedImg(base64Image);
// //       console.log("base64Image",base64Image);
// //     //   await updateProfile({ profileImageUrl: base64Image });
// //     };
// //   };
// const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target?.files?.[0];
//     if (!file) return;

//     setSelectedImg(URL.createObjectURL(file)); 

//   await updateProfile(file);

    
 
//     };

  
//     useEffect(()=>{
//         if(user){
            
//             setSideMenuData(user?.role==="admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
//         }
//     },[user])
//     return (
//         <div className="w-64 h-calc(100vh-61px) bg-white border-r border-gray-200 sticky top-[61px] z-20">
//             <div className="flex flex-col items-center justify-center mb-7 pt-5">
//                 <div className="relative">
//                     <Image
//                     className="w-20 h-20 bg-slate-400 rounded-full"
//                     src={user?.profileImageUrl || "/logx.png"} alt="logo" width={100} height={100} />
//                     <label
//                 htmlFor="avatar-upload"
//                 className={`
//                   absolute bottom-0 right-0 
//                   bg-base-content hover:scale-105
//                   p-2 rounded-full cursor-pointer 
//                   transition-all duration-200
//                   ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
//                 `}
//               >
//                 <Camera className="w-5 h-5 text-white" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
                   
//                 </div>
                
//                 {user?.role==="admin" && (
//                     <div className="text-[10px]
//                     font-medium text-black px-3 py-0.5 rounded mt-1">
//                         Admin
//                     </div>
//                 )}
                
//                 <h5 className="text-gray-950 font-medium leading-5 mt-3">{user?.username}</h5>
//             </div>
//              {sideMenuData.map((item:any,index:number) => (

//                 <button
//                 key={index}
//                 onClick={() => handleClick(item.path)}
//                 className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-3 cursor-pointer text-black hover:bg-gray-100 ${
//                     activeMenu === item.label
//                       ? 'bg-gradient-to-r from-blue-50/40 to-blue-100/50 text-primary border-r-[3px] border-blue-500'
//                       : ''
//                   }`}
                  
//                 >
//                     <item.icon className="text-xl"/>
//                     {item.label}
//                 </button>
//              ))}
//         </div>
//     )
// }

// export default Sidebar

"use client"
import { useAuth } from "@/context/AuthContext"
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "@/lib/data"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Camera, Mail, User } from "lucide-react";
import Notifications from "./Notifications"
import Socket from "./Socket"

type IconType = React.ComponentType<{ className?: string }>;

const Sidebar = ( {activeMenu}:{activeMenu:string}) => {
   
    
    const { user, clearUser, updateProfile ,isUpdatingProfile } = useAuth()
    const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null);
    const [sideMenuData, setSideMenuData] = useState<{
      id:string,
      label:string,
      icon:IconType,
      path:string
    }[] | null>(null)
    const router = useRouter()
    const handleClick = (path:string) => {
         if(path === '/auth/login'){
            clearUser()
         }
        
        router.push(path)
    }

    
//   const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target?.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       console.log("base64Image",base64Image);
//     //   await updateProfile({ profileImageUrl: base64Image });
//     };
//   };
const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    setSelectedImg(URL.createObjectURL(file)); 

  await updateProfile(file);

    };
    useEffect(()=>{
        if(user){
            
            setSideMenuData(user?.role==="admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
        }
    },[user])
    return (
        <div className="w-64 h-calc(100vh-61px) bg-white border-r border-gray-200 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center mb-7 pt-5">
                <div className="relative">
                    <Image
                    className="w-20 h-20 bg-slate-400 rounded-full"
                    src={user?.profileImageUrl || "/avatar.png"} alt="logo" width={100} height={100} />
                    <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-black" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
                   
                </div>
                
                {user?.role==="admin" && (
                    <div className="text-[10px]
                    font-medium text-black px-3 py-0.5 rounded mt-1">
                        Admin
                    </div>
                )}
                
                <h5 className="text-gray-950 font-medium leading-5 mt-3">{user?.username}</h5>
            </div>
             {sideMenuData?.map((item:{
               id:string,
               label:string,
               icon:IconType,
               path:string
             },index:number) => (
              <div key={index}>
                {index === 2 && user && (
                <div>
                  <Notifications />
                </div>
              )}
                <button
                
                onClick={() => handleClick(item.path)}
                className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-3 cursor-pointer text-black hover:bg-gray-100 ${
                    activeMenu === item.label
                      ? 'bg-gradient-to-r from-blue-50/40 to-blue-100/50 text-primary border-r-[3px] border-blue-500'
                      : ''
                  }`}
                >
                   <item.icon className="w-5 h-5"/>
                    {item.label}
                </button>
                </div>
             ))}
                <Socket/>
        </div>
    )
}

export default Sidebar