import React, {useState, useEffect} from 'react'
import SalesChart from '../admin/SalesChart'
import DailySales from '../admin/DailySales'
import axios from "axios"

const SupplierSales = ({orderCount}) => {
  const [orderData, setOrderData] = useState([])
  const [weeklyOrderData, setWeeklyOrderData] = useState([])
  console.log(weeklyOrderData)

  const getData = async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}order/all-received`, {withCredentials: true})
      if(response.status === 200){
        setOrderData(response?.data?.orders)
      }
    }
    catch(err){
      console.error(err)
    }
  }

  const getWeeklyOrderData = async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}order/weekly-order-count-by-supplier`, {withCredentials: true})
      if(response.status === 200){
        setWeeklyOrderData(response?.data?.weeklyOrderData)
      }
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getData(),
    getWeeklyOrderData()
  },[])

  return (
    <>
      <div className='flex gap-5'>
        <div className='w-3/5'>
            <SalesChart orderCount={orderCount} orderData={orderData}/>
        </div>
        <div className='w-2/5'>
            <DailySales weeklyOrderData={weeklyOrderData}/>
        </div>
      </div>
    </>
  )
}

export default SupplierSales
