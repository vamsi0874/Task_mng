
import moment from 'moment';




const TaskListTable = ({ tableData }:{tableData:{
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  // assignedTo: any[];
  createdAt: string;
}[]}) => {

  const getStatusBadgeColor = (status:string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-500 border border-green-200';
      case 'Pending': return 'bg-purple-100 text-purple-500 border border-purple-200';
      case 'In Progress': return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
      default: return 'bg-gray-100 text-gray-500 border border-gray-200';
    }
  };

  const getPriorityBadgeColor = (priority:string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-500 border border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-500 border border-orange-200';
      case 'Low': return 'bg-green-100 text-green-500 border border-green-200';
      default: return 'bg-gray-100 text-gray-500 border border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Name</th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Status</th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Priority</th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Created On</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task:{
            _id: string;
            title: string;
            description: string;
            dueDate: string;
            priority: string;
            status: string;
            // assignedTo: any[];
            createdAt: string;
          }) => (
            <tr key={task._id} className="">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-4 py-2">
                {moment(task.createdAt).format('DD/MM/YYYY')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default TaskListTable;

