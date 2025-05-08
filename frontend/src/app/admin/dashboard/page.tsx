'use client';

import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/api';
import { API_PATHS } from '@/lib/paths';
import { useRouter } from 'next/navigation';
import {  useEffect, useState } from 'react';
import moment from 'moment';
import InfoCard from '@/components/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '@/components/TaskListTable';
import CustomPieChart from '@/components/CustomPieChart';
import CustomBarChart from '@/components/CustomBarChart';

interface  dashboardData {
  statistics: statistics;
  recentTasks: recentTasks[];
  charts: charts;
}
interface statistics {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

interface recentTasks {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt?: string;
}

interface charts {
  taskDistribution: taskDistribution;
  taskPriorityLevels: taskPriorityLevels;
}

interface taskDistribution {
  pending: number;
  inProgress: number;
  completed: number;
}

interface taskPriorityLevels {
  low: number;
  medium: number;
  high: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const { user,logout } = useAuth();
  const router = useRouter();
  
  const [dashboardData, setDashboardData] = useState<dashboardData>({
    statistics: {
      totalTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
    },
    recentTasks: [],
    charts: {
      taskDistribution: {
        pending: 0,
        inProgress: 0,
        completed: 0,
      },
      taskPriorityLevels: {
        low: 0,
        medium: 0,
        high: 0,
      },
    },
  })

interface taskDistributionData {
  status: string;
  count: number;
}
interface priorityLevelData {
  priority: string;
  count: number;
}


  const [pieChartData, setPieChartData] = useState<taskDistributionData[] | null>(null)

  const [barChartData, setBarChartData] = useState<priorityLevelData[] | null>(null)



   const addThoudsandSeparator = (num: number | string): string => {
    if (num == null) return ""; // handles null or undefined
  
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
  };
  // Prepare Chart Data
const prepareChartData = (data: {
  taskDistribution: {pending: number, inProgress: number, completed: number,All: number};
  taskPriorityLevels: {low: number, medium: number, high: number};
  
}) => {
  const taskDistribution = data?.taskDistribution || null;
  const taskPriorityLevels = data?.taskPriorityLevels || null;

  const taskDistributionData = [
    { status: "pending", count: taskDistribution?.pending || 0 },
    { status: "inProgress", count: taskDistribution?.inProgress || 0 },
    { status: "completed", count: taskDistribution?.completed || 0 },
  ];

  setPieChartData(taskDistributionData);

  const PriorityLevelData = [
    { priority: "low", count: taskPriorityLevels?.low || 0 },
    { priority: "medium", count: taskPriorityLevels?.medium || 0 },
    { priority: "high", count: taskPriorityLevels?.high || 0 },
  ];

  setBarChartData(PriorityLevelData);
};


 const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      setDashboardData(response.data);
      prepareChartData(response.data?.charts || null);
      console.log("response.data",response);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const onSeeMore = () => {
    router.push('/admin/tasks');
  };

  useEffect(()=>{
    getDashboardData()

    return () => {}
  },[])

  return (
  <>
   <div className='card my-5'>
    <div >
      <div className='col-span-3'>
        <h2 >Good Morning! {user?.username}</h2>
        <p className='text-sm md:text: text-[13px] text-gray-400 mt-1.5'>
          {moment().format('MMMM Do YYYY')}
        </p>
      </div>

    </div>
    <div className='grid grid-cols-2 sm-grid-cols-2 md-grid-cols-4 gap-3 mt-5 md:gap-6'>
       <InfoCard
        icon={<IoMdCard/>}
        label='Total Tasks'
        value={addThoudsandSeparator(dashboardData?.statistics?.totalTasks ?? 0)}
        color='bg-blue-500'
       />
       <InfoCard
        icon={<IoMdCard/>}
        label='Pending Tasks'
        value={addThoudsandSeparator(dashboardData?.statistics?.pendingTasks ?? 0)}
        color='bg-violet-500'
       />
       <InfoCard
        icon={<IoMdCard/>}
        label='inProgress Tasks'
        value={addThoudsandSeparator(dashboardData?.statistics?.inProgressTasks ?? 0)}
        color='bg-cyan-500'
    
       />
       <InfoCard
        icon={<IoMdCard/>}
        label='Completed Tasks'
        value={addThoudsandSeparator(dashboardData?.statistics?.completedTasks ?? 0)}
        color='bg-green-500'
       />
       
    </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">

        <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">Task Distribution</h5>
      </div>

      <CustomPieChart
        data={pieChartData!}
    
        colors={COLORS}
      />
    </div>

    <div className="card">
  <div className="flex items-center justify-between">
    <h5 className="font-medium">Task Priority Levels</h5>
  </div>

  <CustomBarChart
    data={barChartData || []}
    colors={COLORS}
  />
</div>


  <div className="md:col-span-2">
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Tasks</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <TaskListTable tableData={dashboardData?.recentTasks || []} />
    </div>
  </div>
</div>


    </>
  );
}
