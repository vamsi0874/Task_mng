"use client"
import { useAuth } from "@/context/AuthContext"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { useState } from "react"

const Layout = ({children}:{children:React.ReactNode}) => {
  const { user } = useAuth()
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard")

  if(!user){
    return (
        <div>{children}</div>
    )
  }
    return (
    <div>
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className="flex gap-4">
                <div className="">
                <Sidebar activeMenu={activeMenu}/>
                </div>
                <div className="grow mx-5">{children}</div>
            </div> 
        )}
    </div>
  )
}

export default Layout