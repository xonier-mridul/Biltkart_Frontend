import React, {useState, useEffect} from 'react'
import OrderDetailPage from '../../components/common/OrderDetailPage'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import OrderTracking from '../../components/common/OrderTracking'

const OrderDetail = () => {
    const [orderData, setOrderData] = useState({})
    
    const [user,setUser] = useState()
    const params = useParams();

    const id = params.id;


    const getOrderData = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}order/getbyid/${id}`, {withCredentials: true});
            if(response.status === 200){
                setOrderData(response.data.orders)
                return
            }
        } catch (error) {
            console.error(error);
        }
    }

    const verifyAuth = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}auth/verify-auth`, {withCredentials: true});
        if(response.status === 200){
            setUser(response.data.user)
            
        }
      } catch (error) {
        
      }
    }


    useEffect(() => {
      getOrderData();
      verifyAuth()
    }, [])
    
  return (
    <>
    <div className='p-5 flex flex-col gap-5'>
      <OrderDetailPage orderData={orderData} user={user}/>
      <OrderTracking orderData={orderData} id={id} user={user}/>
    </div>
    </>
  )
}

export default OrderDetail
