import React from 'react'
import { Link } from 'react-router-dom'
import Img from "../../assets/team-4.jpg"
import { FaUserPen } from "react-icons/fa6";

const SupplierProfileComponent = ({userData, isLoading}) => {
  return (
    <>
      <div className='bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2 '>
        <div className='px-8 py-5 flex justify-between items-center border-b-1 border-stone-200'>
          <h2 className='text-xl font-semibold'>Welcome <span className='capitalize'>{userData?.name}</span></h2>
          <Link to={"update"} className='bg-emerald-600 py-2.5 px-6 rounded-lg text-white flex items-center justify-center gap-2 cursor-pointer'> <FaUserPen className='text-2xl'/> Update Profile </Link>
        </div>
        <div className='px-8 py-5 flex gap-6 flex-col'>
          <h2 className='text-2xl font-semibold'> <span className='text-red-500'>*</span> Personal Detail</h2>
          <div className='flex  gap-6'>
             <div className="w-1/4">
                <img className='rounded-xl' src={Img} alt="" />
             </div>
             <div className="w-3/4 grid grid-cols-2 gap-5">
               <div className='flex gap-2 items-center col-span-2'>
                <h3 className='text-xl font-semibold'>User Id:</h3> <span className='capitalize text-xl tracking-wide text-green-500'>{userData._id || "N/A"}</span>
               </div>
             
               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Name:</h3> <span className='capitalize text-xl tracking-wide text-green-500'>{userData.name || "N/A"}</span>
               </div>
             
               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Billing Name:</h3> <span className='capitalize text-xl tracking-wide text-green-500'>{userData.billingName || "N/A"}</span>
               </div>
             
               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Company:</h3> <span className='capitalize text-xl tracking-wide text-green-500'>{userData.company || "N/A"}</span>
               </div>
             
               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Category:</h3> <span className='capitalize text-xl tracking-wide text-green-500'>{userData.category || "N/A"}</span>
               </div>
             
               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Email:</h3> <span className=' text-xl tracking-wide text-green-500'>{userData.email || "N/A"}</span>
               </div>

               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Number:</h3> <span className=' text-xl tracking-wide text-green-500'>{userData.number || "N/A"}</span>
               </div>

               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Role:</h3> <span className='capitalize text-xl tracking-wide text-green-500' >{userData.role || "N/A"}</span>
               </div>

               <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>Member Since:</h3> <span className='capitalize text-xl tracking-wide text-green-500'>{new Date(userData.createdAt).toLocaleDateString() || "N/A"}</span>
               </div>
             </div>
             </div> 
        </div>
        <div className='px-8 py-5 flex gap-6 flex-col'>
        <h2 className='text-2xl font-semibold'> <span className='text-red-500'>*</span> Branch Detail</h2>
         
         <div className='flex flex-col gap-6'>
           {userData?.branchDetail?.map((item, index)=>(
            <div key={item._id} className='bg-sky-100 grid grid-cols-2 gap-5 rounded-lg p-8'>
              <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>GST number:</h3> <span className='capitalize text-xl tracking-wide'>{item.gstNumber || "N/A"}</span>
               </div>
              <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-semibold'>State:</h3> <span className='capitalize text-xl tracking-wide'>{item.state || "N/A"}</span>
               </div>
              <div className='flex gap-2 items-center col-span-2'>
                <h3 className='text-xl font-semibold'>Address:</h3> <span className='capitalize text-xl tracking-wide'>{item.address || "N/A"}</span>
               </div>
            </div>
           ))}
         </div>

        </div>

      </div>
    </>
  )
}

export default SupplierProfileComponent
