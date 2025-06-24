import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../assets/team-4.jpg";
import { FaUserPen } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserEdit, FaListUl } from "react-icons/fa";
import { MdDelete, MdOutlinePassword } from "react-icons/md";
import Skeleton from '@mui/material/Skeleton';

const UserProfileComponent = ({ userData, currentOrder, buyerOrderDeliveredCount, buyerOrderCount, isLoading }) => {
  const navigate = useNavigate();
  

  return (
    <>
      <div className="bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2 ">
        <div className="px-8 py-5 flex justify-between items-center border-b-1 border-stone-200">
          <h2 className="text-xl font-semibold">
           {!isLoading ? <span className="capitalize text-2xl font-semibold text-green-500">{userData?.name} <span className="text-green-500 text-xl">({userData?.role})</span></span> : <Skeleton variant="text" className="rounded-lg" width={210} height={40} /> }
          </h2>
          <div className="flex justify-end items-center gap-4">
            <Link to={`/admin/suppliers/product-list/${userData?._id}`} className="text-white bg-green-500 hover:bg-green-600  px-6 py-2 rounded-lg hover:scale-104 flex items-center justify-center gap-2 transition-all duration-300 tracking-wide"> <FaListUl /> Product List </Link>
            <Link to={`/admin/${userData.role === 'buyer' ? 'buyer' : 'suppliers'}/update-user/${userData?._id}`} className="text-white bg-green-500 hover:bg-green-600  px-6 py-2 rounded-lg hover:scale-104 flex items-center justify-center gap-2 transition-all duration-300 tracking-wide">
          <FaUserEdit className="text-xl"/> Edit Profile
          </Link>
            <Link to={`/admin/update-password/${userData?._id}`} className="text-white bg-green-500 hover:bg-green-600  px-6 py-2 rounded-lg hover:scale-104 flex items-center justify-center gap-2 transition-all duration-300 tracking-wide">
          <MdOutlinePassword className="text-xl"/> Update Password
          </Link>
          <button
            className="bg-teal-600 hover:bg-teal-700 py-2 px-6 rounded-lg text-white flex items-center justify-center gap-1.5 cursor-pointer hover:scale-104 transition-all duration-300 tracking-wide"
            onClick={() => navigate(-1)}
          >
            {" "}
            <IoIosArrowBack className="text-xl" /> Back
          </button>
          
          </div>
        </div>
        <div className="px-8 py-5 flex gap-6 flex-col">
          <h2 className="text-2xl font-semibold">
            {" "}
            <span className="text-red-500">*</span>User Detail
          </h2>
          <div className="flex items-start gap-6">
            <div className="w-1/4">
              {!isLoading ? <img className="rounded-xl" src={Img} alt="" /> : <Skeleton variant="rectangular" width={140} height={140} />}
            </div>
            <div className="w-3/4 grid grid-cols-2 gap-6">
              <div className="flex gap-2 items-center col-span-2">
                <h3 className="text-lg font-semibold tracking-wide ">User Id:</h3>{" "}
                {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?._id || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={240} height={35} />}
              </div>

              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Name:</h3>{" "}
                {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.name || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} />}
              </div>

              

              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Category:</h3>{" "}
               {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.category || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>

              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Email:</h3>{" "}
                {!isLoading ? <span className=" text-xl tracking-wide text-green-500">
                  {userData?.email || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>

              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Number:</h3>{" "}
                {!isLoading ? <span className=" text-xl tracking-wide text-green-500">
                  {userData?.number || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>

              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Role:</h3>{" "}
               {!isLoading ?  <Link  to={`/admin/${userData?.role === 'buyer' ? 'buyer': 'suppliers'}`} className="capitalize text-xl tracking-wide text-green-500 hover:underline">
                 {userData.role || "N/A"} 
                </Link> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>
              <div className="flex gap-2 items-center tracking-wide">
                <h3 className="text-lg font-semibold">Rating:</h3>{" "}
               {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.rating || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>
              

              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Member Since:</h3>{" "}
               {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {new Date(userData?.createdAt).toLocaleDateString() || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>
            </div>
          </div>
        </div>


        <div className="px-8 py-5 flex gap-6 flex-col">
          <h2 className="text-2xl font-semibold">
            {" "}
            <span className="text-red-500">*</span> Company Details
          </h2>
           <div className=" grid grid-cols-2 gap-x-5 gap-y-5 bg-stone-100 w-full rounded-lg p-6">
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Company:</h3>{" "}
                {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.company || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} />}  
              </div>
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Address:</h3>{" "}
                {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.address || "N/A"}
                </span>  : <Skeleton variant="text" className="rounded-lg" width={210} height={35} />}
              </div>
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Company GST Number:</h3>{" "}
                {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.companyGSTNumber || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} />}
              </div>
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Trade Number:</h3>{" "}
               {!isLoading ? <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData?.tradeNumber || "N/A"}
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} /> }
              </div>
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Website Link:</h3>{" "}
                {!isLoading ? <span className="text-xl tracking-wide text-green-500">
                  <Link to={userData?.website} target="_blank">{userData?.website || "N/A"} </Link>
                </span> : <Skeleton variant="text" className="rounded-lg" width={210} height={35} />}
              </div>
           </div>
        </div>


        <div className="w-full px-8 py-5 flex gap-5 flex-col">
          <h2 className="text-2xl font-semibold">
            {" "}
            <span className="text-red-500">*</span> Orders Details
          </h2>
          <div className=" grid grid-cols-2 gap-x-5 gap-y-5 bg-stone-100 w-full rounded-lg p-6">
          <div className="flex gap-2 items-center w-full">
                <h3 className="text-lg tracking-wide font-semibold">Orders Delivered:</h3>{" "}
                <span className="capitalize text-xl tracking-wide text-green-500 ">
                  {userData.role === 'buyer' ? buyerOrderDeliveredCount : userData?.deliveries || "N/A"}
                </span>
              </div>
          <div className="flex gap-2 tracking-wide items-center w-full">
                <h3 className="text-lg font-semibold tracking-wide">Current Orders:</h3>{" "}
                <span className="capitalize text-xl tracking-wide text-green-500">
                  {userData.role === 'buyer' ? buyerOrderCount || "N/A"  : currentOrder || "N/A"}
                </span>
              </div>
          </div>
        </div>
        {(userData.branchDetail && userData.branchDetail.length > 0) && <div className="w-full px-8 py-5 flex gap-5 flex-col">
            <h2 className="text-2xl font-semibold">
            {" "}
            <span className="text-red-500">*</span> Branch Details
          </h2>
          {userData.branchDetail.map((item,index)=>(
            <div className="w-full bg-stone-100 p-6 grid-cols-2 grid gap-5 rounded-xl" key={item._id}>
               <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">GST Number:</h3>{" "}
                <span className="capitalize text-xl tracking-wide text-green-500">
                  {item?.gstNumber || "N/A"}
                </span>
              </div>
               <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">State:</h3>{" "}
                <span className="capitalize text-xl tracking-wide text-green-500">
                  {item?.state || "N/A"}
                </span>
              </div>
               <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold tracking-wide">Address:</h3>{" "}
                <span className="capitalize text-xl tracking-wide text-green-500">
                  {item?.address || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};

export default UserProfileComponent;
