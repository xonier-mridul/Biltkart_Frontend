import React,{useState} from 'react'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

const MyQuotationTable = ({myQuotationData}) => {
    const [searchTerm, setSearchTerm] = useState("")
        
    
       
        const filteredData = myQuotationData?.filter((item=>
                `${item._id} ${item.company} ${item.brfqId?._id} ${item.brfqId?.rfqId?.product} ${item.brfqId?.rfqId?.quantity} ${item.brfqId?.rfqId?.DeliveryLocation} ${new Date(item.brfqId?.rfqId?.fromDate).toLocaleDateString()} `.toLowerCase().includes(searchTerm.toLowerCase())
            ))

           const length = filteredData.length;
  return (
    <>
      <div className="bg-white border-emerald-500 border-2 rounded-4xl p-8 m-5">
          <div className="mb-5">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="w-full border-[1px] border-[#eff2f5]">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className='p-4 text-start'> BRFQ ID </th>
                            <th className="p-4 text-start border-l-1 border-[#f1f1f1] capitalize">Product Name </th>
                            <th className="p-4 text-start border-l-1 border-[#f1f1f1] capitalize">Quantity</th>
                            <th className="p-4 text-start border-l-1 border-[#f1f1f1]  capitalize">Delivery Location</th>
                            <th className="p-4 text-start border-l-1 border-[#f1f1f1] text-nowrap capitalize">Delivery Start date</th>
                            <th className="p-4 text-start border-l-1 border-[#f1f1f1] capitalize">Action</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                       {length > 0 ? filteredData.map((item, index) => (
                         <tr key={item._id}>
                              <td className="p-4 border-b-[1px] border-[#f1f1f1] ">  <Link to={`quotation-detail/${item._id}`} className='hover:text-green-500 transition-all'> {item.brfqId?._id || "N/A"} </Link> </td>
                              <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]"><span className='capitalize'>{item.brfqId?.rfqId?.product || "N/A"}</span></td>
                              <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]">
                                <span className=' text-lime-500 bg-emerald-50  text-sm  py-2 px-4 rounded-lg text-nowrap font-medium'>{item.brfqId?.rfqId?.quantity || "N/A"} ({item.brfqId?.rfqId?.measurement}) </span>
                              </td>
                              <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]">{item.brfqId?.rfqId?.DeliveryLocation || "N/A"}</td>
                              <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]">  <span className='text-orange-400 p-1 px-4 rounded-lg bg-orange-50 text-sm'>{new Date(item.brfqId?.rfqId?.fromDate).toLocaleDateString()|| "N/A"}</span></td>
                              <td className="p-4 border-b-[1px] border-l-1 border-[#f1f1f1]"><div className='flex items-center  gap-2'>
                                  {item.process === "negotiate" && <Link to={`quotation-edit/${item._id}`} className='rounded-lg bg-orange-500 px-2 py-2 text-white cursor-pointer text-lg'><MdEdit /></Link >}
                                  <Link to={`quotation-detail/${item._id}`} className='rounded-lg bg-teal-600 px-2 py-2 text-white cursor-pointer text-lg'><FaEye /></Link >
                              </div></td>
                              
                            </tr> 
                            
                          
                          )) : <td colSpan="6" className="p-4 text-center text-gray-500"> Nothing Found </td>}
                        </tbody>
                      </table>
          </div>
    </>
  )
}

export default MyQuotationTable
