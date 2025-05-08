const DeleteAlert = ({ content, onDelete }:{content:string,onDelete:()=>void}) => {

    return (
      <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default DeleteAlert;