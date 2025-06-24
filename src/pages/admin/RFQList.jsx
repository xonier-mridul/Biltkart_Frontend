import React,{useState, useEffect} from 'react'
import RFQListTable from '../../components/admin/RFQListTable'
import axios from 'axios'

const RFQList = () => {
    const [rfqData, setRfqData] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);


    const getRfq = async()=>{
       try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}new-rfq/get-pending?page=${currentPage}`, {withCredentials: true});
        if(response.status === 200){
            setRfqData(response.data?.rfqList);
            setTotalPages(response.data?.totalPages)
        }

       } catch (error) {
        console.error(error)
       }
    }

     const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    useEffect(() => {
      getRfq()
    }, [currentPage])
    
  return (
    <>
      <div className='p-5 flex flex-col gap-5'>
        <RFQListTable rfqData={rfqData} setRfqData={setRfqData} totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage}/>
      </div>
    </>
  )
}

export default RFQList
