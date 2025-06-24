import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BRFQAssign = ({ brfqData, suppliers }) => {
  const navigate = useNavigate();

  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [errMessage, setErrMessage] = useState(null)

  const quantity = brfqData?.rfqId?.quantity
 

  const deliveryDate = new Date(
    brfqData?.rfqId?.spreadQuantityData[0]?.fromDate
  ).toLocaleDateString();

  
  const handleChange = (e) => {
    const supplierId = e.target.value;
    const supplier = suppliers.find((item) => item._id === supplierId);

    if (
      supplier &&
      !selectedSuppliers.some((sel) => sel._id === supplier._id)
    ) {
      setSelectedSuppliers([...selectedSuppliers, supplier]);
      console.log(selectedSuppliers)
    }
  };

  const handleRemove = (id) => {
    setSelectedSuppliers((prev) =>
      prev.filter((supplier) => supplier._id !== id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        brfqId: brfqData._id,
        supplierIds: selectedSuppliers.map((supplier) => supplier._id),
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}assigned/add`,
        data,
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        toast.success("BRFQ assigned successfully");
        setSelectedSuppliers([]); 
        setErrMessage(null)
      }
    } catch (error) {
      console.error(error.response?.data?.message);
      setErrMessage(error.response?.data?.message);
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className="flex items-center gap-3 mx-5">
        <div className="w-1/2 bg-white border-emerald-500 border-2 rounded-4xl p-3 px-4 ">
          <h2 className="text-lg font-semibold">
            BRFQ ID:
            <span className="text-emerald-500"> {brfqData?._id} </span>
          </h2>
        </div>
        <div className="w-1/2 bg-white border-emerald-500 border-2 rounded-4xl p-3 px-4 ">
          <h2 className="capitalize text-lg font-semibold">
            Buyer Name:
            <span className="text-emerald-500"> {brfqData?.rfqId?.createdBy?.name} </span>
          </h2>
        </div>
      </div>

      <div className="bg-white border-emerald-500 flex flex-col gap-4 border-2 rounded-4xl p-8 m-5 my-2">
        <div className="flex justify-end items-center">
          <button
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
         
         {/* BRFQ Data Table */}
        
        <table className="w-full border-[1px] border-stone-200">
          <tbody>
            <tr className="border-b-[1px] border-stone-200">
              <th className="bg-slate-100 p-4 px-6 font-semibold text-lg text-start">
                Product Name
              </th>
              <td className="p-4 px-6 border-l-1 border-stone-200 text-lg capitalize">
                {brfqData?.rfqId?.product}
              </td>
            </tr>
            <tr className="border-b-[1px] border-stone-200">
              <th className="bg-slate-100 p-4 px-6 font-semibold text-lg text-start">
                Quantity
              </th>
              <td className="p-4 px-6 border-l-1 border-stone-200 text-lg">{quantity}</td>
            </tr>
            <tr className="border-b-[1px] border-stone-200">
              <th className="bg-slate-100 p-4 px-6 font-semibold text-lg text-start">
                Delivery Location
              </th>
              <td className="p-4 px-6 text-lg border-l-1 border-stone-200 capitalize">
                {brfqData?.rfqId?.DeliveryLocation}
              </td>
            </tr>
            <tr className="border-b-[1px] border-stone-200">
              <th className="bg-slate-100 p-4 px-6 font-semibold text-lg text-start">
                Pin Code
              </th>
              <td className="p-4 px-6 border-l-1 border-stone-200 text-lg">{brfqData?.rfqId?.pinCode}</td>
            </tr>
            <tr className="border-b-[1px] border-stone-200">
              <th className="bg-slate-100 p-4 px-6 font-semibold text-lg text-start">
                Delivery From Date
              </th>
              <td className="p-4 px-6 border-l-1 border-stone-200 text-lg">{deliveryDate}</td>
            </tr>
            <tr className="border-b-[1px] border-stone-200">
              <th className="bg-slate-100 p-4 px-6 font-semibold text-lg text-start">
                Measurement
              </th>
              <td className="p-4 px-6 border-l-1 border-stone-200 text-lg">
                <span className="capitalize text-sm tracking-wide bg-green-500 px-4 py-1 text-white rounded-lg">{brfqData?.rfqId?.measurement}</span>
              </td>
            </tr>
          </tbody>
        </table>

         {/* Assign BRFQ */}

        {brfqData.assigned !== true ? <div className="w-full bg-slate-100 p-6 rounded-md flex gap-10">
          <div className="w-1/2 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Select suppliers for assign BRFQ
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <select
                className="w-full outline-none p-2 border-1 bg-white border-[#E4E6EF] rounded-lg capitalize"
                name="supplier"
                id="supplier"
                onChange={handleChange}
              >
                <option value="" hidden>
                  Select supplier
                </option>
                {suppliers?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
               <p className="text-red-500">{errMessage}</p>
              <button
                type="submit"
                disabled={selectedSuppliers.length === 0}
                className=" w-fit bg-emerald-600 disabled:bg-emerald-300 text-white px-5 py-2 rounded-md"
              >
                Assign
              </button>
            </form>
          </div>

          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-2">Selected Suppliers:</h2>
            {selectedSuppliers.length > 0 ? (
              <ul className="space-y-2">
                {selectedSuppliers.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center bg-white p-2 px-4 rounded shadow"
                  >
                    <span className="capitalize">{item.name}</span>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 font-semibold text-lg"
                    >
                      <FaXmark />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No suppliers selected yet.</p>
            )}
          </div>  
        </div> : <div className="w-full bg-slate-100 p-6 rounded-md flex gap-10">
            <h2 className="text-xl font-semibold">BRFQ already assigned</h2>
            
          </div>}
      </div>
    </>
  );
};

export default BRFQAssign;
