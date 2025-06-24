import React, {useState, useEffect} from 'react'
import api from '../../components/common/api'
import ApprovedBRFQTable from '../../components/admin/ApprovedBRFQTable'

const ApprovedBRFQ = () => {
     const [BRFQData, setBRFQData] = useState([])
       const [currentPage, setCurrentPage] = useState(1);
       const [totalPages, setTotalPages] = useState(1);

  const getBRFQ = async()=>{
    try {
        const response = await api.get(`/brfq/get-approved?page=${currentPage}`, {withCredentials: true})
        if(response.status === 200){
          setBRFQData(response.data.brfqs);
          setTotalPages(response.data?.totalPages)
        } 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBRFQ()
  }, [currentPage])

  const handlePageChange = (no) => {
    if (no >= 1 && no <= totalPages) {
      return setCurrentPage(no);
    }
  };
  

  return (
    <>
      <div className='p-5 flex flex-col gap-5'>
        <ApprovedBRFQTable BRFQData={BRFQData} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
      </div>
    </>
  )
}

export default ApprovedBRFQ
