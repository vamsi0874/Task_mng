"use client"
import { useAuth } from "@/context/AuthContext"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const Layout = ({children}:{children:React.ReactNode}) => {
  const { user } = useAuth()
  // const [activeMenu, setActiveMenu] = useState<string>("Dashboard")

  if(!user){
    return (
        <div>{children}</div>
    )
  }
    return (
    <div>
        <Navbar />

        {user && (
            <div className="flex gap-4">
                <div className="">
                <Sidebar />
                </div>
                <div className="grow mx-5">{children}</div>
            </div> 
        )}
    </div>
  )
}

export default Layout