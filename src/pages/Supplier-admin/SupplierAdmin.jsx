import React from "react";
import Logo from "../../assets/bildkart-admin-logo.png";
import fav from "../../assets/b-fav.png";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LogoutPopup from "../../components/common/LogoutPopup";
import axios from "axios";



import { AiFillDashboard,  AiFillProduct } from "react-icons/ai";
import {  FaUsers, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdOutlineCreateNewFolder, MdLogout, MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import SupplierAdminHeader from "../../components/supplier/SupplierAdminHeader";
import { FaAngleDown } from "react-icons/fa6";


const SupplierAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [submenuShow, setSubmenuShow] = useState("");
  const [logoutPopupShow, setLogoutPopupShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

   const Navigate = useNavigate();

  // Side Menu Start

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSubmenuShow(0);
  };

  // Sub Menu Start

  const handleShowSubMenu = (n) => {
    if (showSidebar === true) {
      return setSubmenuShow(n === submenuShow ? "" : n);
    }
  };

  
  // Sub Menu End


  // Handle Logout 

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
    { logoutPopupShow &&<LogoutPopup logout={handleLogout} logoutShow={closeLogoutPopup}/>}
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
                className="w-40 pb-6 "
                src={Logo}
                alt="bildkart logo"
              />
            ) : (
              <img className="w-10 pb-9 " src={fav} alt="bildkart favicon" />
            )}
          </div>
          <ul className="flex flex-col gap-3 p-3 pt-0 overflow-y-scroll admin-sidebar h-full ">
          <li className="">
            < Link to={'/supplier-admin'} className="admin-list w-full tabs flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  tabs-icon"> <AiFillDashboard className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 `}> Dashboard </span> </ Link>
            
          </li>
          <li className="">
            < Link to={'brfq'} className="admin-list w-full flex gap-3 text-xl tabs items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center tabs-icon "> <MdOutlineCreateNewFolder className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> New BRFQs </span> </ Link>
            
          </li>
          <li className="">
            < Link to={'my-quotation'} className="admin-list w-full tabs flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center tabs-icon "> <FaShoppingCart className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> My Quotations </span> </ Link>
            
          </li>
          {/* <li className="">
            < Link to={''} className="admin-list w-full flex gap-3 text-xl items-center tabs hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center tabs-icon "> <IoIosNotifications  className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Notifications </span> </ Link>
            
          </li> */}
          <li className="flex flex-col gap-4">
            < button className="relative admin-list w-full flex gap-3 justify-between text-xl tabs items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer" onClick={()=>handleShowSubMenu("product")}> <div className="flex gap-3 items-center"> <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  "> <AiFillProduct className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Products   </span> </div> <span className="text-neutral-400 text-xl"> <FaAngleDown /> </span>
             </ button>
            {submenuShow === "product" && <ul className={`pl-14 list-disc flex flex-col gap-5`}>
              <li><Link to={"category"} className="text-xl cursor-pointer"> Category</Link></li>
              <li><Link to={"sub-category"} className="text-xl cursor-pointer">Sub Category</Link></li>
              <li><Link to={"specification"} className="text-xl cursor-pointer">Specification</Link></li>
              <li><Link to={"catalog"} className="text-xl cursor-pointer">Create Catalog </Link></li>
              <li><Link to={"product-list"} className="text-xl cursor-pointer">Product List </Link></li>
            </ul>}
            
          </li>
          <li className="flex flex-col gap-4">
            < button className="relative admin-list w-full flex gap-3 tabs justify-between text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer" onClick={()=>handleShowSubMenu("order")}> <div className="flex gap-3 items-center"> <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  "> <FaShoppingCart className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Orders   </span> </div> <span className="text-neutral-400 text-xl"> <FaAngleDown /> </span>
             </ button>
            {submenuShow === "order" && <ul className={`pl-14 list-disc flex flex-col gap-5`}>
              <li><Link to={"order"} className="text-xl cursor-pointer"> Order </Link></li>
              <li><Link to={"order-history"} className="text-xl cursor-pointer">Order History</Link></li>
              <li><Link to={""} className="text-xl cursor-pointer">Invoice</Link></li>
              
            </ul>}
            
          </li>
          
          <li className="">
            <Link to={"profile"} className="admin-list w-full tabs flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center tabs-icon "> <FaUserCircle className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Profile </span> </ Link>
            
          </li>
          <li className="">
            <Link to={"change-password"} className="admin-list w-full tabs flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center tabs-icon "> <MdOutlinePublishedWithChanges className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Change Password </span> </ Link>
            
          </li>
          <li className="">
            <button onClick={()=>setLogoutPopupShow(true)} className="admin-list w-full tabs flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"> <span className="bg-emerald-500 text-white h-8 w-8 min-w-8 tabs-icon rounded-full flex justify-center items-center  "> <MdLogout className="text-xl "/></span>  <span className={`${showSidebar ? "opacity-100" : "opacity-0"} transition-all duration-300 capitalize `}> Logout </span> </ button>
            
          </li>

            </ul>
        </div>
        <div className={`flex-1 ${showSidebar ? "pl-74" :"pl-22"} transition-all duration-300  bg-stone-100 min-h-screen w-full`}>
            <SupplierAdminHeader/>
            <Outlet/>
        </div>
      </div>
    </>
  );
};

export default SupplierAdmin;
