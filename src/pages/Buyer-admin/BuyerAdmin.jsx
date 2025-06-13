import React from "react";
import Logo from "../../assets/bildkart-admin-logo.png";
import fav from "../../assets/b-fav.png";
import BuyerAdminHeader from "../../components/buyer/BuyerAdminHeader";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { IoIosArrowDown } from "react-icons/io";

import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import {  FaUsers, FaShoppingCart, FaHistory } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdOutlineCreateNewFolder, MdLogout, MdLockReset } from "react-icons/md";
import { FaAngleDown, FaCodeCompare } from "react-icons/fa6";
import LogoutPopup from "../../components/common/LogoutPopup";

const BuyerAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [submenuShow, setSubmenuShow] = useState(null);
  const [logoutPopupShow, setLogoutPopupShow] = useState(false);
  // Side Menu Start

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSubmenuShow(0);
  };

  // Sub Menu Start

  const handleSubmenu = (n) => {
    if (showSidebar === true) {
      return setSubmenuShow(n === submenuShow ? null : n);
    }
  };
  // Sub Menu End

  // Navigate

  const Navigate = useNavigate();


  const handleLogout = async()=>{
        setIsLoading(true)
    try {
       
       const logout = await axios.post(`${import.meta.env.VITE_SERVER_URL}user/logout`, {}, {withCredentials: true});
       if(logout.status === 200){
        setLogoutPopupShow(false)
           Navigate("/");
       }
    } catch (error) {
       console.error(error);
    }
    finally{
      setIsLoading(false)
    }
   }

    // Close Logout Popup

  const closeLogoutPopup = ()=>{
    setLogoutPopupShow(false)
  }
  return (
    <>
      { logoutPopupShow && <LogoutPopup logout={handleLogout} logoutShow={closeLogoutPopup} isLoading={isLoading}/>}
      <div className="flex gap-2">
        {/* Sidebar */}
        <div
          className={` ${
            showSidebar ? "w-72" : "w-20"
          } m-4 border-2 border-emerald-500 rounded-4xl app-sidebar z-30 text-white min-h-screen  transition-all duration-300`}
        >
          <div className="flex relative w-full  p-4">
            <span
              className="absolute top-6 -right-4 w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-[0_0_5px_#00000015] cursor-pointer"
              onClick={handleSidebar}
            >
              {" "}
              <MdKeyboardDoubleArrowLeft
                className={`${
                  showSidebar ? "" : "rotate-180"
                } text-black text-2xl transition-all duration-300`}
              />
            </span>
            {showSidebar ? (
              <img
                className="w-40 pb-6"
                src={Logo}
                alt="bildkart logo"
              />
            ) : (
              <img className="w-10 pb-9 " src={fav} alt="bildkart favicon" />
            )}
          </div>
          <ul className="flex flex-col gap-3 p-3 pt-0 overflow-y-scroll admin-sidebar h-full ">
          <li className="">
            < Link to={'/buyer-admin'} className="admin-list w-full flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer tabs"> <span className="bg-emerald-600  tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  "> <AiFillDashboard className="text-xl"/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 `}> Dashboard </span> </ Link>
            
          </li>
          <li className="">
            < Link to={'create-rfq'} className="admin-list w-full flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer tabs"> <span className="bg-emerald-600 tabs-icon  text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  "> <MdOutlineCreateNewFolder className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Create new RFQ </span> </ Link>
            
          </li>
          <li className="">
            < Link to={'my-rfq'} className="admin-list w-full flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer tabs"> <span className="bg-emerald-600 tabs-icon  text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  "> <FaShoppingCart className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> My RFQs </span> </ Link>
            
          </li>
          {/* <li className="">
            < Link to={'compare-quotation'} className="admin-list w-full flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer tabs"> <span className="bg-emerald-600 text-white h-8 w-8 min-w-8 tabs-icon  rounded-full flex justify-center items-center  "> <FaCodeCompare className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Compare Quotation </span> </ Link>
            
          </li> */}
          <li  className="flex flex-col gap-3">
            < button onClick={()=>handleSubmenu("order")} className="admin-list tabs  relative w-full flex  gap-3 text-xl justify-between items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <div className="flex gap-3  items-center"> <span className="bg-emerald-600 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  tabs-icon"> <FaHistory className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Order  </span> </div> <IoIosArrowDown className={`${submenuShow === "order" ? "rotate-180" : "rotate-0"} transition-all duration-300`}/>
            
             </ button>
            <ul className={` ${submenuShow === "order" ? "h-auto": "h-0 hidden"} list-disc overflow-hidden pl-14 flex flex-col gap-4 transition-all duration-800`}>
              <li><Link to={"order"} className="text-xl w-full capitalize"> My Orders </Link></li>
              <li><Link to={"order-history"} className="text-xl w-full capitalize"> order History </Link></li>
            </ul>
            
          </li>
          <li className="">
            < Link to={'change-password'} className="admin-list w-full flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer tabs"> <span className="bg-emerald-600 text-white h-8 w-8 min-w-8 tabs-icon  rounded-full flex justify-center items-center  "> <MdLockReset className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Change Password </span> </ Link>
            
          </li>
          <li>
            <button onClick={()=>setLogoutPopupShow(true)} className="admin-list w-full flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer tabs"><span className="bg-emerald-600 text-white h-8 w-8 min-w-8 tabs-icon  rounded-full flex justify-center items-center  "> <MdLogout className="text-xl "/></span>Logout</button>
          </li>
            </ul>
        </div>
        <div className={`flex-1 ${showSidebar ? "pl-74" :"pl-22"} transition-all duration-300  bg-stone-100 min-h-screen w-full`}>
            <BuyerAdminHeader/>
            <Outlet/>
        </div>
      </div>
    </>
  );
};

export default BuyerAdmin;
