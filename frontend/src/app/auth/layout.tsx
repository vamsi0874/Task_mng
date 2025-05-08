// import Image from 'next/image'
import React from 'react'

const Authlayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div className="flex">
       
        <div className="w-full h-screen bg-gray-50 px-12 pt-8 pb-12"> 
            <h2 className=' text-xl font-bold text-black'>Task Manager</h2>
        {children}
        </div>
        {/* <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 overflow-hidden bg-no-repeat bg-center bg-cover bg-[url("/logx.png")]'>
            <Image src="/logx.png" alt="auth" width={500} height={500} className='w-64 lg:w-[900%] object-cover' />
        </div> */}
    </div>
  )
}

export default Authlayout