import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlinePercent,  MdCurrencyRupee } from "react-icons/md";

const ProductEditPage = ({ categoryData, subCategoryData, sellerData}) => {
  
    const [catalogData, setCatalogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    productName:"",
    category: "",
    subCategory: "",
    seller: "",
    iso: "",
    specifications: [],
    addSpecifications: [],
    paymentSchedule:{
      advance:"",
      afterDispatch:"",
      onDelivery:"",
      afterTesting:""
    },
    commercialCondition:{
      productPrice:"",
      priceValidity:"",
      productDiscount:"",
      discountValidity:"",
      productUnit: "",
    }
  });

  const getCatalogById = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}catalog/${id}`,{withCredentials: true});
      if (response.status === 200) {
        setCatalogData(response.data);
        setFormData({
          productName: response.data?.productName || "",
          category: response.data.category?._id || "",
          subCategory: response.data?.subCategory._id || "",
          seller: response.data.seller?._id || "",
          iso: response.data?.iso || "",
          specifications: response.data?.specifications?.map((spec) => ({
            key: spec.key?._id || "",
            name: spec.key?.name || "",
            value: spec.value || "",
          })),
          addSpecifications: response.data.addSpecifications.map((spec) => ({
            field: spec.field,
            value: spec.value,
          })),
          paymentSchedule:{
            advance: response?.data?.paymentSchedule?.advance || "",
            afterDispatch: response?.data?.paymentSchedule?.afterDispatch || "",
            onDelivery: response?.data?.paymentSchedule?.onDelivery || "",
            afterTesting: response?.data?.paymentSchedule?.afterTesting || ""
          },
          commercialCondition:{
            productPrice: response?.data?.commercialCondition?.productPrice || "",
            priceValidity: response?.data?.commercialCondition?.priceValidity || "",
            productDiscount: response?.data?.commercialCondition?.productDiscount || "",
            discountValidity: response?.data?.commercialCondition?.discountValidity || "",
            productUnit: response?.data?.commercialCondition?.productUnit || "",
          }
        });
      }
    } catch (error) {
      console.error("Error fetching catalog:", error.message);
    }
  };

  useEffect(() => {
    getCatalogById()
  }, [])
  

  const { id } = useParams();
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecificationChange = (index, value, type) => {
    const updatedSpecifications = [...formData[type]];
    updatedSpecifications[index].value = value;
    setFormData((prev) => ({ ...prev, [type]: updatedSpecifications }));
    
  };

  const handlePaymentScheduleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      paymentSchedule: {
        ...prevFormData.paymentSchedule,
        [name]: value
      }
    }));
  };



  const handleCommercialConditionChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prevData=> ({
      ...prevData, commercialCondition:{
        ...prevData.commercialCondition, [name]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}catalog/update/${id}`, formData, {withCredentials: true});
      if (response.status === 200) {
        toast.success("Catalog Updated successfully", {
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
               
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Catalog not updated");
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white border-2 border-emerald-500 rounded-2xl m-5">
        <div className="mb-5 flex justify-between items-center px-8 py-6 border-b border-gray-300">
          <h2 className="font-semibold text-2xl"> <span className="capitalize">{catalogData?.productName}</span></h2>
          
          <button type='button' className='capitalize font-medium text-lg text-white bg-emerald-600 py-2 px-8 cursor-pointer rounded-md' onClick={()=>navigate(-1)}> Back </button>
        </div>
        <form className="p-9 py-6 flex flex-col gap-9" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="text-lg" htmlFor="productName">Product Name</label>
              <input className="w-full border border-zinc-200 p-3 rounded-lg" type="text" name="productName" value={formData.productName} onChange={handleChange} />

            </div>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg">Select Category</label>
                <select className="w-full border border-zinc-200 p-3 rounded-lg" name="category" value={formData.category} onChange={handleChange}>
                  {categoryData?.map((category) => (
                    <option key={category._id} value={category._id}>{category.category}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg">Select Sub Category</label>
                <select className="w-full border border-zinc-200 p-3 rounded-lg" name="subCategory" value={formData.subCategory} onChange={handleChange}>
                  {subCategoryData?.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg">Select Seller</label>
                <select className="w-full border border-zinc-200 p-3 rounded-lg" name="seller" value={formData.seller} onChange={handleChange}>
                  {sellerData?.map((item) => (
                    <option key={item._id} value={item._id}><span className="capitalize">{item.company} </span></option>
                  ))}
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg">ISO Certified</label>
                <select className="w-full border border-zinc-200 p-3 rounded-lg" name="iso" value={formData.iso} onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Specification */}

          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-semibold p-5 py-3 bg-gray-100">Product Specification</h3>
            <div className="w-full grid grid-cols-1 gap-6 ">
              {formData?.specifications?.map((spec, index) => (
                <div className="w-full flex items-center gap-6" key={index}>
                  <div className="w-full flex flex-col gap-3">
                    <label className="text-lg">Specification Name</label>
                    <input type="text" className="w-full border border-zinc-200 p-3 rounded-lg" value={spec?.name} readOnly />
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <label className="text-lg">Specification Value</label>
                    <input type="text" className="w-full border border-zinc-200 p-3 rounded-lg" value={spec?.value} onChange={(e) => handleSpecificationChange(index, e.target.value, "specifications")} />
                  </div>
                </div>
              ))}
              {formData?.addSpecifications?.map((spec, index) => (
                <div className="w-full flex items-center gap-6" key={index}>
                  <div className="w-full flex flex-col gap-3">
                    <label className="text-lg">Specification Name</label>
                    <input type="text" className="w-full border border-zinc-200 p-3 rounded-lg" name="" value={spec.field} readOnly />
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <label className="text-lg">Specification Value</label>
                    <input type="text" className="w-full border  border-zinc-200 p-3 rounded-lg" value={spec.value} onChange={(e) => handleSpecificationChange(index, e.target.value, "addSpecifications")} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Schedule */}

          <div className="flex flex-col gap-5">
             <h3 className="text-lg font-semibold p-5 py-3 bg-gray-100">Payment Schedule </h3>
             <div className="w-full border-1 grid grid-cols-4 items-center gap-6 border-green-300 p-5 bg-green-50 ">
                <div className="w-full flex flex-col gap-3">
                  <label htmlFor="advance">Advance</label>
                  <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg"><input type="number" name="advance" className="w-full outline-none" value={formData.paymentSchedule.advance} onChange={handlePaymentScheduleChange}/> <span className="text-xl"><MdOutlinePercent /></span></div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <label htmlFor="afterDispatch">After Dispatch</label>
                  <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg"><input type="number" name="afterDispatch" className="w-full outline-none" value={formData.paymentSchedule.afterDispatch} onChange={handlePaymentScheduleChange} /> <span className="text-xl"><MdOutlinePercent /></span> </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <label htmlFor="onDelivery">On Delivery</label>
                  <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg"><input type="number" name="onDelivery" className="w-full outline-none" value={formData.paymentSchedule.onDelivery} onChange={handlePaymentScheduleChange}/><span className="text-xl"><MdOutlinePercent /></span></div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <label htmlFor="afterTesting">After Testing</label>
                  <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg"><input type="number" name="afterTesting" className="w-full outline-none" value={formData.paymentSchedule.afterTesting} onChange={handlePaymentScheduleChange}/><span className="text-xl"><MdOutlinePercent /></span></div>
                </div>
             </div>
          </div>

          {/* Commercial Condition */}

          <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold p-5 py-3 bg-gray-100">Commercial Condition </h3>
          <div className="w-full border-1 grid grid-cols-4 items-center gap-6 border-green-300 p-5 bg-green-50 ">
             <div className="w-full flex flex-col gap-3">
               <label htmlFor="productPrice">Product Price (Per unit)</label>
               <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg"><input type="number" name="productPrice" className="w-full outline-none" value={formData.commercialCondition.productPrice} onChange={handleCommercialConditionChange}/><span className="text-xl">< MdCurrencyRupee /></span></div>
             </div>
             <div className="w-full flex flex-col gap-3">
              <label htmlFor="priceValidity">Price Validity</label>
              <input type="date" name="priceValidity" className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none" value={formData.commercialCondition.priceValidity.split("T")[0]} onChange={handleCommercialConditionChange}/>
             </div>
             <div className="w-full flex flex-col gap-3">
              <label htmlFor="productDiscount">Product Discount</label>
              <div className="flex items-center gap-3 border-1 border-zinc-200 bg-white w-full p-3 rounded-lg"><input type="number" name="productDiscount" className="w-full outline-none" value={formData.commercialCondition.productDiscount} onChange={handleCommercialConditionChange} /> <span className="text-xl"> <MdOutlinePercent /></span></div>
             </div>
             <div className="w-full flex flex-col gap-3">
              <label htmlFor="discountValidity">Price Validity</label>
              <input type="date" name="discountValidity" className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none" value={formData.commercialCondition.discountValidity.split("T")[0]} onChange={handleCommercialConditionChange}/>
             </div>
             <div className="flex w-full flex-col gap-3 col-span-2">
              <label htmlFor="productUnit">Product Unit</label>
              <select name="productUnit" id="productUnit" className="border-1 border-zinc-200 bg-white w-full p-3 rounded-lg outline-none" value={formData.commercialCondition.productUnit} onChange={handleCommercialConditionChange}>
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
          </div>

          </div>


          <div className="flex items-center justify-end">
            <button type="submit" className="rounded-lg bg-emerald-600 px-6 py-3 text-white w-fit cursor-pointer">{isLoading ? "Updating..." : "Update"}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEditPage;
