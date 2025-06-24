import React, {useState, useEffect} from 'react'
import SupplierMonitor from '../../components/supplier/SupplierMonitor'
import api from '../../components/common/api'
import SupplierSales from '../../components/supplier/SupplierSales'


const SupplierDashboard = () => {
  const [orderData, setOrderData] = useState(0)
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(0)
  const [totalSupplierCount, setTotalSupplierCount] = useState(0)


  const getOrderData = async()=>{
    try {
      const response = await api.get('/order/supplier-order', {withCredentials: true})
      if(response.status === 200){
        setOrderData(response.data?.totalOrders)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getTotalDeliverOrder = async()=>{
     try{
      const response = await api.get('/order/supplier-delivered-order-count', {withCredentials: true})
      if(response.status === 200){
        setDeliveredOrderCount(response.data.orderCount)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getTotalSupplier = async()=>{
    try{
      const response = await api.get('/user/supplier-count', {withCredentials: true})
      if(response.status === 200){
          setTotalSupplierCount(response.data?.supplierCount)
      }
    }catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getOrderData(),
    getTotalDeliverOrder(),
    getTotalSupplier()
  }, [])
  

  return (
    <>
      <div className='p-5 flex flex-col gap-5'> 
        <SupplierMonitor orderData={orderData} deliveredOrderCount={deliveredOrderCount} totalSupplierCount={totalSupplierCount}/>
        <SupplierSales/>
      </div>
    </>
  )
}

export default SupplierDashboard
