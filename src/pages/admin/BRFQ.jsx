import axios from 'axios'
import React, {useEffect, useState} from 'react'
import BRFQTable from '../../components/admin/BRFQTable'


const BRFQ = () => {
  const [BRFQData, setBRFQData] = useState([])
   const [currentPage, setCurrentPage] = useState(1);
         const [totalPages, setTotalPages] = useState(1);

  const getBRFQ = async()=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}brfq/get-pending?page=${currentPage}`, {withCredentials: true})
        if(response.status === 200){
          setBRFQData(response.data.brfqs);
          setTotalPages(response.data?.totalPages)
        } 
    } catch (error) {
      console.error(error)
    }
  }

  const handlePageChange = (no) => {
    if (no >= 1 && no <= totalPages) {
      return setCurrentPage(no);
    }
  };

  useEffect(() => {
    getBRFQ()
  }, [currentPage])
  

  return (
    <>
      <div className='p-5 flex flex-col gap-5'>
         <BRFQTable BRFQData={BRFQData} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  )
}

export default BRFQ
