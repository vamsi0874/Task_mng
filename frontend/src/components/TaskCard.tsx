
import { LuPaperclip } from "react-icons/lu";
import AvatarGroup from "./AvatarGroup";
// import AddAttachmentsInput from "./AddAttachmentsInput";
import Progress from "./Progress";
import moment from "moment";

interface TaskCardProps {
    title: string;
    description: string;
    priority: string;
    status: string;
    progress: number;
    createdAt: string;
    dueDate: string;
    assignedTo: string[];
    attachmentCount: number;
    completedTodoCount: number;
    todoChecklist: string[];
    onClick: () => void;
}
const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}: TaskCardProps) => {
    
    const getStatusTagColor = (status:string) => {
        switch (status) {
          case "inProgress":
            return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
          case "Completed":
            return "text-lime-500 bg-lime-50 border border-lime-500/20";
          default:
            return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
      };

      const getPriorityTagColor = (priority:string) => {
        switch (priority) {
          case "high":
            return "text-red-500 bg-red-50 border border-red-500/10";
          case "medium":
            return "text-yellow-500 bg-yellow-50 border border-yellow-500/10";
          case "low":
            return "text-green-500 bg-green-50 border border-green-500/10";
          default:
            return "text-blue-500 bg-blue-50 border border-blue-500/10";
        }
      };
      
    return (
            <div className="bg-white rounded-xl py-4 shadow-md shadow-gray-200 border border-gray-100 cursor-pointer m-4" onClick={onClick}>
              <div className="flex gap-3 px-4">
                <div
                  className={`text-[11px] font-medium ${getStatusTagColor(
                    status
                  )} px-4 py-0.5 rounded`}
                >
                  {status}
                </div>
                <div
                  className={`text-[11px] font-medium ${getPriorityTagColor(
                    priority
                  )} px-4 py-0.5 rounded`}
                >
                  {priority} Priority
                </div>
              </div>
              <div
                className={`px-4 border-l-[3px] ${
                  status === "In Progress"
                    ? "border-cyan-500"
                    : status === "Completed"
                    ? "border-indigo-500"
                    : "border-violet-500"
                }`}
              >
                <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">{title}</p>
                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">{description}</p>
             
                <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px]">
                    Task Done : {""}
                    <span className="font-semibold text-gray-700">
                        {completedTodoCount}/{todoChecklist.length || 0} 
                    </span>
                </p>
                <Progress progress={progress} status={status} />
              </div>   

              <div className="px-4">
                <div className="flex items-center justify-between my-1">
                    <div>
                        <label className="text-xs font-medium text-gray-500">Start Date</label>
                        <p className="text-xs font-medium text-gray-900">{moment(createdAt).format("DD/MM/YYYY")}</p>
                        
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-500">Due Date</label>
                        <p className="text-[13px] font-medium text-gray-900">{moment(dueDate).format("DD/MM/YYYY")}</p>
                        
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <AvatarGroup avatars={assignedTo || []} maxVisible={3} />
                     {attachmentCount > 0 && (
                        <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-full">
                            <LuPaperclip className="text-blue-400" />{""}
                            <span className="text-xs text-gray-900">    
                                {attachmentCount} 
                                </span>
                        </div>
                     )}
                    </div>
                   
                   
                </div>
              </div>
            </div>
          );
    
}

export default TaskCard;