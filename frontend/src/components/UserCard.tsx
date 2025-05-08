import Image from 'next/image';

const UserCard = ({ userInfo }:{
  userInfo : {
    _id:string,
    username:string,
    profileImageUrl:string,
    email:string,
    role:string,
    pendingTasks:number,
    inProgressTasks:number,
    completedTasks:number
  }
}) => {
  return (
    <div className="p-4 rounded-md shadow-md bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
            <Image
              src={userInfo?.profileImageUrl || '/avatar.png'} // Use a default avatar if no image URL
              alt={userInfo?.username || 'Avatar'}
              width={100}
              height={100}
            //   layout="fill"
            //   objectFit="cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{userInfo?.username || 'User Name'}</p>
            <p className="text-xs text-gray-500">{userInfo?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
         <StatCard
           label="Pending"
           count={userInfo?.pendingTasks || 0}
           status="pending"
         />
         <StatCard
           label="inProgress"
           count={userInfo?.inProgressTasks || 0}
           status="inProgress"
         />
         <StatCard
           label="Completed"
           count={userInfo?.completedTasks || 0}
           status="Completed"
         />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }:{
  label:string,
  count:number,
  status:string
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'text-blue-500 bg-blue-50 border border-blue-500/10';
      case 'completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500/20';
      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500/10';
    }
  };

  return (
    <div className={`flex items-center gap-1 rounded-md px-1 py-2 text-xs font-medium ${getStatusColor()}`}>
          <span className='text-xs font-medium'>{count}</span>
          {label}
    </div>
  )

}