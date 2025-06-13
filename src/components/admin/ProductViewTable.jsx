import React, {useEffect, useState}  from 'react'
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


// MEDIA

import { FaUserEdit, FaListUl } from "react-icons/fa";



const ProductViewTable = () => {
       const [userData, setUserData] = useState(null)
      const [catalogData, setCatalogData] = useState([])

  
     const {id} = useParams();
     const navigate = useNavigate();
  
     // Get Catalog 
  
     const getCatalogById = async () => {
      if (!id) return; 
    
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}catalog/${id}`);
        if (response.status === 200) {
          setCatalogData(response.data);
        }
      } catch (error) {
        console.error("Error fetching catalog:", error.message);
      }
    };

     const verifyUser = async()=>{
          try {
            const response = await api.get(`/auth/verify-auth`, {withCredentials: true})
            if(response.status === 200){
          setUserData(response.data?.user)
            }
          } catch (error) {
            console.error("Error verifying user:", error.message);
          }
        }
  
    useEffect(() => {
      getCatalogById();
       verifyUser()
    }, [id]);
     
  return (
    <>
      <div className='bg-white rounded-2xl border-2 border-emerald-600 m-5'>
            <div className='mb-5 flex justify-between items-center px-8 py-6 border-b-1 border-gray-300'>

             <h2 className='font-semibold text-2xl capitalize'>{catalogData?.productName || "N/A"}</h2>
              <div className='flex items-center gap-5'>
             <Link to={"/admin/product-list"} className='text-lg text-white bg-emerald-600 py-2.5 px-6 rounded-lg cursor-pointer flex items-center gap-2'> <FaListUl className='text-lg'/> Product list </Link>
             <Link to={`/${userData?.role ==="admin"? "admin":"supplier-admin"}/product-list/product-edit/${catalogData?._id}`} className='text-lg text-white bg-emerald-600 py-2.5 px-6 rounded-lg cursor-pointer flex items-center gap-2'> <FaUserEdit className='text-xl'/> Edit Product
             </Link>
              </div>
            </div>
            <div className='px-8 py-6'>
            <table className='w-full border-[1px] border-[#eff2f5] '>
                <tbody>
                    <tr className='border-b-1 border-zinc-200'>
                        <th  className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Supplier</th>
                        <td className='w-2/3 p-4 px-6 text-lg'> <span className='capitalize'>{catalogData?.createdBy?.company || "N/A"} </span></td>

                    </tr>
                    <tr className='border-b-1 border-zinc-200'>
                    <th  className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Selected Category</th>
                    <td className='w-2/3 p-4 px-6 text-lg'>{catalogData?.category?.category || "N/A"}</td>
                    </tr>
                    <tr className='border-b-1 border-zinc-200'>
                        <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'> Product Name </th>
                        <td className='w-2/3 p-4 px-6 text-lg'><span className='capitalize'>{catalogData?.productName || "N/A"}</span></td>
                    </tr>
                    <tr className='border-b-1 border-zinc-200'>
                        <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'> ISO Certification </th>
                        <td className='w-2/3 p-4 px-6 text-lg'> <span className={` ${catalogData?.iso === "yes" ? "bg-green-500 text-white" : "bg-red-500 text-white "} py-1 px-4 rounded-md capitalize tracking-wider`} >{catalogData?.iso}</span></td>
                    </tr>
                    
                   
                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Base Price (₹)</th>
                       <td className='w-2/3 p-4 px-6 text-lg'>₹ {catalogData?.commercialCondition?.productPrice || "N/A"}</td>
                   </tr>

                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Product Unit </th>
                       <td className='w-2/3 p-4 px-6 text-lg'> {catalogData?.commercialCondition?.productUnit || "N/A"}</td>
                   </tr>

                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Price Validity</th>
                       <td className='w-2/3 p-4 px-6 text-lg'><span className='text-red-500 bg-red-50 text-sm py-2 px-4 tracking-wider rounded-lg'>{new Date(catalogData?.commercialCondition?.priceValidity).toLocaleDateString() || "N/A"}</span></td>
                   </tr>
                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Product Discount (%) </th>
                       <td className='w-2/3 p-4 px-6 text-lg'>{catalogData?.commercialCondition?.productDiscount || "N/A"}%</td>
                   </tr>
                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Discount Validity </th>
                       <td className='w-2/3 p-4 px-6 text-lg'><span className='text-red-500 bg-red-50 text-sm py-2 px-4 tracking-wider rounded-lg'>{new Date(catalogData?.commercialCondition?.discountValidity).toLocaleDateString() || "N/A"}</span></td>
                   </tr>
                   
                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Final Price (₹) </th>
                       <td className='w-2/3 p-4 px-6 text-lg'> ₹ {catalogData.finalPrice || "N/A"}</td>
                   </tr>
                   <tr className='border-b-1 border-zinc-200'>
                       <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>Term and Condition</th>
                   </tr>
                </tbody>
            </table>
            </div>

            <div className='px-8 py-6 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Product Specifications</h2>
            <table className='w-full border-[1px] border-zinc-300 '>
              <tbody>
                <tr className='border-b-1 border-zinc-200'>
                  <th className='bg-slate-200 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'> Specification</th>
                  <td className='bg-slate-200 border-l-1 border-zinc-300  w-2/3 p-4 px-6 text-lg font-semibold'>Values</td>
                </tr>
                   {catalogData?.specifications?.map((item, index)=>(
                    <tr key={index} className='border-b-1 border-zinc-200'>
                            
                            <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>{item.key.name || "N/A"} </th>
                            <td className='w-2/3 p-4 px-6 text-lg'>{item.value  || "N/A"}</td>
                           
                    </tr>
                   ))}
                   {catalogData?.addSpecifications?.map((item, index)=>(
                     <tr key={index} className='border-b-1 border-zinc-200'>
                           <th className='bg-slate-100 border-b-1 border-zinc-200 w-1/3 p-4 px-6 font-semibold text-lg text-start'>{item.field === "" ? "N/A" : item.field}</th>
                           <td className='w-2/3 p-4 px-6 text-lg'>{item.value === "" ? "N/A" : item.value === "" ? "N/A" : item.value}</td>
                     </tr>
                   ))}
              </tbody>
            </table>
            </div>

            <div className='px-8 py-6 flex flex-col gap-4'>
               <h2 className='text-xl font-semibold'>Payment Schedule</h2>
               <table className='w-full border-[1px] border-zinc-300 '>
                <thead className='bg-slate-100'>
                  <th className='p-4 text-start capitalize'>Advance</th>
                  <th className='p-4 border-l-1 border-zinc-200 text-start capitalize'>After Dispatch</th>
                  <th className='p-4 border-l-1 border-zinc-200 text-start capitalize'>On Delivery</th>
                  <th className='p-4 border-l-1 border-zinc-200 text-start capitalize'>after testing</th>
                  
                </thead>
                <tbody>
                  
                    <td className='p-4 text-start '>{catalogData?.paymentSchedule?.advance || "N/A"}%</td>
                    <td className='p-4 border-l-1 border-[#f1f1f1] text-start '>{catalogData?.paymentSchedule?.afterDispatch || "N/A"}%</td>
                    <td className='p-4 border-l-1 border-[#f1f1f1] text-start '>{catalogData?.paymentSchedule?.onDelivery || "N/A"}%</td>
                    <td className='p-4 border-l-1 border-[#f1f1f1] text-start '>{catalogData?.paymentSchedule?.afterTesting || "N/A"}%</td>
                
                </tbody>

               </table>
            </div>
            <div className='flex justify-end p-4' ><button type='button' className='capitalize font-medium text-lg text-white bg-emerald-600 py-2 px-8 cursor-pointer rounded-md' onClick={()=>navigate(-1)}>Back</button></div>
         </div>
    </>
  )
}

export default ProductViewTable
