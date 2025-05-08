"use client"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const {user, loading} = useAuth()
 const router = useRouter()

 useEffect(()=>{
  console.log('User role:', user);
 },[user])
 
  if(loading){
    return <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900'></div>
    </div>
  }
  if(!user){
       router.push('/auth/login')
  }
  useEffect(()=>{
     console.log('User role:', user?.role);
  },[user])


  return user?.role === 'admin' ? (router.push('/admin/dashboard')) : (router.push('/user/dashboard'))
}

export default page
