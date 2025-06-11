import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const data = [
    {
      _id:1,
      order:"#34343",
      product:"MCB Changeover Switch",
      quantity:"200",
      status:'Paid'
    },
    {
      _id:2,
      order:"#34644",
      product:"Instant Water Heater	",
      quantity:"4400",
      status:'Unpaid'
    },
    {
      _id:3,
      order:"#34234",
      product:"MCB Changeover Switch	",
      quantity:"400",
      status:'Paid'
    },
    {
      _id:4,
      order:"#3234",
      product:"Instant Water Heater	",
      quantity:"1400",
      status:'Paid'
    },
    {
      _id:5,
      order:"#3734",
      product:"MCB Changeover Switch",
      quantity:"1400",
      status:'Unpaid'
    },
    {
      _id:6,
      order:"#8737",
      product:"MCB Changeover Switch",
      quantity:"456",
      status:'Unpaid'
    },
    {
      _id:7,
      order:"#8737",
      product:"MCB Changeover Switch",
      quantity:"890",
      status:'Paid'
    },
]

const ProductStats = ({orderData}) => {
  const [productData, setProductData] = useState(data)
    
  return (
    <div className='bg-white p-5 rounded-4xl border-emerald-500 border-2 '>
        <h3 className='capitalize font-bold text-[22px]' > Recent Orders</h3>
        <p className='para text-xl capitalize pb-5' > updated 37 minutes ago</p>
        <div className='w-full overflow-x-scroll'>
        <table className='w-full border-[1px] border-[#f1f1f1] '>
            <thead>
                <tr>

                <th className='p-4 bg-slate-100 border-l-1 border-[#f1f1f1] text-start'> Order</th>
                <th className='p-4 bg-slate-100 border-l-1 border-[#f1f1f1] text-start'> Product</th>
                <th className='p-4 bg-slate-100 border-l-1 border-[#f1f1f1] text-start'> Quantity</th>
                <th className='p-4 bg-slate-100 border-l-1 border-[#f1f1f1] text-start'> Status</th>
                </tr>
            </thead>
            <tbody>
                {orderData.length> 0 ? orderData.map(e=>(

                <tr className='border-b-1 border-[#f1f1f1]' key={e._id}>
                    <td className='p-4 para text-sm'> <Link to={`order/order-detail/${e?._id}`} className='hover:text-green-500 transition-all duration-300 hover:scale-105'>{e?._id}</Link></td>
                    <td className='p-4  border-l-1 border-[#f1f1f1] capitalize'>{e?.vrfqId?.brfqId?.rfqId?.product || "N/A"}</td>
                    <td className='p-4  border-l-1 border-[#f1f1f1] capitalize'>{e?.vrfqId?.brfqId?.rfqId?.quantity || "N/A"}</td>
                    <td className=' p-4 border-l-1  border-[#f1f1f1] capitalize text-sm'> <span className={`${e?.process === "delivered" ? "text-green-400 bg-green-100" : "text-orange-500 bg-orange-100 "} p-2 px-4 tracking-wide rounded-md font-semibold `}> {e?.process } </span></td>
                </tr>
                )):(
                  <tr className='border-b-1 border-[#f1f1f1]'>
                      <td className='p-4 para text-center' colSpan={4}> Data not found</td>
                  </tr>
                )}
                
            </tbody>

        </table>
        </div>
    </div>
  )
}

export default ProductStats
