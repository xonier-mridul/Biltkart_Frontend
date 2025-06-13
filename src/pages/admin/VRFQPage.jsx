import React, {useState,useEffect} from 'react'
import axios from 'axios'
import VRFQTable from '../../components/admin/VRFQTable'

const VRFQPage = ({}) => {
    const [vrfqData, setVrfqData] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
      const [currentPage, setCurrentPage] = useState(1);


    const getVRFQ = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}vrfq/getall?page=${currentPage}`, {withCredentials: true});
            if(response.status === 200){
               setVrfqData(response.data?.vrfq);
               setTotalPages(response.data?.totalPages)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getVendorData = async()=>{
       try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/supplier`, {withCredentials: true});
        if(response.status === 200){
            setVendorData(response.data.user)
        }
       } catch (error) {
        console.log(error);
       }
    }

    useEffect(() => {
      getVRFQ(),
      getVendorData()
    }, [currentPage])
    
  return (
    <>
      <div className='p-5 flex flex-col gap-5'>
        <VRFQTable vrfqData={vrfqData} vendorData={vendorData} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
      </div>
    </>
  )
}

export default VRFQPage
