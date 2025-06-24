import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdEdit, MdDelete } from "react-icons/md";
import {
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaHistory,
} from "react-icons/fa";

const MyRFQTable = () => {
  const [rfq, setRFQ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
   const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  const getRFQ = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}new-rfq/myrfqs?page=${currentPage}`, {withCredentials: true}
      );
      if (res.status === 200) {
        setRFQ(res?.data?.RFQList);
        setTotalPages(res?.data?.totalPages);
      }
    } catch (error) {
      console.error("Error in getRFQ:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getRFQ();
  }, [currentPage]);

  const filteredData = rfq.filter((item=>
    `${item._id} ${item.company} ${item.process} ${new Date(item.createdAt).toLocaleDateString()} ${new Date(item.updatedAt).toLocaleDateString()} ${(item.status.toString())}`.toLowerCase().includes(searchTerm.toLowerCase())
))

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async(id)=>{
    try {

      let confirmation = confirm("Are you sure to delete your RFQ?");

      if(!confirmation) return

      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}new-rfq/${id}`);

      if(response.status === 200){
        toast.success("RFQ deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" },
        });
        setRFQ(rfq.filter(item=>item._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

      });
    }
  }


  return (
    <>
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl m-5 border-2 border-emerald-500">
        <div className="mb-5 flex justify-between items-center px-8 py-6 border-b-1 border-gray-300">
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-3 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="p-4 px-7">
          <table className="w-full border-[1px] border-zinc-200">
            <thead>
              <tr className="bg-slate-100 border-b-1 border-zinc-200">
                <th className="p-4 text-start">RFQ ID</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Process
                </th>
                {/* <th className="p-4 text-start border-l-1 border-zinc-200">
                  Created Date
                </th> */}
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Updated Date
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Status
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ?  filteredData?.map((rfq) => {
              let Create =  new Date(rfq.createdAt).toLocaleDateString('en-GB');
              let Update = new Date(rfq.updatedAt).toLocaleDateString('en-GB')
              
              return (
                <tr key={rfq._id} className="border-b-1 border-zinc-200">
                  <td className="p-4 text-start">{rfq._id}</td>
                  <td className="p-4 text-start border-l-1 border-zinc-200">
                    <span className={`${rfq.process === "updated by admin" && "bg-orange-500 text-white"} ${rfq.process === "denied by buyer" && "bg-red-500 text-white"} ${rfq.process === "approved by buyer" && "bg-green-500 text-white"} bg-blue-400 text-white px-3 py-1 rounded-md capitalize text-sm text-nowrap`}> {rfq.process} </span>
                  </td>
                  {/* <td className="p-4 text-start border-l-1 border-zinc-200">
                    <span className="text-lime-500 bg-emerald-50 capitalize text-sm  py-2 px-4 rounded-lg text-nowrap font-medium"> {Create} </span>
                  </td> */}
                  <td className="p-4 text-start border-l-1 border-zinc-200">
                   <span className=" text-red-500 bg-red-50 capitalize text-sm  py-2 px-4 rounded-lg text-nowrap font-medium"> {Update} </span>
                  </td>
                  <td className=" p-4 text-start border-l-1 border-zinc-200">
                    <span className={`${rfq.status === true ? "text-lime-500 bg-emerald-50 ":"bg-red-50 text-red-500"} rounded-lg py-2 px-4`}>{rfq.status === true ? "Approved" : "Pending"} </span>
                  </td>
                  <td className="p-4 border-zinc-200 border-l-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-blue-400 px-2 py-2 text-white cursor-pointer"
                        onClick={()=>navigate(`rfq-history/${rfq._id}`)}
                      >
                        <FaHistory className="text-xl" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-teal-600 px-2 py-2 text-white cursor-pointer"
                        onClick={()=>navigate(`rfq-detail/${rfq._id}`)}
                      >
                        <FaEye className="text-xl" />
                      </button>
                      {/* <button
                        type="button"
                        className="rounded-lg bg-lime-500 px-2 py-2 text-white cursor-pointer"
                        onClick={()=>navigate()}
                      >
                        <MdEdit className="text-xl" />
                      </button> */}
                      <button
                        type="button"
                        className="rounded-lg bg-red-500 px-2 py-2 text-white cursor-pointer"
                        onClick={()=>handleDelete(rfq._id)}
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}): (
                <tr >
                  <td  colSpan={6} className="text-center p-4">Data not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center p-6 pb-8">
                 <div className="flex items-center gap-2">
                   <span
                     className={`cursor-pointer p-2 ${
                       currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""
                     }`}
                     onClick={() => handlePageChange(currentPage - 1)}
                   >
                     <FaChevronLeft />
                   </span>
       
                   {(() => {
                     const startPage = Math.max(1, currentPage - 1);
                     const endPage = Math.min(totalPages, startPage + 2);
                     const pagesToShow = [];
       
                     for (let i = startPage; i <= endPage; i++) {
                       pagesToShow.push(
                         <button
                           key={i}
                           onClick={() => handlePageChange(i)}
                           className={`h-9 w-9 rounded-lg flex items-center justify-center cursor-pointer ${
                             currentPage === i ? "bg-emerald-600 text-white" : ""
                           }`}
                         >
                           {i}
                         </button>
                       );
                     }
       
                     return pagesToShow;
                   })()}
       
                   <span
                     className={`cursor-pointer p-2 ${
                       currentPage === totalPages
                         ? "opacity-30 cursor-not-allowed"
                         : ""
                     }`}
                     onClick={() => handlePageChange(currentPage + 1)}
                   >
                     <FaChevronRight />
                   </span>
                 </div>
               </div>
      </div>
    </>
  );
};

export default MyRFQTable;
