import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaHistory,
} from "react-icons/fa";
import RFQHistory from "../../pages/Buyer-admin/RFQHistory";

const RFQHistoryComponent = ({ id, rfqHistory }) => {
  const navigate = useNavigate();
  console.log(rfqHistory)
 
  return (
    <>
      <div className="w-full flex items-center gap-5">
        <div className="w-1/2 bg-white rounded-full border-2 border-emerald-500 p-3 px-5">
          <h2>
            <span className="font-bold">RFQ ID:</span>
            {id}
          </h2>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl  border-2 border-emerald-500">
        <div className="mb-5 flex justify-between items-center px-8 py-4 border-b-1 border-gray-300">
          <div className="w-1/2"></div>
          <div className="w-1/2 flex justify-end">
            <button
              className="rounded-lg bg-emerald-600 tracking-wide px-6 py-2.5 text-white w-fit cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
        <div className="p-4 px-7">
          <table className="w-full border-[1px] border-zinc-200">
            <thead>
              <tr className="bg-slate-100 border-b-1 border-zinc-200">

                <th className="p-4 text-start">S.No.</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">History ID</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Updated by
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Updated At
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Delivery Location
                </th>
                
                
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Actions
                </th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {rfqHistory.length > 0 ? (
                rfqHistory?.map((item, index) => (
                  <tr key={item._id} className="border-b-1 border-zinc-200">
                    <td className="p-4 text-start">{index + 1}</td>
                    <td className="p-4 text-start border-l-1 border-zinc-200 ">{item._id}</td>
                    <td className="p-4 text-start border-l-1 border-zinc-200 text-nowrap">
                      {" "}
                      <span className="capitalize bg-emerald-500 px-4 py-1 rounded-lg text-white text-sm">
                        {item.process}
                      </span>
                    </td>
                    <td className="p-4 text-start border-l-1 border-zinc-200">
                      {" "}
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-start border-l-1 border-zinc-200">
                      {" "}
                      {item?.rfqId?.DeliveryLocation || "N/A"}{" "}{item?.rfqId?.pinCode || "N/A"}
                    </td>
                    
                    
                    <td className="p-4 text-start border-l-1 border-zinc-200">
                      {" "}
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="rounded-lg bg-teal-600 px-2 py-2 text-white cursor-pointer"
                        >
                          <FaEye className="text-xl" />
                        </button>
                      </div>{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b-1 border-zinc-200">
                  <td colSpan={7} className="text-center p-3">
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     {rfqHistory.length > 0 && <div className="bg-white shadow-lg rounded-2xl   border-2 border-emerald-500">
        <div className="mb-5 flex justify-between items-center px-8 py-4 border-b-1 border-gray-300">
          <h2 className="text-xl font-bold">
            Order Quantity with Delivery date
          </h2>
        </div>
        <div className=" p-5 flex flex-col gap-8">
        {rfqHistory.map(((item, index)=>(
          <div className={` ${index%2 === 0 && "bg-zinc-100 p-6 px-7"} flex flex-col gap-5 p-2 rounded-xl`}>
            <div className="flex justify-between items-center">
              <h2 className="px-1 text-xl font-semibold">S.No. <span className="text-green-500">{index + 1}</span></h2>

            <h2 className="text-xl font-semibold">History ID: <span className="text-green-500 tracking-wide">{item._id}</span></h2>
            </div>
          <table className="w-full border-[1px] border-zinc-200 ">
            <thead>
              <tr className={`${index%2 === 0 && "bg-stone-50"} bg-stone-100 border-b-1 border-zinc-200`}>
                <th className="p-4 text-start">S.No.</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Quantity
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  From Date
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  To date
                </th>
              </tr>
            </thead>
            <tbody>
              
                {item?.spreadQuantityData.length > 0 ? item?.spreadQuantityData.map((item, indexx) => (
                  <tr key={item._id} className={` ${index%2 === 0 && "bg-white"} border-b-1 border-zinc-200`}>
                    <td className="p-4">{indexx + 1}</td>
                    <td className="p-4 border-l-1 border-zinc-200">
                      {item?.quantity || "N/A"}
                    </td>
                    <td className="p-4 border-l-1 border-zinc-200">
                      {item?.fromDate
                        ? new Date(item?.fromDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4 border-l-1 border-zinc-200">
                      {item?.toDate
                        ? new Date(item?.toDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4"> Data not found </td>
                  </tr>
                )}
            </tbody>
          </table>
          </div>
              )))}
        </div>
      </div> }
    </>
  );
};

export default RFQHistoryComponent;
