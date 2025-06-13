import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/bildkart-admin-logo.png";
import fav from "../../assets/b-fav.png";
import DashboardHeader from "../../components/admin/DashboardHeader";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Media Start
import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import { FaUsers, FaCartPlus, FaParachuteBox } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdLockReset } from "react-icons/md";
import { RiContactsBook3Fill } from "react-icons/ri";
import { BsFillChatRightQuoteFill } from "react-icons/bs";
import { FaAngleDown, FaShopLock } from "react-icons/fa6";
import LogoutPopup from "../../components/common/LogoutPopup";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Media End

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [submenuShow, setSubmenuShow] = useState(0);
  const [logoutPopupShow, setLogoutPopupShow] = useState(false)



  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true
    })
  }, [])
  

  const Navigate = useNavigate();
  // Side Menu Start

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSubmenuShow(0);
  };

  // Side Menu End

  // Sub Menu Start

  const handleSubmenu = (n) => {
    if (showSidebar === true) {
      return setSubmenuShow(n === submenuShow ? 0 : n);
    }
  };
  // Sub Menu End


  const logoutShow =()=>{
    setLogoutPopupShow(false)
  }


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
      console.error(error)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <ToastContainer/>
      {logoutPopupShow && <LogoutPopup logout={handleLogout} logoutShow={logoutShow} isLoading={isLoading}/>}
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

          <ul className="flex flex-col gap-3 p-3 pt-0 overflow-y-scroll admin-sidebar h-[80vh] ">
            <li className="">
              <Link
                to={"/admin"}
                className="admin-list w-full tabs flex gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"
              >
                {" "}
                <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  ">
                  {" "}
                  <AiFillDashboard className="text-xl " />
                </span>{" "}
                <span
                  className={`${
                    showSidebar ? "opacity-100" : "opacity-0"
                  } transition-all duration-300 `}
                >
                  {" "}
                  Dashboard{" "}
                </span>{" "}
              </Link>
            </li>
            <li className="">
              <button
                className={` ${
                  submenuShow === 1 && "mb-4"
                } admin-list w-full tabs  flex gap-2 text-xl items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(1)}
              >
                <div className="flex items-center justify-center gap-2">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center ">
                    {" "}
                    <FaUsers className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    {" "}
                    User Management{" "}
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 1 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"buyer"} className="capitalize text-xl ">
                    Manage Buyer
                  </Link>
                </li>
                <li>
                  <Link to={"suppliers"} className="capitalize text-xl ">
                    Manage Supplier
                  </Link>
                </li>
              </ul>
            </li>
            <li className="">
              <button
                className={` ${
                  submenuShow === 4 && "mb-4"
                } admin-list w-full tabs flex gap-2 text-xl items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(4)}
              >
                <div className="flex items-center justify-center gap-2">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center ">
                    {" "}
                    <FaUsers className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    {" "}
                    RFQ Management{" "}
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 4 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"rfq-list"} className="capitalize text-xl ">
                    RFQ List
                  </Link>
                </li>
                {/* <li>
                  <Link to={""} className="capitalize text-xl ">
                    Negotiations
                  </Link>
                </li> */}
                <li>
                  <Link to={"approved-rfq"} className="capitalize text-xl ">
                    Approved RFQ{" "}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="">
            <button
                className={` ${
                  submenuShow === 5 && "mb-4"
                } admin-list w-full tabs flex gap-3 text-xl items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(5)}
              >
                <div className="flex items-center justify-center gap-3">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center ">
                    {" "}
                    <FaShopLock className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    Manage BRFQ
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 5 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"brfq"} className="capitalize text-xl ">
                    Send BRFQ
                  </Link>
                </li>
                {/* <li>
                  <Link to={""} className="capitalize text-xl ">
                    Track BRFQ
                  </Link>
                </li> */}
             
              </ul>
            </li>
            <li className="">
            <button
                className={` ${
                  submenuShow === 6 && "mb-4"
                } admin-list w-full  flex gap-3 text-xl tabs items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(6)}
              >
                <div className="flex items-center justify-center gap-3">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center ">
                    {" "}
                    <FaShopLock className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    Manage VRFQ
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 6 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"vrfq"} className="capitalize text-xl ">
                    Send VRFQ
                  </Link>
                </li>
                <li>
                  <Link to={"vrfq/compare-quotation"} className="capitalize text-xl ">
                    Compare Quotation
                  </Link>
                </li>
                {/* <li>
                  <Link to={""} className="capitalize text-xl ">
                    Track VRFQ
                  </Link>
                </li> */}
                {/* <li>
                  <Link to={""} className="capitalize text-xl ">
                   VRFQ Evaluation
                  </Link>
                </li> */}
             
              </ul>
            </li>


            <li className="">
              <button
                className={` ${
                  submenuShow === 7 && "mb-4"
                } admin-list w-full tabs flex gap-3 text-xl items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(7)}
              >
                <div className="flex items-center justify-center gap-3">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8 rounded-full flex justify-center items-center ">
                    {" "}
                    <FaParachuteBox className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    {" "}
                    Create RFQ{" "}
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 7 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"create-rfq"} className="capitalize text-xl ">
                    category
                  </Link>
                </li>
                
                
                
                
              </ul>
            </li>
            <li className="">
              <button
                className={` ${
                  submenuShow === 2 && "mb-4"
                } admin-list w-full tabs flex gap-3 text-xl items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(2)}
              >
                <div className="flex items-center justify-center gap-3">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8 rounded-full flex justify-center items-center ">
                    {" "}
                    <AiFillProduct className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    {" "}
                    Products{" "}
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 2 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"category"} className="capitalize text-xl ">
                    category
                  </Link>
                </li>
                <li>
                  <Link to={"sub-category"} className="capitalize text-xl ">
                    sub category
                  </Link>
                </li>
                <li>
                  <Link to={"specification"} className="capitalize text-xl ">
                    Specification
                  </Link>
                </li>
                <li>
                  <Link to={"catalog"} className="capitalize text-xl ">
                    create catalog
                  </Link>
                </li>
                <li>
                  <Link to={"product-list"} className="capitalize text-xl ">
                    product list
                  </Link>
                </li>
              </ul>
            </li>
            <li className="">
              <button
                className={` ${
                  submenuShow === 3 && "mb-4"
                } admin-list w-full flex gap-3 text-xl tabs items-center justify-between hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer`}
                onClick={() => handleSubmenu(3)}
              >
                <div className="flex items-center justify-center gap-3">
                  {" "}
                  <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center ">
                    {" "}
                    <FaCartPlus className="text-xl" />
                  </span>{" "}
                  <span
                    className={`${
                      showSidebar ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 `}
                  >
                    {" "}
                    Orders{" "}
                  </span>
                </div>{" "}
                <span className="para">
                  <FaAngleDown />
                </span>{" "}
              </button>
              <ul
                className={`${
                  submenuShow === 3 ? "h-full p-5" : "h-0 pl-5"
                } flex flex-col gap-5  pt-0 overflow-hidden list-disc ml-7 transition-all duration-300`}
              >
                <li>
                  <Link to={"order"} className="capitalize text-xl ">
                    New Order{" "}
                  </Link>
                </li>
                <li>
                  <Link to={"order-history"} className="capitalize text-xl ">
                    order history
                  </Link>
                </li>
                {/* <li>
                  <Link to={""} className="capitalize text-xl ">
                    order details
                  </Link>
                </li>
                <li>
                  <Link to={""} className="capitalize text-xl ">
                    invoice
                  </Link>
                </li> */}
              </ul>
            </li>
            <li className="">
              <Link
                to={"inquiries"}
                className="admin-list w-full flex tabs gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"
              >
                {" "}
                <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  ">
                  {" "}
                  <BsFillChatRightQuoteFill className="text-xl" />
                </span>{" "}
                <span
                  className={`${
                    showSidebar ? "opacity-100" : "opacity-0"
                  } transition-all duration-300 `}
                >
                  {" "}
                  Inquiries{" "}
                </span>{" "}
              </Link>
            </li>
            <li className="">
              <Link
                to={"change-password"}
                className="admin-list w-full flex tabs gap-3 text-xl items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"
              >
                {" "}
                <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8  rounded-full flex justify-center items-center  ">
                  {" "}
                  <MdLockReset className="text-xl" />
                </span>{" "}
                <span
                  className={`${
                    showSidebar ? "opacity-100" : "opacity-0"
                  } transition-all duration-300 `}
                >
                  {" "}
                  Change Password
                </span>{" "}
              </Link>
            </li>
            <li className="">
              <Link
                to={"contact"}
                className="admin-list w-full flex gap-3 text-xl tabs items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"
              >
                {" "}
                <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8 rounded-full flex justify-center items-center ">
                  {" "}
                  <RiContactsBook3Fill className="text-xl" />
                </span>{" "}
                <span
                  className={`${
                    showSidebar ? "opacity-100" : "opacity-0"
                  } transition-all duration-300 `}
                >
                  {" "}
                  Contact Us{" "}
                </span>{" "}
              </Link>
            </li>
            <li className="">
              <button
                
                className="admin-list w-full flex gap-3 text-xl tabs items-center hover:bg-white transition-all duration-300 p-2 rounded-lg hover:text-teal-950 cursor-pointer"  onClick={()=>setLogoutPopupShow(true)}
              >
                {" "}
                <span className="bg-emerald-500 tabs-icon text-white h-8 w-8 min-w-8 rounded-full flex justify-center items-center ">
                  {" "}
                  <RiContactsBook3Fill className="text-xl" />
                </span>{" "}
                <span
                  className={`${
                    showSidebar ? "opacity-100" : "opacity-0"
                  } transition-all duration-300 `}
                >
                  {" "}
                  Logout
                </span>{" "}
              </button>
            </li>
          </ul>
        </div>

        <div
          className={`flex-1 ${
            showSidebar ? "pl-76" : "pl-22"
          } transition-all duration-300  bg-stone-100 min-h-screen w-full`}
        >
          <DashboardHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
