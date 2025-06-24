import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Media
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const RFQListTable = ({ rfqData, setRfqData, totalPages, handlePageChange, currentPage }) => {
  
  const [buyerUser, setBuyerUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState("all");
  const [selectedProcess, setSelectedProcess] = useState('all')
  const navigate = useNavigate();

  // Fetch buyers
  const getBuyerUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}user/buyer`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setBuyerUser(response.data?.user || []);
      }
    } catch (error) {
      console.error("Failed to fetch buyers:", error);
    }
  };

  useEffect(() => {
    getBuyerUsers();
  }, []);

  
  const getFilteredData = () => {
    return rfqData.filter((item) => {
      const matchesBuyer =
        selectedBuyer === "all" || item.createdBy?._id === selectedBuyer;

      const matchesProcess =
        selectedProcess === "all" || item.process === selectedProcess;

      const matchesSearch = `${item._id} ${item.createdBy?.name} ${item.product} ${item.process} ${item.DeliveryLocation}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesBuyer && matchesSearch && matchesProcess;
    });
  };

  const handleBuyerFilter = (e) => {
    setSelectedBuyer(e.target.value);
  };
  const handleProcessFilter = (e) => {
    setSelectedProcess(e.target.value);
  };

 

  const filteredData = getFilteredData();

  return (
    <div className="bg-white rounded-4xl border-emerald-500 border-2 p-8">
      <div className="mb-5 flex items-center gap-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          name="buyer"
          id="buyer"
          className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none capitalize"
          value={selectedBuyer}
          onChange={handleBuyerFilter}
        >
          <option value="all">All Buyers</option>
          {buyerUser.map((item) => (
            <option key={item?._id} value={item?._id}>
              {item?.name}
            </option>
          ))}
        </select>

        <select 
        name="process"
        id="process"
        className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none capitalize"
        value={selectedProcess}
        onChange={handleProcessFilter}
        > 
        <option value="all">All RFQ's</option>
        <option value="created by buyer">New</option>
        <option value="approved by buyer">Approved</option>
        <option value="denied by buyer"> Rejected </option>
        </select>
      </div>

      <table className="w-full border-[1px] border-[#eff2f5]">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4 text-start border-l border-neutral-200">RFQ ID</th>
            <th className="p-4 text-start border-l border-neutral-200">Buyer Name</th>
            <th className="p-4 text-start border-l border-neutral-200">Product </th>
            <th className="p-4 text-start border-l border-neutral-200">Process</th>
            <th className="p-4 text-start border-l border-neutral-200">Delivery Location</th>
            <th className="p-4 text-start border-l border-neutral-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? filteredData?.map((item) => {
            return (
              <tr
                key={item._id}
                className="border-b-[1px] border-l-1 border-zinc-200"
              >
                <td className="p-4 border-l-1 border-neutral-200 text-sm"><Link className="hover:text-green-500 transition-all tracking-wide" to={`rfq-detail/${item._id}`}>{item?._id} </Link></td>
                <td className="p-4 border-l-1 border-neutral-200 capitalize"><Link to={`/admin/user-profile/${item?.createdBy?._id}`} className="hover:text-green-500 transition-all"> {item.createdBy?.name} </Link></td>
                <td className="p-4 border-l-1 border-neutral-200 capitalize">{item?.product}</td>
                <td className="p-4 border-l-1 border-neutral-200 capitalize">
                  <span
                    className={`${
                      item.process === "updated by admin" && "bg-orange-500 text-white"
                    } ${
                      item.process === "denied by buyer" && "bg-red-500 text-white"
                    } ${
                      item.process === "approved by buyer" && "bg-green-500 text-white"
                    } bg-blue-400 text-white px-3 py-1 rounded-md capitalize text-sm text-nowrap`}
                  >
                    {item?.process}
                  </span>
                </td>
                <td className="p-4 border-l-1 border-neutral-200">{item?.DeliveryLocation}</td>
                <td className="p-4 border-l border-neutral-200">
                  <div className="flex items-center gap-4">
                    <button
                      className="rounded-lg bg-teal-600 px-2 py-2 text-white"
                      onClick={() => navigate(`rfq-detail/${item._id}`)}
                    >
                      <FaEye className="text-xl" />
                    </button>
                    {(item.status !== true) && <button
                      className="rounded-lg bg-lime-500 px-2 py-2 text-white"
                      onClick={() => navigate(`update-rfq/${item._id}`)}
                    >
                      <MdEdit className="text-xl" />
                    </button>}
                  </div>
                </td>
              </tr>
            );
          }): (
            <tr>
              <td colSpan={6} className="p-4 text-center"> Data not found</td>
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
  );
};

export default RFQListTable;
