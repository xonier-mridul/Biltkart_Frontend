import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// media

import { FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlinePercent, MdOutlineCurrencyRupee } from "react-icons/md";

const CatalogForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState(null)
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [specData, setSpecData] = useState([]);
  const [filterSpec, setFilterSpec] = useState([]);
  const [userData, setUserData] = useState([]);
  const [additionalSpecs, setAdditionalSpecs] = useState([
    {
      field: "",
      value: "",
    },
  ]);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    seller: "",
    iso: "",
    specifications: {},
    createdBy: "",
  });

  const [paymentSchedule, setPaymentSchedule] = useState({
    advance: "",
    afterDispatch: "",
    onDelivery: "",
    afterTesting: "",
  });

  const [commercialCondition, setCommercialCondition] = useState({
    productPrice: "",
    priceValidity: "",
    productDiscount: "",
    discountValidity: "",
    productUnit: "",
    condition:""
  });

  const addAdditionalSpec = () => {
    setAdditionalSpecs([...additionalSpecs, { field: "", value: "" }]);
  };

  const removeAdditionalSpec = (index) => {
    if (additionalSpecs.length === 1) return;
    setAdditionalSpecs(additionalSpecs.filter((item, i) => i !== index));
  };

  const handleAdditionalSpecChange = (index, field, value) => {
    const updatedSpecs = [...additionalSpecs];
    updatedSpecs[index][field] = value;
    setAdditionalSpecs(updatedSpecs);
  };

  const handleFileChange = (e)=>{
      setCommercialCondition({...commercialCondition, condition: e.target.files[0]})
      console.log(commercialCondition)
  }

  // Handle payment schedule change

 

  const handlePaymentScheduleChange = (e) => {
    const { name, value } = e.target;
    setPaymentSchedule({ ...paymentSchedule, [name]: value });
  };

  // Handle input changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const CategoryHandleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    getSubCategories(value);
  }

  // Handle Commercial Condition Change

  const handleCommercialConditionChange = (e) => {
    const { name, value } = e.target;
    setCommercialCondition({ ...commercialCondition, [name]: value });
    
  };

  // Handle specification input changes
  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };


  const verifyUser = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}auth/verify-auth`, {withCredentials: true});
      if(response.status === 200){
        setFormData({
          ...formData,
          createdBy: response.data?.user?._id

        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}user/supplier`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserData(response.data.user);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}category`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSubCategories = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}sub-category/by-category/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSubCategoryData(response.data.subCategory);
        console.log(response.data.subCategory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSpecification = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}specification`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSpecData(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch User Data, Categories, Sub-Categories,  Specification

  useEffect(() => {
    verifyUser();
    getUsers();
    getCategories();
    
    getSpecification();
  }, []);

  // Handle Form Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
  
    const formDataToSend = new FormData();
  
    formDataToSend.append("productName", formData.productName)
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("seller", formData.seller);
    formDataToSend.append("iso", formData.iso);
    formDataToSend.append("createdBy", formData.createdBy);
  
    
    formDataToSend.append(
      "specifications",
      JSON.stringify(
        Object.entries(formData.specifications).map(([key, value]) => ({
          key,
          value,
        }))
      )
    );
  
    formDataToSend.append("addSpecifications", JSON.stringify(additionalSpecs));
    formDataToSend.append("paymentSchedule", JSON.stringify(paymentSchedule));
  

    formDataToSend.append(
      "commercialCondition",
      JSON.stringify({
        productPrice: commercialCondition.productPrice,
        priceValidity: commercialCondition.priceValidity,
        productDiscount: commercialCondition.productDiscount,
        discountValidity: commercialCondition.discountValidity,
        productUnit: commercialCondition.productUnit
      })
    );
  
    formDataToSend.append("condition", commercialCondition.condition);
  
    try {
      if ((Number(paymentSchedule.advance) + Number(paymentSchedule.afterDispatch) + Number(paymentSchedule.afterTesting) + Number(paymentSchedule.onDelivery)) !== 100 ) {
        return setErrorMessage('Invalid payment schedule distribution ')
      } 
      if (
  new Date(commercialCondition.priceValidity).getTime() < Date.now() ||
  new Date(commercialCondition.discountValidity).getTime() < Date.now()
) {
  return setErrorMessage('Invalid Commercial condition date format');
}
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}catalog`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        toast.success("Catalog Created successfully", {
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
  
        
        setFormData({
          productName: "",
          category: "",
          subCategory: "",
          seller: "",
          iso: "",
          specifications: {},
          createdBy: "",
        });
  
        setAdditionalSpecs([{ field: "", value: "" }]);
        setPaymentSchedule({
          advance: "",
          afterDispatch: "",
          onDelivery: "",
          afterTesting: "",
        });
  
        setCommercialCondition({
          productPrice: "",
          priceValidity: "",
          productDiscount: "",
          discountValidity: "",
          condition: null,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error.response?.data || error.message);
      
      setErrorMessage(error.response?.data?.message || "Something went wrong")
    }
    finally{
      setIsLoading(false)
    }
  };
  
  useEffect(() => {
    if (specData?.length > 0) {
      const data = specData.filter(
        (item) => item.category?._id === formData.category
      );
      setFilterSpec(data);
    }
  }, [formData, specData]);

  return (
    <>
      <ToastContainer />
      <div className="bg-white w-full border-2 border-emerald-500 rounded-4xl">
        <h3 className="text-[20px] font-semibold p-9 py-6 border-b-1 border-zinc-200">
          Fill the form
        </h3>
        <form className="p-9 py-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Main Form */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="text-lg" htmlFor="productName"> Product Name</label>
              <input
                type="text"
                name="productName"
                className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter Product Name"
                required
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="category">
                  Select Category
                </label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="category"
                  value={formData.category}
                  onChange={CategoryHandleChange}
                  required
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  {categoryData.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="subCategory">
                  Select Sub Category
                </label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Select Sub Category
                  </option>
                  {subCategoryData.length > 0 ? subCategoryData?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  )): <option value="" disabled> Please select category first </option>}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-5">

              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="iso">
                  ISO Certified
                </label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="iso"
                  value={formData.iso}
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Please Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product General Specification */}

          {formData.category && (
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold p-5 py-3 bg-zinc-100">
                Product General Specification
              </h3>
              <div className="w-full border-1 grid grid-cols-2 gap-6 border-green-300 p-5 bg-green-50">
                {filterSpec.map((item) => (
                  <div className="flex flex-col gap-3" key={item._id}>
                    <label
                      className="text-lg line-clamp-1 overflow-hidden"
                      htmlFor={item._id}
                    >
                      {item.name}
                    </label>
                    <input
                      className="w-full border-1 border-zinc-200 bg-white outline-none p-3 rounded-lg"
                      type="text"
                      name={item._id}
                      value={formData.specifications[item._id] || ""}
                      onChange={handleSpecChange}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Specifications */}

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold p-5 py-3 bg-zinc-100">
              Additional Specification
            </h3>
            <div className="w-full border-1 flex flex-col items-center gap-6 border-green-300 p-5 bg-green-50">
              {additionalSpecs.map((item, index) => (
                <div className="w-full  flex items-center gap-6 " key={index}>
                  <div className="w-1/2 flex flex-col gap-3">
                    <label className="text-lg" htmlFor="">
                      {" "}
                      Specification Name{" "}
                    </label>
                    <input
                      type="text"
                      className="bg-white w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                      onChange={(e) =>
                        handleAdditionalSpecChange(
                          index,
                          "field",
                          e.target.value
                        )
                      }
                      value={additionalSpecs[index].field}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-3">
                    <label className="text-lg" htmlFor="">
                      {" "}
                      Specification value{" "}
                    </label>
                    <input
                      type="text"
                      className="bg-white w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                      onChange={(e) =>
                        handleAdditionalSpecChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                      value={additionalSpecs[index].value}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <span
                      className="bg-teal-600 p-2 rounded-lg text-white cursor-pointer"
                      onClick={addAdditionalSpec}
                    >
                      {" "}
                      <FaPlus />{" "}
                    </span>
                    <span
                      className="bg-rose-500 p-2 rounded-lg text-white cursor-pointer"
                      onClick={() => removeAdditionalSpec(index)}
                    >
                      {" "}
                      <FaMinus />{" "}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Schedule */}

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold p-5 py-3 bg-zinc-100">
              Payment Schedule
            </h3>
            <div className="w-full border-1 grid grid-cols-4 items-center gap-6 border-green-300 p-5 bg-green-50">
              <div className="flex flex-col gap-3">
                <label htmlFor="advance">Advance</label>
                <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg ">
                  <input
                    type="number"
                    name="advance"
                    className=" w-full  outline-none  "
                    value={paymentSchedule.advance}
                    onChange={handlePaymentScheduleChange}
                    placeholder="In Percentage"
                    required
                  />{" "}
                  <span className="text-xl">
                    {" "}
                    <MdOutlinePercent />{" "}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="afterDispatch">After Dispatch</label>
                <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg">
                  {" "}
                  <input
                    type="number"
                    name="afterDispatch"
                    className="w-full outline-none"
                    value={paymentSchedule.afterDispatch}
                    onChange={handlePaymentScheduleChange}
                    placeholder="In Percentage"
                    required
                  />{" "}
                  <span className="text-xl">
                    {" "}
                    <MdOutlinePercent />{" "}
                  </span>{" "}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="onDelivery">On Delivery</label>
                <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg">
                  <input
                    type="number"
                    name="onDelivery"
                    className="w-full outline-none"
                    value={paymentSchedule.onDelivery}
                    onChange={handlePaymentScheduleChange}
                    placeholder="In Percentage"
                    required
                  />{" "}
                  <span className="text-xl">
                    {" "}
                    <MdOutlinePercent />{" "}
                  </span>{" "}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="afterTesting">After Testing</label>
                <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg">
                  {" "}
                  <input
                    type="number"
                    name="afterTesting"
                    className="w-full outline-none"
                    value={paymentSchedule.afterTesting}
                    onChange={handlePaymentScheduleChange}
                    placeholder="In Percentage"
                    required
                  />{" "}
                  <span className="text-xl">
                    {" "}
                    <MdOutlinePercent />{" "}
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Condition */}

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold p-5 py-3 bg-zinc-100">
              Commercial Condition
            </h3>

            <div className="w-full border-1 grid grid-cols-4 items-center gap-6 border-green-300 p-5 bg-green-50">
              <div className="flex flex-col gap-3">
                <label htmlFor="productPrice">Product Price (Per unit)</label>
                <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg">
                  {" "}
                  <input
                    type="number"
                    name="productPrice"
                    className="w-full outline-none"
                    value={commercialCondition.productPrice}
                    onChange={handleCommercialConditionChange}
                    placeholder="Price"
                    required
                  />{" "}
                  <span className="text-xl">
                    {" "}
                    <MdOutlineCurrencyRupee />{" "}
                  </span>{" "}
                </div>
              </div>
              <div className="flex w-full flex-col gap-3">
                <label htmlFor="priceValidity">Price Validity</label>
                <input
                  type="date"
                  name="priceValidity"
                  className="  border-1 border-zinc-200 bg-white w-full p-3 rounded-lg outline-none"
                  value={commercialCondition.priceValidity}
                  onChange={handleCommercialConditionChange}
                  placeholder="Validity"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="productDiscount">Product Discount</label>
                <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg">
                  {" "}
                  <input
                    type="number"
                    name="productDiscount"
                    className="w-full outline-none"
                    value={commercialCondition.productDiscount}
                    onChange={handleCommercialConditionChange}
                    placeholder="Discount"
                    required
                  />{" "}
                  <span className="text-xl">
                    {" "}
                    <MdOutlinePercent />{" "}
                  </span>{" "}
                </div>
              </div>
              <div className="flex w-full flex-col gap-3">
                <label htmlFor="discountValidity">Discount Validity</label>
                <input
                  type="date"
                  name="discountValidity"
                  className="  border-1 border-zinc-200 bg-white w-full p-3 rounded-lg outline-none"
                  value={commercialCondition.discountValidity}
                  onChange={handleCommercialConditionChange}
                  placeholder="Offer Validity"
                  required
                />
              </div>

              <div className="flex w-full flex-col gap-3 col-span-2">
              <label htmlFor="productUnit">Product Unit</label>
              <select name="productUnit" id="productUnit" className="border-1 border-zinc-200 bg-white w-full p-3 rounded-lg outline-none" value={commercialCondition.productUnit} onChange={handleCommercialConditionChange}>
                    <option value="" hidden>Select product unit</option>
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

              <div className="flex w-full flex-col gap-3 col-span-2">
                <label htmlFor="conditions">Terms and Conditions</label>
                <input
                  type="file"
                  name="conditions"
                  className=" border-1 border-zinc-200 bg-white w-full p-3 rounded-lg outline-none"
                  placeholder="Offer Validity"
                 
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
          </div>
          {errMessage && <div className="flex items-center justify-end">
            <p className="text-red-500">{errMessage}</p>
          </div>}

          <div className="flex items-center justify-end ">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white w-fit cursor-pointer"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CatalogForm;
