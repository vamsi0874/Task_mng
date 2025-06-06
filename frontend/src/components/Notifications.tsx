"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { Bell } from "lucide-react";



const Notifications = () => {
  const [notifications, setNotifications] = useState<{title:string,id?:string}[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('socketttt',socket);
    socket.on("getNotification", (data: {title:string}) => {
        console.log('dataaaaa',data);
      setNotifications((prev) => [...prev, data]);
    });
  }, []);


  const reset = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = (notification: { title: string; id?: string }) => {
    const filteredList = notifications.filter((n) => n.id !== notification.id);
    setNotifications(filteredList);
    setOpen(false);
  };
  return (
    <div className="relative mb-4">
      <div
        className="cursor-pointer p-2 rounded-full hover:bg-gray-200 flex items-center gap-4 text-textGray"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative">
          {notifications.length > 0 && (
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-iconBlue p-2 rounded-full flex items-center justify-center text-sm">
              {notifications.length}
            </div>
          )}
        </div>
        <Bell/>
        <span className=" xxl:inline">Notifications</span>
      </div>
      {open && (
        <div className="absolute top-0 left-40 p-4 bg-red-500 rounded-lg bg-white text-black flex flex-col gap-4 w-max">
          <h1 className="text-xl text-textGray">Notifications</h1>
          {notifications.map((n:{title:string,id?:string}, i) => (
            <div
              className="cursor-pointer"
              key={i}
              onClick={() => handleClick(n)}
            >
              <b>{n.title}</b>{" "}
              
            </div>
          ))}
          <button
            onClick={reset}
            className="bg-black text-white p-2 text-sm rounded-lg"
          >
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;

