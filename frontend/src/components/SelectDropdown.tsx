import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }:{
    options:{label:string,value:string}[],
    value:string,
    onChange:(value:{value:string})=>void,
    placeholder:string
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option:{label:string,value:string}) => {
      onChange(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-sm text-black outline-none px-2.5 py-2 bg-white border rounded-md mt-2 flex justify-between items-center"
        >
          
          {value!=="" ? options.find((opt:{
            label:string,
            value:string
          }) => opt.value.toLowerCase() === value.toLowerCase())?.label : placeholder}
          
          <span className="ml-2">{isOpen ? <LuChevronUp classnarotate-180e=""  /> : <LuChevronDown className="" />}</span>
        </button>
  
        {isOpen && (
          <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-1 ">
            {options.map((option:{
              label:string,
              value:string
            }) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default SelectDropdown;