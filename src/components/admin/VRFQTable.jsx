import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const VRFQTable = ({ vrfqData, vendorData, currentPage, setCurrentPage, totalPages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  
  const navigate = useNavigate();

   const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleVendorFilter = (e) => {
    setSelectedVendor(e.target.value);
  };

  const filteredData = vrfqData?.filter(item => {
    const searchMatch = `${item?._id} ${item.company} ${item.brfqId?._id} ${item.brfqId?.rfqId?.product} ${item.brfqId?.rfqId?.quantity} ${item.brfqId?.rfqId?.DeliveryLocation} ${new Date(item.brfqId?.rfqId?.fromDate).toLocaleDateString()} `
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const vendorMatch = selectedVendor ? item.createdBy?._id === selectedVendor : true;

    return searchMatch && vendorMatch;
  });

  const length = filteredData.length;

  return (
    <>
      <div className="bg-white border-emerald-500 border-2 rounded-4xl p-8 m-5">
        <div className="mb-5 flex gap-6 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-2 py-2.5 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            name="vendor"
            id="vendor"
            className='border-1 capitalize border-[#B5B5C3] outline-none rounded-lg px-3 py-2.5 text-lg text-gray-600'
            onChange={handleVendorFilter}
            value={selectedVendor}
          >
            <option value="">Filter by Vendor</option>
            {vendorData.map(item => (
              <option key={item?._id} value={item?._id}>{item?.name}</option>
            ))}
          </select>
        </div>

        <table className="w-full border-[1px] border-[#eff2f5]">
          <thead>
            <tr className="bg-slate-100">
              <th className='p-4 text-start'> VRFQ ID </th>
              <th className="p-4 text-start border-l-1 border-[#f1f1f1] capitalize">BRFQ ID </th>
              <th className="p-4 text-start border-l-1 border-[#f1f1f1] capitalize">Vender</th>
              <th className="p-4 text-start border-l-1 border-[#f1f1f1]  capitalize">Product</th>
              <th className="p-4 text-start border-l-1 border-[#f1f1f1] capitalize">Action</th>
            </tr>
          </thead>
          <tbody>
            {length > 0 ? filteredData.map((item) => (
              <tr key={item._id}>
                <td className="p-4 border-b-[1px] border-[#f1f1f1] "><Link className='hover:text-teal-500 transition-all duration-300' to={`vrfq-detail/${item._id}`}> {item?._id || "N/A"} </Link></td>
                <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]"><Link className='hover:text-teal-500 transition-all duration-300' to={`/admin/brfq/detail/${item.brfqId?._id}`}>{item.brfqId?._id || "N/A"}</Link></td>
                
                <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]">
                  <Link to={`/admin/user-profile/${item?.createdBy?._id}`} className=' text-lime-500 hover:text-white bg-emerald-50 hover:bg-green-500 text-sm capitalize py-2 px-4 rounded-lg text-nowrap font-medium transition-all duration-300'>{item.createdBy?.company || "N/A"}</Link>
                </td>
                <td className="p-4 border-b-[1px] border-l-1 capitalize border-[#f1f1f1]">{item.brfqId?.rfqId?.product || "N/A"}</td>
                <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]">
                  <div className='flex items-center  gap-2'>
                    <button className='rounded-lg bg-teal-600 px-2 py-2 text-white cursor-pointer text-lg' onClick={()=>navigate(`vrfq-detail/${item._id}`)}><FaEye /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">Nothing Found</td>
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
    </>
  );
};

export default VRFQTable;
