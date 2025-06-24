import React from 'react'
import { useNavigate } from 'react-router-dom'


const OrderDetailPage = ({orderData, user}) => {

    const navigate = useNavigate();
  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl m-5 border-2 border-emerald-500">
        <div className='px-7 py-4 flex justify-between items-center border-b-1 border-stone-200'>
           <h2 className='text-xl font-semibold'> Order Detail</h2>
           <div className='flex items-center gap-1'>
           <h2 className='text-xl font-semibold'> Order Id:</h2>
            <span className='text-green-500 text-lg'>{orderData?._id}</span>
           </div>
        </div>
        <div className='flex flex-col gap-5 w-full p-6'>
            <div className="grid grid-cols-4 gap-4">
                <div className='rounded-xl border-zinc-200 border-1 overflow-hidden'>
                    <h2 className='text-center font-semibold bg-green-50 py-2.5 capitalize'>Customer:</h2>
                    <div className='p-4 px-6'> 
                  <h4 className='capitalize text-lg font-semibold text-green-500'>{orderData.vrfqId?.brfqId?.rfqId?.createdBy?.company || "N/A"}</h4>
                  {(user?.role === "admin") &&<h4 className='font-semibold'>Phone: <span className='font-normal'>{orderData.vrfqId?.brfqId?.rfqId?.createdBy?.number || "N/A"}</span></h4>}
                  {(user?.role === "admin") &&<h4 className='font-semibold'>Email: <span className='font-normal'>{orderData.vrfqId?.brfqId?.rfqId?.createdBy?.email || "N/A"}</span></h4>}

                </div>
                </div>
                <div className='rounded-xl border-zinc-200 border-1 overflow-hidden'>
                    <h2 className='text-center font-semibold bg-green-50 py-2.5 capitalize'>Shipped to:</h2>
                    <div className='p-4 px-6'> 
                  <h4 className='capitalize text-lg font-semibold text-green-500'>{orderData.vrfqId?.brfqId?.rfqId?.DeliveryLocation|| "N/A"}</h4>
                 {(user?.role === "admin") && <h4 className='font-semibold'>Supplier: <span className='font-normal capitalize'>{orderData?.supplier?.company || "N/A"}</span></h4>}
                

                </div>
                </div>
                <div className='rounded-xl border-zinc-200 border-1 overflow-hidden'>
                    <h2 className='text-center font-semibold bg-green-50 py-2.5 capitalize'>payment method:</h2>
                    <div className='p-4 px-6'> 
                  <h4 className='capitalize text-lg font-semibold text-green-500'>{orderData.vrfqId?.brfqId?.rfqId?.DeliveryLocation|| "N/A"}</h4>
                  <h4 className='font-semibold'>Phone: <span className='font-normal'>{orderData.vrfqId?.brfqId?.rfqId?.pinCode || "N/A"}</span></h4>
                  

                </div>
                </div>
                <div className='rounded-xl border-zinc-200 border-1 overflow-hidden'>
                    <h2 className='text-center font-semibold bg-green-50 py-2.5 capitalize'>order date:</h2>
                    <div className='p-4 px-6'> 
                  
                  <h4 className='font-semibold'>Time: <span className='font-normal'>{new Date(orderData?.createdAt).toLocaleTimeString("en-IN", {hour:"2-digit", minute:"2-digit", hour12: true}) || "N/A"}</span></h4>
                  <h4 className='font-semibold'>Date: <span className='font-normal'>{new Date(orderData?.createdAt).toLocaleDateString() || "N/A"}</span></h4>

                </div>
                </div>
                
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-xl '>Product Summary</h2>
                <table className='border-1 border-stone-200'>
                    <thead>
                        <tr className='bg-slate-100 border-b-1 border-stone-200'>
                            <th className='p-4 capitalize text-start'>product name</th>
                            <th className='p-4 capitalize border-l-1 border-stone-200 text-start'>price per unit ({orderData?.vrfqId?.brfqId?.rfqId?.measurement || "N/A"})</th>
                            <th className='p-4 capitalize border-l-1 border-stone-200 text-start'>Quantity</th>
                            
                            <th className='p-4 capitalize border-l-1 border-stone-200 text-start'>Total (₹)</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {orderData?.vrfqId?.TotalPrice.length > 0 ? orderData?.vrfqId?.TotalPrice.map((item,index)=>(
                            < >
                            <tr key={item._id} className='border-b-1 border-stone-200'> 
                              <td className='p-4 '><span className='capitalize'>{item?.product?.productName || "N/A"} </span></td>
                              <td className='p-4 border-l-1 border-stone-200'><span className='font-medium'>₹{item.pricePerUnit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "N/A"}</span> </td>
                              <td className='p-4 border-l-1 border-stone-200'>{item.totalUnit || "N/A"} </td>
                              {/* <td className='p-4 border-l-1 border-stone-200'> <span className='bg-green-50 px-5 py-2 text-sm text-green-500'>{item.gst || "N/A"} </span> </td> */}
                              <td className='p-4 border-l-1 border-stone-200 font-semibold tracking-wide'>₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "N/A"}  </td>
                            </tr>
                            <tr className='border-b-1 border-stone-200'>
                               <td className='p-4 text-end' colSpan={3}>GST (18%)</td>
                               <td className='p-4 border-l-1 border-stone-200' colSpan={3}> <span className='font-semibold'>₹{item.gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
                            </tr>
                            <tr className='border-b-1 border-stone-200'>
                               <td className='p-4 text-end' colSpan={3}>Final Price</td>
                               <td className='p-4 border-l-1 border-stone-200' colSpan={3}><span className='font-semibold tracking-wide'>₹{item.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
                            </tr>
                            <tr className='border-b-1 border-stone-200'>
                               <td className='p-4 text-end' colSpan={3}>Payment Status</td>
                               <td className='p-4 border-l-1 border-stone-200' colSpan={3}><span className=' text-sm bg-red-50 text-red-500 py-2 px-5 rounded-lg tracking-wide font-semibold'>Pending</span></td>
                            </tr>
                            </>

                        )):(

                        <tr>
                            <td className='p-4 text-center ' colSpan={4}> Data not found </td>
                        </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
        <div>
            
        </div>
        <div className='flex justify-end items-center p-6 pt-0'> 
           <button className='text-white bg-emerald-600 cursor-pointer px-6 py-2.5 tracking-wide rounded-lg' onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  )
}

export default OrderDetailPage
