import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BRFQAssign from '../../components/admin/BRFQAssign'
import { useParams } from 'react-router-dom'


const Assign = () => {
    const [BRFQData, setBRFQData] = useState({});
    const [supplierData, setSupplierData] = useState([])

    const params = useParams();

    const id = params.id

    const getBRFQDataWithId = async(id)=>{
        try {
            if(!id) return
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}brfq/single/${id}`, {withCredentials: true});

            if(response.status === 200){
                setBRFQData(response.data?.brfq);
               
            }
        } catch (error) {
            console.error(error)
        }
    }

  

    const getSuppliers = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/supplier`, {withCredentials: true});
            if(response.status === 200){
                setSupplierData(response.data?.user)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
      getBRFQDataWithId(id);
      getSuppliers()
    }, [])
    
  return (
    <>
    <div className='p-5 flex flex-col gap-5'>
      <BRFQAssign brfqData={BRFQData} suppliers={supplierData} />
    </div>
    </>
  )
}

export default Assign
