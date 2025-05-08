import React, { useState } from 'react';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi'; 
import Sidebar from './Sidebar';

const Navbar = ( {activeMenu}:{activeMenu:string}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
 
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50"> 
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
        aria-label="Toggle Menu"
      >
        {openSideMenu ? (
          <HiOutlineX className="h-6 w-6" /> 
        ) : (
          <HiOutlineMenu className="h-6 w-6" />
        )}
      </button>
      <h2 className="text-lg font-medium text-black">Expense Tracker</h2> 
      {openSideMenu && ( 
        <div className="fixed top-[61px] -ml-4 bg-white">
          <Sidebar activeMenu={activeMenu}/>
        </div>
      )}
    </div>
  );
};

export default Navbar;
