import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ApprovedRFQTable = ({ rfqData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getFilteredData = () => {
    return rfqData.filter((item) => {
      const matchesSearch =
        `${item._id} ${item.createdBy?.name} ${item.product} ${item.process} ${item.DeliveryLocation}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  };

  const filteredData = getFilteredData();
  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-4xl border-emerald-500 border-2 p-8">
        <div className="mb-5 flex items-center gap-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full border-[1px] border-[#eff2f5]">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-start border-l border-neutral-200">
                RFQ ID
              </th>
              <th className="p-4 text-start border-l border-neutral-200">
                Buyer Name
              </th>
              <th className="p-4 text-start border-l border-neutral-200">
                Product{" "}
              </th>
              <th className="p-4 text-start border-l border-neutral-200">
                Process
              </th>
              <th className="p-4 text-start border-l border-neutral-200">
                Delivery Location
              </th>
              <th className="p-4 text-start border-l border-neutral-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="border-b-[1px] border-l-1 border-zinc-200"
                >
                  <td className="p-4 border-l-1 border-neutral-200 text-sm">
                   <Link className="hover:text-green-500 transition-all tracking-wide" to={`rfq-detail/${item._id}`}>{item?._id}</Link> 
                  </td>
                  <td className="p-4 border-l-1 border-neutral-200 capitalize">
                  <Link to={`/admin/user-profile/${item?.createdBy?._id}`} className="hover:text-green-500 transition-all">  {item.createdBy?.name} </Link>
                  </td>
                  <td className="p-4 border-l-1 border-neutral-200 capitalize">
                    {item?.product}
                  </td>
                  <td className="p-4 border-l-1 border-neutral-200 capitalize">
                    <span
                      className={`${
                        item.process === "updated by admin" &&
                        "bg-orange-500 text-white"
                      } ${
                        item.process === "denied by buyer" &&
                        "bg-red-500 text-white"
                      } ${
                        item.process === "approved by buyer" &&
                        "bg-green-500 text-white"
                      } bg-blue-400 text-white px-3 py-1 rounded-md capitalize text-sm text-nowrap`}
                    >
                      {item?.process}
                    </span>
                  </td>
                  <td className="p-4 border-l-1 border-neutral-200">
                    {item?.DeliveryLocation}
                  </td>
                  <td className="p-4 border-l border-neutral-200">
                    <div className="flex items-center gap-4">
                      <button
                        className="rounded-lg bg-teal-600 px-2 py-2 text-white"
                        onClick={() => navigate(`rfq-detail/${item._id}`)}
                      >
                        <FaEye className="text-xl" />
                      </button>
                      {item.status !== true && <button
                        className="rounded-lg bg-lime-500 px-2 py-2 text-white"
                        onClick={() => navigate(`update-rfq/${item._id}`)}
                      >
                        <MdEdit className="text-xl" />
                      </button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApprovedRFQTable;
