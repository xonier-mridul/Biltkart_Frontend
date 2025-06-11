import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"

import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderHistoryTable = ({ orderData, totalPages,currentPage, setCurrentPage }) => {

  const [searchTerm, setSearchTerm] = useState("");
  
    // Navigator 
  
    const navigate = useNavigate()
  
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    let filteredData = orderData.filter((item=>
      `${item._id} ${item.vrfqId?.brfqId?.rfqId?.product} ${item?.vrfqId?.brfqId?.rfqId?.quantity} ${item?.vrfqId?.brfqId?.rfqId?.createdBy?.name} ${new Date(item?.vrfqId?.brfqId?.rfqId?.toDate).toLocaleDateString()}`.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  const length = filteredData.length;
    
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
                <th className="p-4 text-start capitalize"> Order iD</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">Product</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">Buyer</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">Items</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">Status</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">From Date</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">Action</th>
              </tr>
            </thead>
            <tbody>
               {length>0 ?filteredData.map((item)=>(
                              <tr key={item._id} className="border-b-1 border-zinc-200">
                                <td className="p-3 px-4">{item._id || "N/A"}</td>
                                <td className="p-3 px-4 border-l-1 border-zinc-200"><span className="capitalize">{item.vrfqId?.brfqId?.rfqId?.product || "N/A"}</span></td>
                                <td className="p-3 px-4 border-l-1 border-zinc-200"><span className="capitalize text-nowrap">{item.vrfqId?.brfqId?.rfqId?.createdBy?.name || "N/A"}</span></td>
                                <td className="p-3 px-4 border-l-1 border-zinc-200 text-nowrap ">{item.vrfqId?.brfqId?.rfqId?.quantity || "N/A"} <span className="text-[12px] capitalize bg-orange-500 px-2 py-0.5 rounded-md text-white">{item.vrfqId?.brfqId?.rfqId?.measurement}</span></td>
                                <td className="p-3 px-4 border-l-1 border-zinc-200"> <span className={` ${item.process === "confirmed" && "bg-emerald-600"} ${item.process === "processing" && "bg-orange-500"} ${item.process === "dispatch" && "bg-orange-500"} ${item.process === "shipped" && "bg-green-500"} ${item.process === "delivered" && "bg-green-500"} capitalize bg-black px-4 py-2 rounded-lg text-sm text-white `}>{item.process || "N/A"}</span></td>
                                <td className="p-3 px-4 border-l-1 border-zinc-200"> <span className={`  capitalize bg-green-50 text-green-500 px-4 py-2 rounded-lg text-sm  `}>{new Date(item.vrfqId?.brfqId?.rfqId?.fromDate).toLocaleDateString() || "N/A"}</span></td>
                                <td className="p-3 px-4 border-l-1 border-zinc-200"> <div className="flex items-center justify-center gap-3">
                                  <button type="button" className="bg-green-500 text-white h-8 w-8 rounded-lg flex justify-center items-center" onClick={()=>navigate(`order-detail/${item._id}`)}> <FaEye className="text-lg" /></button>  </div> </td>
                              </tr>
                            )): (
                              <tr className="border-b-1 border-zinc-200">
                                  <td className="p-4 px-6 border-l-1 border-zinc-200 text-center " colSpan={7}>Data not found</td>
                              </tr>
                            )}

            </tbody>
        </table>
        <div className="flex justify-end items-center p-6 pb-0">
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
      </div>
    </>
  );
};

export default OrderHistoryTable;
