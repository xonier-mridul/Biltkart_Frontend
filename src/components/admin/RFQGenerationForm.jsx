import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media Start
import { FaDownload, FaStarOfLife, FaUser, FaUserAlt } from "react-icons/fa";
import { FaXmark, FaPlus, FaMinus } from "react-icons/fa6";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import api from "../common/api";
import { useNavigate } from "react-router-dom";
// Media End

const RFQGenerationForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrorMessage] = useState("")
  const [assignBuyerShow, setAssignBuyerShow] = useState(false)
  const [active, setActive] = useState(2);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [agreement, setAgreement] = useState(false);
  const [downloadConditionPopup, setDownloadConditionPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [quantitySpread, setQuantitySpread] = useState("yes");
  const [deliveryLocationSame, setDeliveryLocationSame] = useState("yes");
  const [file, setFile] = useState(null);
  const [spreadQuantityTotal, setSpreadQuantityTotal] = useState(null)
  const [buyerData, SetBuyerData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState(null)

  const [formData, setFromData] = useState({
    product: "",
    category: "",
    brand: "",
    measurement: "",
    DeliveryLocation:"",
    pinCode:"",
    quantity: "",
    fromDate: "",
    toDate: "",
    deliverySchedule: "",
    comments: "",
  });

  const [spreadQuantity, setSpreadQuantity] = useState([
    {
      quantity: "",
      fromDate: "",
      toDate: "",
      location: "",
    },
  ]);

  const [quantitySpreadData, setQuantitySpreadData] = useState([]);
   const navigate = useNavigate()

const quantitySeparation = () => {
  const {
    quantity,
    fromDate,
    toDate,
    deliverySchedule,
    DeliveryLocation,
  } = formData;


  const spread = [];
  let currentDate = new Date(fromDate);
  const endDate = new Date(toDate);
  const intervals = [];

  const addInterval = (date, qty) => {
    const dateStr = date.toISOString().split("T")[0]; 
    spread.push({
      quantity: qty,
      fromDate: dateStr,
      toDate: dateStr,
      location: DeliveryLocation,
    });
  };

  
  if (deliverySchedule === "weekly") {
    while (currentDate <= endDate) {
      intervals.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
  } else if (deliverySchedule === "monthly") {
    while (currentDate <= endDate) {
      intervals.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  } else if (deliverySchedule === "quarterly") {
    while (currentDate <= endDate) {
      intervals.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 3);
    }
  } else if (deliverySchedule === "annually") {
    while (currentDate <= endDate) {
      intervals.push(new Date(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
  }

  const totalQuantity = Number(quantity);
  const quantityPerInterval = Math.floor(totalQuantity / intervals.length);
  const remainder = totalQuantity % intervals.length;

  intervals.forEach((date, index) => {
    const thisQty =
      quantityPerInterval + (index === intervals.length - 1 ? remainder : 0);
    addInterval(date, thisQty);
  });

  setQuantitySpreadData(spread);
  console.log("Spread Quantity Data:", spread);

};


const buyerFilterData = buyerData.filter((item)=> `${item.name} ${item._id}}`.toLowerCase().includes(searchTerm.toLowerCase()))

const handleBuyerSelection = (id)=>{
    setSelectedBuyer(id)
    setAssignBuyerShow(false)
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

  

  const handleSpreadQuantityChange = (index, field, value) => {
    const updatedData = [...spreadQuantity];
    updatedData[index][field] = value;
    setSpreadQuantity(updatedData);

     
  const total = updatedData.reduce((acc, item) => {
    const qty = parseFloat(item.quantity);
    return acc + (isNaN(qty) ? 0 : qty);
  }, 0);

  setSpreadQuantityTotal(total);

  if(Number(formData.quantity) === total){
    setErrorMessage("")
    return 
  }
  };

  const addSpreadQuantityFields = () => {
    if (spreadQuantity.length <= 4) {
      setSpreadQuantity([
        ...spreadQuantity,
        { quantity: "", fromDate: "", toDate: "", location: "" },
      ]);
    } else {
      toast.info("Only 5 fields are created", {});
    }
  };

  const removeSpreadQuantityFields = (index) => {
    if (spreadQuantity.length === 1) return;
    setSpreadQuantity(spreadQuantity.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQuantitySpreadShow = (e) => {
    setQuantitySpread(e.target.value);
  };

  const handleDeliveryLocationField = (e)=>{
    setDeliveryLocationSame(e.target.value);
   
  }

  // Get Category
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}category`
      );
      if (response.status === 200) return setCategoryData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get Brands

  const getBrands = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}user/supplier`, {withCredentials: true}
      );
      if (response.status === 200) return setBrandData(response.data.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get Buyer Data 

  const getBuyerData = async()=>{
    try {
        const response = await api.get('/user/buyer', {withCredentials: true})
        if(response.status === 200){
            SetBuyerData(response.data?.user)
        }
    } catch (error) {
        console.error(error)
    }
  }
  // Get Login User

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}user/profile`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoggedUser(response.data?.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
    getBrands();
    getBuyerData();
    getLoggedInUser();
  }, []);

  // Handle Submit

  const handleSubmit = async (e) => {
   
    e.preventDefault();
  
    if(quantitySpread !== "yes"){
     if (
      Number(formData.quantity) !==
      Number(spreadQuantity.reduce((acc, init) => acc + Number(init.quantity), 0))
    ) {
      setErrorMessage(`Your quantity  and spread quantity ${Number(spreadQuantity.reduce((acc, init) => acc + Number(init.quantity), 0))} mismatched, please spread correctly`);
      return;
    }
    }

    let finalSpreadQuantity = spreadQuantity;
  
    const hasEmptyLocation = spreadQuantity.some(item => item.location === "");
    if (hasEmptyLocation) {
      finalSpreadQuantity = spreadQuantity.map(item => {
        if (item.location === "") {
          return { ...item, location: formData.DeliveryLocation };
        }
        return item;
      });
  
      setSpreadQuantity(finalSpreadQuantity); 
    }

    if(!selectedBuyer) return setErrorMessage("Please select buyer first")
  
    const formDatas = new FormData();
    formDatas.append("product", formData.product);
    formDatas.append("category", formData.category);
    formDatas.append("brand", formData.brand);
    formDatas.append("measurement", formData.measurement);
    formDatas.append("quantity", formData.quantity);
    formDatas.append("fromDate", formData.fromDate);
    formDatas.append("toDate", formData.toDate);
    formDatas.append("deliverySchedule", formData.deliverySchedule);
    formDatas.append("DeliveryLocation", formData.DeliveryLocation);
    formDatas.append("pinCode", formData.pinCode);
    formDatas.append("comments", formData.comments);
    formDatas.append("createdBy", selectedBuyer);
    formDatas.append("coCreator", loggedUser?._id);
    formDatas.append(
      "spreadQuantity",
      quantitySpread === "yes"
        ? JSON.stringify(quantitySpreadData)
        : JSON.stringify(finalSpreadQuantity) 
    );
  
    if (file) {
      formDatas.append("document", file);
    }

    
  
    try {
       setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}new-rfq`,
        formDatas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        toast.success("RFQ generated successfully");
        setErrorMessage("");
        setSpreadQuantityTotal(null);
        setFromData({
          product: "",
          category: "",
          brand: "",
          measurement: "",
          quantity: "",
          fromDate: "",
          toDate: "",
          deliverySchedule: "",
          DeliveryLocation: "",
          pinCode: "",
          comments: "",
        });
        setSpreadQuantity([
          {
            quantity: "",
            fromDate: "",
            toDate: "",
            location: "",
          },
        ]);
        setQuantitySpreadData([]);
        setSelectedBuyer(null)
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    }
    finally{
        setIsLoading(false)
    }
  };
  
  // Download

  const downloadSpecSheet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}download/download-spec-sheet`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Book.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading spec sheet:", error);
    }
  };

  const downloadExampleSheet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}download/rfq-example-sheet`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "example_sheet.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggle = () => {
    setAgreement((prev) => !prev);
  };

 
  const handleOverlay = ()=>{
     setDownloadConditionPopup(false)
     setAssignBuyerShow(false)
  }

  const BuyerName = buyerData.filter(item=>item._id === selectedBuyer)
  
  
  

  return (
    <>
      {(downloadConditionPopup || assignBuyerShow) && (
        <div
          className="fixed z-42 top-0 left-0 w-full h-full bg-[#00000024] backdrop-blur-xs"
          onClick={handleOverlay}
        ></div>
      )}

      {downloadConditionPopup && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl w-[790px]">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Excel File data fill condition
            </h2>
            <button
              className="absolute top-3.5 right-3.5 cursor-pointer transition-all duration-300 hover:rotate-90 hover:text-emerald-600"
              onClick={() => setDownloadConditionPopup(false)}
            >
              <FaXmark className="text-2xl" />
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <FaStarOfLife className="text-[12px] text-emerald-500" /> Make sure
              filled field as per Specified Parameters.
            </li>
            <li className="flex items-center justify-start gap-3">
              <FaStarOfLife className="text-[12px] text-emerald-500" /> Please
              make sure do not escape any empty assigned row & column, if you
              don't have data fill. <span className="font-semibold">"N/A"</span>{" "}
            </li>
          </ul>
          <div className="flex gap-3 py-3">
            <input
              type="checkbox"
              id="condition"
              name="condition"
              checked={agreement}
              onChange={toggle}
            />
            <label htmlFor="condition">Are you agree with conditions</label>
          </div>
          <div className="flex items-center gap-5">
            <button
              disabled={!agreement}
              className="bg-emerald-600 disabled:bg-emerald-300 px-5 py-2 rounded-lg text-white flex items-center gap-2 cursor-pointer"
              onClick={downloadSpecSheet}
            >
              Download Sheet <FaDownload />
            </button>
            <button
               disabled={!agreement}
              className="bg-emerald-100 disabled:bg-emerald-100 px-5 py-2 rounded-lg text-emerald-600 disabled:text-emerald-400 flex items-center gap-2 cursor-pointer"
              onClick={downloadExampleSheet}
            >
              Download Example Sheet <FaDownload />
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
      <div className="bg-white w-full border-2 border-emerald-500 rounded-4xl">
        <div className="p-3 px-4 flex flex-col gap-3 border-b-1 pb-6 border-[#E4E6EF]">
          <h2 className="text-lg font-semibold">
            You can create an RFQ by uploading a file or manually filling out
            the form for each product.
          </h2>
          <div className="flex justify-between items-center">
          <ul className="flex gap-4 justify-start items-center ">
            {/* <li
              className={`${
                active === 1
                  ? " border-solid border-b-emerald-500 border-b-4"
                  : "border-dashed"
              } transition-all capitalize py-3 px-4 rounded-lg border-1 font-semibold border-[#E4E6EF] cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Upload Request file
            </li> */}
            <li
              className={`${
                active === 2
                  ? " border-solid border-b-emerald-500 border-b-4"
                  : "border-dashed"
              } transition-all capitalize py-3 px-4 rounded-lg border-1 font-semibold border-[#E4E6EF] cursor-pointer`}
              onClick={() => setActive(2)}
            >
              {" "}
              Fill the Form{" "}
            </li>
          </ul>
          <div>
            
          </div>
          </div>
        </div>
        <div className="p-4 px-4">
          {/* {active === 1 && (
            <form className="p-6 flex flex-col gap-5 bg-sky-50 rounded-xl">
              <div className="w-full flex items-center gap-5">
                <div className="w-1/2 flex flex-col gap-2">
                  <span> Download the sheet, fill the required data </span>
                  <button
                    className="bg-green-500 p-1 px-4 flex gap-2 items-center justify-center rounded-lg cursor-pointer w-fit text-white"
                    onClick={downloadDetailSpecSheet}
                  >
                    Download <FaDownload />
                  </button>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="upload-specification">
                    Upload the complete file
                  </label>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end ">
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-6 py-3 text-white w-fit cursor-pointer"
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </form>
          )} */}

          {active === 2 && (
            <form
              className="p-6 flex flex-col gap-6 bg-sky-50 rounded-xl"
              onSubmit={handleSubmit}
            >
                <div className="w-full flex justify-between ">
                    <div>
                       {selectedBuyer ?
                       <div className="bg-teal-600 px-5 py-2 flex items-center gap-2  text-white rounded-lg text-lg capitalize tracking-wide cursor-pointer hover:bg-teal-700 transition-all duration-300" onClick={()=>navigate(`/admin/user-profile/${BuyerName[0]._id}`)}> <FaUser className="text-lg"/>{BuyerName[0]?.name}</div>: <p><span className="text-red-500 text-lg">*</span>Please Select the Buyer</p>}
                    </div>
                    <div className="relative w-1/2 flex justify-end items-center"><button type="button" className="rounded-lg px-5 py-2 border-teal-600 text-teal-600 border-2 flex items-center gap-1 tracking-wide cursor-pointer hover:bg-teal-600 hover:text-white transition-all duration-300" onClick={()=>setAssignBuyerShow(true)}>Assign Buyer <AiOutlineUserAdd className="text-xl"/></button>
                {assignBuyerShow && <div className="absolute top-12 bg-white w-full py-5 px-6 rounded-xl z-100 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold tracking-wide"><span className="text-red-500 text-xl">*</span>Assign Buyer</h3>
                    <div className="w-full border-1 bg-white border-[#E4E6EF] rounded-lg flex justify-center gap-2 items-center px-2 py-2 text-sm"><IoMdSearch className="text-2xl text-green-500 "/><input type="text"  className="w-full  outline-none " onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search buyers..."/></div>
                    <ul className="flex flex-col  bg-blue-50  rounded-xl overflow-hidden">
                       {buyerFilterData.map((item,index)=>(
                        <li className="capitalize hover:bg-blue-100 px-4 py-2 transition-all duration-200 rounded-lg cursor-pointer flex items-center gap-2" onClick={()=>handleBuyerSelection(item._id)}> <span className="text-green-500"><FaUserAlt /> </span> {item.name}</li>
                       )) }
                    </ul>
                </div>}
                </div></div>
              <div className="w-full flex items-center gap-5">
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="product">Product Name</label>
                  <input
                    className="w-full p-3  border-1 bg-white border-[#E4E6EF] outline-none rounded-lg"
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    placeholder="Product name"
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="measurement">Product in unit</label>

                  <select name="measurement" id="measurement" className="w-full p-3  border-1 bg-white border-[#E4E6EF] outline-none rounded-lg" onChange={handleChange}>
                    <option value="" hidden>Product in Unit</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">meter</option>
                    <option value="inch">inch</option>
                    <option value="feet">feet</option>
                    <option value="m²">m²</option>
                    <option value="ft²">ft²</option>
                    <option value="m³">m³</option>
                    <option value="ft³">ft³</option>
                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="per piece">per piece</option>
                    <option value="per bag">per bag</option>
                    <option value="per bundle">per bundle</option>
                    <option value="per roll">per roll</option>
                    <option value="per sheet">per sheet</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex items-center gap-5">
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="category">Select Category</label>
                  <select
                    className="w-full p-3 capitalize border-1 bg-white border-[#E4E6EF] outline-none rounded-lg"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" hidden>
                      Choose Category
                    </option>
                    {categoryData.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="brand">Select Brand</label>
                  <select
                    className="w-full capitalize p-3 border-1 bg-white border-[#E4E6EF] outline-none rounded-lg"
                    name="brand"
                    id="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  >
                    <option value="" hidden>
                      Choose Brand
                    </option>
                    {brandData.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full flex items-center gap-5">
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="DeliveryLocation">Delivery Location</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                    name="DeliveryLocation"
                    id="DeliveryLocation"
                    placeholder="Delivery location"
                    value={formData.DeliveryLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="pinCode">Pin Code</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                    name="pinCode"
                    id="pinCode"
                    placeholder="Enter your pin code"
                    value={formData.pinCode}
                    onChange={handleChange}
                    min="100000"
                    max="999999"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex items-center gap-5">
                <div className="w-1/2 flex flex-col gap-2">
                  <span>Download Specification sheet</span>
                  <button
                    type="button"
                    className="bg-green-500 p-1 px-4 flex gap-2 items-center justify-center rounded-lg cursor-pointer w-fit text-white"
                    onClick={() => setDownloadConditionPopup(true)}
                  >
                    Download <FaDownload />
                  </button>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <label htmlFor="upload-specification">
                    Upload Required Specifications
                  </label>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex flex-col  gap-2">
                <label htmlFor="comments">Additional Comments</label>
                <textarea
                  name="comments"
                  id="comments"
                  className="w-full bg-white p-3 border-1 border-[#E4E6EF] outline-none rounded-lg"
                  rows={5}
                  placeholder="Add your additional comments"
                  onChange={handleChange}
                  value={formData.comments}
                  required
                >
                  {" "}
                </textarea>
              </div>
              <div className="p-6 flex flex-col gap-5 rounded-lg border-green-300 border-1 bg-green-50">
                <div className="w-full ">
                  <h2 className="text-2xl font-semibold">Delivery Schedule</h2>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quantity">Quantity ({formData.measurement === ""? "Enter units above" : formData.measurement}) </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                      placeholder="Quantity"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="fromDate">From Date</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                      placeholder="From date"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="toDate"> To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                      placeholder="To date"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="deliverySchedule"> Delivery Schedule</label>
                    <select
                      name="deliverySchedule"
                      id="deliverySchedule"
                      className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        {" "}
                        Select delivery schedule
                      </option>
                      <option value="weekly"> Weekly</option>
                      <option value="monthly"> Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quantity Spread */}
              <div className="w-full flex flex-col gap-4">
                <h2 className="text-xl font-semibold">
                  <span className="text-red-500 text-2xl">*</span> Is your
                  quantity spread over the delivery date range?
                </h2>
                <div className=" flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="flex gap-2 items-center" >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="quantitySpread"
                        value="yes"
                        checked={quantitySpread === "yes"}
                        onChange={handleQuantitySpreadShow}
                      />
                      Yes
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex gap-2 items-center" >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="quantitySpread"
                        value="no"
                        checked={quantitySpread === "no"}
                        onChange={handleQuantitySpreadShow}
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Quantity Spread Table */}

                {quantitySpread === "yes" ? (
                  <div className="border-2 border-emerald-500 bg-white p-5 rounded-lg flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Quantity Spread</h2>
                    <button type="button" className="py-2 px-4 bg-black text-white rounded-lg" onClick={quantitySeparation}>Generate</button>
                    </div>
                    <table className="w-full border-[1px] border-zinc-200 ">
                      <thead>
                        <tr className="bg-slate-100 border-b-1 border-zinc-200">
                          <th className="px-4 py-3 text-start"> Quantity ({formData.measurement === ""? "Enter units above" : formData.measurement})</th>
                          <th className="px-4 py-3 text-start border-l-1 border-zinc-200">
                            {" "}
                            Date
                          </th>
                          <th className="px-4 py-3 text-start border-l-1 border-zinc-200">
                            {" "}
                            Location
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          {quantitySpreadData.length > 1 ? quantitySpreadData.map((item, index)=> (
                            <tr  key={index} className="border-b-1 border-zinc-200">
                                <td className="px-4 py-3">{item?.quantity}</td>
                                <td className="px-4 py-3 border-zinc-200 border-l-1">{item?.fromDate} to {item?.toDate}</td>
                                <td className="px-4 py-3 border-zinc-200 border-l-1">{item?.location}</td>
                            </tr>
                          )) : (
                            <tr className="border-b-1 border-zinc-200 ">
                              <td colSpan={3} className="p-4 text-center"> Please fill delivery schedule form above and generate spread quantity</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col gap-5 rounded-lg border-green-300 border-1 bg-green-50">
                    <div className="w-full ">
                      <h2 className="text-xl font-semibold">
                        <span className="text-red-500 text-2xl">*</span> Will
                        all delivery locations would be the same?
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          
                          <label className="flex gap-2 items-center" >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="deliveryLocationSame"
                            checked={deliveryLocationSame==="yes"}
                            onChange={handleDeliveryLocationField}
                            value="yes"
                          />
                            Yes
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          
                          <label className="flex gap-2 items-center" >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="deliveryLocationSame"
                            checked={deliveryLocationSame==="no"}
                            onChange={handleDeliveryLocationField}
                            value="no"
                          />
                            No
                            </label>
                        </div>
                      </div>
                    </div>

                    {spreadQuantity.map((item, index) => (
                      <div key={index} className="flex flex-col gap-3">
                        <div className={` grid ${deliveryLocationSame === "yes" ? "grid-cols-3" : "grid-cols-4" }  gap-4`}>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="quantity">Quantity ({formData.measurement === ""? "Enter units above" : formData.measurement})</label>
                            <input
                              type="number"
                              className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                              required
                              placeholder="Quantity"
                              name="quantity"
                              value={spreadQuantity[index].quantity}
                              onChange={(e) =>
                                handleSpreadQuantityChange(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="fromDate">From Date</label>
                            <input
                              type="date"
                              className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                              name="fromDate"
                              value={spreadQuantity[index].fromDate}
                              required
                              onChange={(e) =>
                                handleSpreadQuantityChange(
                                  index,
                                  "fromDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="toDate"> To Date</label>
                            <input
                              type="date"
                              name="toDate"
                              value={spreadQuantity[index].toDate}
                              className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                              onChange={(e) =>
                                handleSpreadQuantityChange(
                                  index,
                                  "toDate",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={`${deliveryLocationSame === "yes" ? "hidden" : "block"} flex flex-col gap-2`}>
                            <label htmlFor="location"> Location</label>
                            <input
                              type="text"
                              name="location"
                              value={spreadQuantity[index].location ?? ""}
                              className="w-full p-3 bg-white border-1 border-[#E4E6EF] outline-none rounded-lg"
                              onChange={(e) =>
                                handleSpreadQuantityChange(
                                  index,
                                  "location",
                                  e.target.value
                                )
                              }
                              
                              placeholder="Location"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="bg-green-500 text-white h-9 w-9 flex justify-center items-center rounded-xl"
                            onClick={addSpreadQuantityFields}
                          >
                            <FaPlus className="text-xl" />
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 text-white h-9 w-9 flex justify-center items-center rounded-xl"
                            onClick={() => removeSpreadQuantityFields(index)}
                          >
                            <FaMinus className="text-xl" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.quantity && <div className="flex flex-col items-end mt-3">
                       <p className="capitalize text-lg">Total quantity:  <span className="text-green-600 font-medium">{formData.quantity || "n/a"}</span></p>
                       <p className="capitalize text-lg">Spread quantity total:  <span className={`${Number(formData.quantity) !== Number(spreadQuantityTotal) ? "text-red-500" : "text-green-600"}  font-medium`}>{spreadQuantityTotal || "n/a"}</span></p>
                    </div>}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                  {errMessage && <p className={`text-red-500`}>{errMessage} </p>}
              </div>

              <div className="flex justify-end ">
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-6 py-3 text-white w-fit cursor-pointer"
                >
                  {isLoading ? "Submitting..." :"Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default RFQGenerationForm;
