"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { useAuth } from "@/context/AuthContext";


export default function Socket() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const { user } = useAuth();

  console.log(isConnected, transport);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
  
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      if (user) {
        console.log('user',user)
        socket.emit("newUser", user._id);
      }
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

  return (
    <div>
     
    </div>
  );
}