// import { useState } from "react";
// import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
// import { LuPaperclip } from "react-icons/lu";

// const AddAttachmentsInput = ({ attachments, setAttachments }:any) => {
//     const [option, setOption] = useState("");
  
//     // Function to handle adding an option
//     const handleAddOption = () => {
//       if (option.trim()) {
//         setAttachments([...attachments, option.trim()]);
//         setOption("");
//       }
//     };
  
//     // Function to handle deleting an option
//     const handleDeleteOption = (index:number) => {
//       const updatedArr = attachments.filter((_:any, idx:number) => idx !== index);
//       setAttachments(updatedArr);
//     };
  
//     return (
//     <div>
//       {attachments.map((item: string, index: number) => (
//         <div key={item} className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2">
//         <div className="flex-1 flex items-center gap-3 border border-gray-100">
//           <LuPaperclip className="text-gray-400" />
//           <p className="text-sm text-black">{item}</p>
//         </div>
//         <button
//           className="cursor-pointer"
//           onClick={() => handleDeleteOption(index)}
//         >
//           <HiOutlineTrash className="text-lg text-red-500" />
//         </button>
//         </div>
//       ))}

// <div className="flex items-center gap-5 mt-4">
//         <div className="flex flex-1 items-center gap-3 border border-gray-100 px-3 rounded-md">
//           <LuPaperclip className="text-gray-400" />
//           <input
//             type="file"
//             placeholder="Add File Link"
//             value={option}
//             onChange={({ target }) => setOption(target.value)}
//             className="w-full text-sm outline-none"
//           />
//         </div>
//         <button
//           className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//           onClick={handleAddOption}
//         >
//           <HiMiniPlus className="text-lg" />
//           Add
//         </button>
//       </div>
//     </div>
//     );
//   };
  
//   export default AddAttachmentsInput;
  