import React, {useState, useEffect} from 'react'
import { IoIosNotifications } from "react-icons/io";
import AdminImg from '../../assets/admin-img.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from "framer-motion";
import axios from 'axios';


import { FaArrowLeft } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const SupplierAdminHeader = () => {
  const [showProfileTab, setShowProfileTab] = useState(false);
  const [showNotification,  setShowNotification] = useState(false);
  const [userData, setUserData] = useState({});

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  const Route = useLocation().pathname
  const Pathname = Route.split("/").pop().split("-").join(" ");
  const Navigate = useNavigate()

  const handleLogout = async()=>{

   try {
      const logout = await axios.post(`${import.meta.env.VITE_SERVER_URL}user/logout`, {}, {withCredentials: true});
      if(logout.status === 200){
          Navigate("/");
      }
   } catch (error) {
      console.error(error);
   }
  }

  const getProfileData = async()=>{
   try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/profile`, {withCredentials: true});
      if(response.status === 200){
         setUserData(response.data?.user)
         
      }
   } catch (error) {
      console.error(error);
   }
  }

  useEffect(() => {
    getProfileData()
  }, [])
  


  return (
    <div className=' backdrop-blur-xl bg-transparent w-full  flex justify-between items-center p-3 px-6 '>
         <div className='flex items-center gap-5'>
            <h2 className='text-2xl font-bold capitalize'> {Pathname} </h2>

            <div className='flex items-center gap-2 '>
               <button className='h-9 w-9 rounded-full flex justify-center items-center'><FaArrowLeft /></button>
            </div>
         </div>
         <div className='flex justify-end items-center gap-6'>
             <div className='relative' onMouseEnter={()=>setShowNotification(true)} onMouseLeave={()=>setShowNotification(false)}>
              <div className='h-10 w-10 rounded-lg border-2 border-emerald-500 flex items-center justify-center relative cursor-pointer'>

             <IoIosNotifications className='text-2xl bell text-teal-950'/>
             <span className='w-5 h-5 bg-red-500 rounded-full absolute -top-1 -right-1 text-white text-[12px] flex items-center justify-center'>5</span>
              </div>

              <motion.div
                 animate={showNotification ? {opacity: 1, y: 0, display: "block"} : {opacity: 0, y: 10, display: "none" }}
                 transition={{ duration: .3}}
                 viewport={{ once: true }}
              className='absolute -bottom-[150%] w-60 -left-[220%] rounded-lg bg-white shadow-[0_0_15px_#00000020] overflow-hidden'>
                 <div className='bg-[#019297] p-3 flex justify-center'>
                      <h5 className='capitalize text-xl font-bold text-white'>Notifications</h5>
                 </div>
                 <ul>
                  <li></li>
                 </ul>
              </motion.div>
             </div>
             <div className='flex items-center gap-4 relative cursor-pointer' onMouseEnter={()=>setShowProfileTab(true)} onMouseLeave={()=>setShowProfileTab(false)}>
                <div className='h-10 w-10 rounded-lg relative'>
                                  <img className='w-full object-cover rounded-lg' src={AdminImg} alt="" />
                                  {userData?.isActive && <span className='h-2.5 w-2.5 rounded-full bg-green-500 absolute z-50 bottom-0 right-0'></span>}
                                </div>
                 <h3 className='text-lg font-bold capitalize'> {userData.name} </h3>
                 <motion.ul
                 animate={showProfileTab ? {opacity: 1, y: 0, display: "block"} : {opacity: 0, y: 10, display: "none" }}
                 transition={{ duration: .3}}
                 viewport={{ once: true }}
                 className=' bg-white absolute w-48 top-[130%] -left-3 p-6 py-6 rounded-lg shadow-[0_0_15px_#00000020] flex flex-col gap-5 z-40' >
                  <li><Link to={"profile"} className='text-lg hover:text-green-400 transition-all duration-300 flex items-center gap-2'> <FaUser className='text-green-400'/> My Profile </Link></li>
                  <li><button className='text-lg hover:text-green-400 transition-all duration-300 flex items-center gap-2 cursor-pointer' onClick={handleLogout}> <MdLogout className='text-green-400 text-lg'/> Log Out </button></li>
                 </motion.ul>
             </div>
         </div>
    </div>
  )
}

export default SupplierAdminHeader

