import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media

import { FaCheck, FaXmark } from "react-icons/fa6";
import { MdPhoneInTalk } from "react-icons/md";


const CompareQuotationComponent = ({ vrfqData, brfqData, supplierData, getVRFQ}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brfqId, setBrfqId] = useState(null);
  const [supId, setSupId] = useState(null)
  const [openCommentId, setOpenCommentId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [curBtn, setCurBtn] = useState(null)

  const navigate = useNavigate();

  const handleFilter = (e) => {
    const selectedId = e.target.value;
    setBrfqId(selectedId || null);
  };
  const handleSupFilter = (e)=>{
    setSupId(e.target.value || null)
  }

  let filteredData = vrfqData?.filter((item) => {
    const matchesSearch = `${item._id} ${item?.createdBy?._id} ${item?.additionalComment} ${item?.TotalPrice?.[0]?.finalPrice}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesBrfq = brfqId ? item?.brfqId._id === brfqId : true;
    const matchesSupplier = supId ? item?.createdBy._id === supId : true

    return matchesSearch && matchesBrfq && matchesSupplier;
  });

  const length = filteredData?.length;



  const handleApproveVRFQ = async(index)=>{
    setIsLoading(true)
    setCurBtn(index)
   try {
      const confirm = window.confirm("Are you want to approve VRFQ");

      if(!confirm) return 

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}order/add`, {vrfqId: vrfqData[index]?._id,
        supplier: vrfqData[index]?.createdBy._id, buyer: vrfqData[index]?.brfqId?.rfqId?.createdBy?._id}, {withCredentials: true});
      if(response.status === 201){
         setErrorMsg('');
         getVRFQ()
         toast.success("VRFQ approved, Order placed successfully ")
      }
   } catch (error) {
      console.error(error);
      setErrorMsg(error?.response?.data?.message || "Something went wrong");
   } 
   finally{
    setIsLoading(false)
    setCurBtn(null)
   }
  }

  const handleNegotiateVRFQ = async(index, id)=>{
    setIsLoading(true);
    setCurBtn(index)
    try {
      const confirm = window.confirm("Are you want to negotiate this rfq")
      if(!confirm) return

      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}vrfq/negotiate/${id}`, {process: "negotiate"}, {withCredentials: true})
      if(response.status === 200){
        setErrorMsg("");
        getVRFQ()
        toast.success("negotiate request successful")
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error?.response?.data?.message || "Something went wrong");
    }
    finally{
      setIsLoading(false)
      setCurBtn(null)
    }
  }
  const handleRejectVRFQ = async(index, id)=>{
    setIsLoading(true);
    setCurBtn(index)
    try {
      const confirm = window.confirm("Are you sure to reject this rfq")
      if(!confirm) return

      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}vrfq/reject/${id}`, {process: "rejected by admin"}, {withCredentials: true})
      if(response.status === 200){
        setErrorMsg("");
        getVRFQ()
        toast.success("VRFQ rejection successful")
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error?.response?.data?.message || "Something went wrong");
    }
    finally{
      setIsLoading(false)
      setCurBtn(null)
    }
  }

  

  return (
    <>
      <ToastContainer />
      {openCommentId && (
        <div
          className="backdrop-blur-sm h-full w-full fixed top-0 left-0 right-0 bottom-0 z-50"
          onClick={() => setOpenCommentId(null)}
        ></div>
      )}

      <div className="bg-white rounded-4xl border-emerald-500 border-2">
        <div className="mb-5 flex justify-between gap-4 items-center px-8 py-5 border-b-1 border-gray-300">
          <div className="flex justify-start gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-60 px-3 py-2 border border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            name="vrfq"
            id="vrfq"
            className="border tracking-wide border-stone-200 rounded-lg outline-none py-2 px-3 w-60"
            onChange={handleFilter}
          >
            <option value="">All BRFQs</option>
            {brfqData?.map((item) => (
              <option key={item._id} value={item._id}>
                {item._id}
              </option>
            ))}
          </select>

          <select name="supplier" className="border capitalize tracking-wide border-stone-200 rounded-lg outline-none py-2 px-3 w-60" onChange={handleSupFilter}>
           <option value="">All supplier</option> 
           {supplierData?.map((item)=>(
            <option value={item._id}>{item.name}</option>
           ))} 
          </select>
          </div>
          
             <button className="px-7 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer hover:scale-105 transition-all duration-300 flex justify-center items-center gap-1" onClick={()=>navigate(-1)}> <IoIosArrowBack className="text-xl"/> Back</button>
      
        </div>

        <div className="p-4 px-7">
          <table className="w-full border border-zinc-200">
            <thead>
              <tr className="bg-slate-100 border-b border-zinc-200">
                <th className="p-4 text-start uppercase">VRFQ ID</th>
                <th className="p-4 text-start uppercase order-l border-zinc-200">Vendor ID</th>
                <th className="p-4 text-start border-l border-zinc-200">
                  VRFQ Price (₹)
                </th>
                
                <th className="p-4 text-start border-l border-zinc-200">
                  Comments
                </th>
                <th className="p-4 text-start border-l border-zinc-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    className="border-b border-stone-200 relative"
                    key={item._id}
                  >
                    <td className="p-4 text-sm">{item?._id || "N/A"}</td>
                    <td className="p-4 border-l border-stone-200 text-sm">{item?.createdBy?._id || "N/A"}</td>
                    <td className="p-4 border-l border-stone-200 font-medium">
                      <span className="px-4 tracking-wide py-1.5 text-sm bg-green-500 text-white rounded-lg">
                        ₹{" "}
                        {item?.TotalPrice?.[0]?.finalPrice?.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        ) || "N/A"}
                      </span>
                    </td>
                   
                    <td className="p-4 border-l border-stone-200">
                      <span
                        className="h-8 w-8 flex justify-center items-center text-white bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all duration-300 rounded-lg cursor-pointer"
                        onClick={() => setOpenCommentId(item._id)}
                      >
                        <FaEye className="text-lg" />
                      </span>
                      {openCommentId === item._id && (
                        <div className="fixed flex flex-col gap-4 z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl w-[600px] p-6 shadow-2xl border border-stone-200">
                          <h2 className="text-xl font-semibold ">
                            <span className="text-xl text-red-500">*</span>{" "}
                            Supplier Comment
                          </h2>
                          <span className="w-full border-b border-stone-200"></span>
                          <p className="text-stone-700 px-4">
                            {item?.additionalComment || "N/A"}
                          </p>
                          <div className="flex justify-end">
                            <button
                              className="bg-emerald-600 cursor-pointer px-5 py-2 rounded-lg text-white w-fit hover:scale-105 transition-all duration-300"
                              onClick={() => setOpenCommentId(null)}
                            >
                              Okay
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-4 border-l border-stone-200">
                    {(item.process !== "approved by admin" && item.process !== "rejected by admin" && item.process !== "negotiate") && <div className="flex items-center gap-3">
                        <button className="border-orange-500 border-2 hover:bg-orange-500 font-medium tracking-wide px-4 py-1 cursor-pointer hover:scale-105 transition-all duration-300 rounded-lg text-orange-500 hover:text-white text-sm" onClick={()=>handleNegotiateVRFQ(index, item._id)}>
                          Negotiate
                        </button>
                        <button className="border-2 border-emerald-600 hover:bg-emerald-600 font-medium tracking-wide px-4 py-1 cursor-pointer hover:scale-105 transition-all duration-300 rounded-lg text-emerald-500 hover:text-white text-sm" onClick={()=>handleApproveVRFQ(index)}>
                        {isLoading && curBtn === index ? "Approving" : "Approve"}
                        </button>
                        <button className="border-2 border-red-500 hover:bg-red-500 tracking-wide font-medium px-4 py-1 cursor-pointer hover:scale-105 transition-all duration-300 rounded-lg text-red-500 hover:text-white text-sm" onClick={()=>handleRejectVRFQ(index, item._id)}>
                        {isLoading && curBtn === index ? "Rejecting" : "Reject"}
                        </button>
                      </div> }
                      {item.process === "negotiate" && <button type="btn" className="bg-orange-500 tracking-wide px-4 py-1.5  rounded-lg text-white text-sm flex items-center gap-1.5"><MdPhoneInTalk className="text-md" />Negotiation</button>}
                      {item.process === "approved by admin" && <button type="btn" className="bg-emerald-600 tracking-wide px-4 py-1.5  rounded-lg text-white text-sm flex items-center gap-1.5"><FaCheck className="text-md" />Approved</button>}
                      {item.process === "rejected by admin" && <button type="btn" className="bg-red-500 tracking-wide px-4 py-1.5  rounded-lg text-white text-sm flex items-center gap-1.5"><FaXmark className="text-md" />Rejected</button>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-stone-200">
                  <td className="p-4 text-center" colSpan={5}>
                    Data Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
         

        </div>
        <div className="flex justify-end py-1 px-7">
          <p className="text-red-500">{errorMsg}</p>
        </div>
        <div className="p-4 px-7 flex justify-end">
             <button className="px-7 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer hover:scale-105 transition-all duration-300" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  );
};

export default CompareQuotationComponent;
