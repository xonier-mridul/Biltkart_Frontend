import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const RFQDetail = () => {
  const [RFQData, setRFQData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [message, setErrMessage] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const id = params?.id;

  const getRFQWithId = async () => {
    try {
      if (!id) return;
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}new-rfq/single/${id}`
      );
      if (response.status === 200) {
        setRFQData(response.data);
        if (response.data?.process === "created by buyer") {
          setErrMessage("* RFQ not approved yet, waiting for admin response");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRFQWithId();
  }, []);

  // Handle Approve

  const handleApprove = async () => {
    try {
      if (!id) return;
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}new-rfq/approve/${id}`,
        {}
      );
      if (response.status === 200) {
        toast.success("RFQ Approved successfully");
        setErrMessage(null);
      }
    } catch (error) {
      console.error(error);
      setErrMessage(error?.response?.data?.message);
    }
  };

  // Handle Reject

  const handleReject = async () => {
    try {
      if (!id) return;
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}new-rfq/reject/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("RFQ Reject successfully");
        setErrMessage(null);
      }
    } catch (error) {
      console.error(error);
      setErrMessage(error?.response?.data?.message);
    }
  };

  const total = RFQData?.spreadQuantityData?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2 m-6 p-8">
        <div className="flex items-center">
          <h2 className="font-semibold text-2xl w-1/2">
            {" "}
            RFQ id: <span className="text-emerald-600">{RFQData?._id} </span>
          </h2>
          <div className="w-1/2 flex justify-end">
            <button
              className="capitalize font-medium text-lg text-white bg-emerald-600 py-2 px-8 cursor-pointer rounded-md"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
        <table className="w-full border-[1px] border-[#eff2f5]">
          <tbody>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Product Name{" "}
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">
                {" "}
                <span className="capitalize">{RFQData?.product}</span>
              </td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Category
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">
                {" "}
                <span className="capitalize">
                  {RFQData?.category?.category}
                </span>
              </td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Brand
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">
                <span className="capitalize">{RFQData?.brand?.company}</span>
              </td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Delivery Location
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">
                {RFQData?.DeliveryLocation}
              </td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Pin Code
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">{RFQData?.pinCode}</td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Message
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">{RFQData?.comments}</td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Status
              </th>
              <td className="w-2/3 p-4 px-6 text-lg">
                <span
                  className={`${
                    RFQData.status === true ? "bg-green-500" : "bg-red-500"
                  } py-1 px-4 rounded-lg text-white text-sm`}
                >
                  {RFQData.status === true ? "Approved" : "Pending"}
                </span>
              </td>
            </tr>
            <tr className="border-b-1 border-zinc-200">
              <th className="bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start">
                Created At
              </th>
              <td className="w-2/3 p-4 px-6 text-lg ">
                <span className="py-1 px-4 rounded-lg bg-orange-500 text-sm text-white">
                  {new Date(RFQData.createdAt).toLocaleDateString()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col gap-5 ">
          <h2 className="font-semibold text-2xl">
            Quantity with Delivery date{" "}
            {RFQData?.process === "updated by admin" && (
              <span className="text-red-500 text-xl tracking-wide">
                (Updated by Admin)
              </span>
            )}
          </h2>
          <table className="w-full border-[1px] border-zinc-200">
            <thead>
              <tr className="bg-slate-100 border-b-1 border-zinc-200 ">
                <th className="p-4 text-start"> S.No.</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Quantity ({RFQData?.measurement})
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Delivery Date{" "}
                  <span className="capitalize">
                    ({RFQData?.deliverySchedule}){" "}
                  </span>
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Delivery Location
                </th>
              </tr>
            </thead>
            <tbody>
              {RFQData?.spreadQuantityData?.length > 0 ? (
                RFQData?.spreadQuantityData?.map((item, index) => (
                  <tr
                    className="border-b-[1px] border-l-1 border-zinc-200"
                    key={item._id}
                  >
                    <td className="p-4 border-zinc-200 border-l-1">
                      {" "}
                      {index + 1}{" "}
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1">
                      {" "}
                      {item.quantity}{" "}
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1 flex items-center gap-2">
                      {" "}
                      <span className="py-1 px-4 rounded-lg bg-emerald-500 text-white text-sm tracking-wide">
                        {" "}
                        {new Date(item?.fromDate).toLocaleDateString()}{" "}
                      </span>{" "}
                      -{" "}
                      <span className="py-1 px-4 rounded-lg bg-emerald-600 text-white text-sm tracking-wide">
                        {" "}
                        {new Date(item.toDate).toLocaleDateString()}
                      </span>{" "}
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1">
                      {" "}
                      {item?.location}{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b-[1px] border-l-1 border-zinc-200">
                  <td
                    className="p-4 border-zinc-200 border-l-1 text-center"
                    colSpan={3}
                  >
                    Not Found
                  </td>
                </tr>
              )}
              <tr className="border-b-[1px] border-l-1 border-zinc-200">
                <td className="p-4 border-zinc-200 border-l-1 capitalize">
                  {" "}
                  total{" "}
                </td>
                <td className="p-4 border-zinc-200 border-l-1">
                  {" "}
                  <span className="  font-bold">{total} </span>
                </td>
                <td className="p-4 border-zinc-200 border-l-1"> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-5 overflow-x-scroll">
          <h2 className="font-semibold text-2xl">Specification Data</h2>
          <table className="w-full border border-zinc-200 overflow-x-scroll">
            <thead>
              <tr className="bg-slate-100 border-b border-zinc-200">
                <th className="p-4 border-zinc-200 border text-start w-20 text-nowrap">S No</th>
                <th className="p-4 border-zinc-200 border text-start">
                  Parameter
                </th>

                {RFQData?.document?.[0] &&
                  Object.keys(RFQData.document[0].values).map((variant) => (
                    <th
                      key={variant}
                      className="p-4 border-zinc-200 border text-start text-nowrap"
                    >
                      {variant}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {RFQData?.document?.map((item) => (
                <tr key={item._id} className="border-b border-zinc-200 ">
                  <td className="p-4 border-zinc-200 border font-semibold ">{item.S_No}</td>
                  <td className="p-4 border-zinc-200 border font-semibold text-nowrap">
                    {item.Key_parameter}
                  </td>
                  {item.values &&
                    Object?.values(item?.values).map((val, idx) => (
                      <td key={idx} className="p-4 border-zinc-200 border">
                        {val ?  val : "N/A"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4">
          <p className="text-red-500"> {message} </p>
        </div>

        <div className="flex justify-end items-center gap-4">
          {RFQData.process !== "denied by buyer" &&
            RFQData.process !== "approved by buyer" && (
              <>
                {" "}
                <button
                  className="capitalize font-medium text-lg text-white bg-green-500 disabled:bg-green-400 py-2 px-8 cursor-pointer rounded-md flex gap-2 items-center"
                  onClick={handleApprove}
                  disabled={RFQData.process !== "updated by admin"}
                >
                  {" "}
                  <FaCheck /> Approved{" "}
                </button>
                <button
                  className="capitalize font-medium text-lg text-white bg-red-500 py-2 px-8 cursor-pointer rounded-md flex gap-2 items-center"
                  onClick={handleReject}
                >
                  {" "}
                  <ImCross className="text-sm" /> Rejected{" "}
                </button>
              </>
            )}
          {RFQData.process === "approved by buyer" && (
            <button
              className="capitalize font-medium text-lg text-white bg-green-500 py-2 px-8 rounded-md flex gap-2 items-center"
              disabled
            >
              {" "}
              Approved <FaCheck />
            </button>
          )}
          {RFQData.process === "denied by buyer" && (
            <button
              className="capitalize font-medium text-lg text-white bg-red-500 py-2 px-8  rounded-md flex gap-2 items-center"
              disabled
            >
              <FaXmark /> Rejected{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default RFQDetail;
