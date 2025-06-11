import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SupplierProfileComponent from '../../components/supplier/SupplierProfileComponent'

const SupplierProfile = () => {
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
 
  const fetchUserProfileData = async()=>{
    setIsLoading(true)
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/profile`, {withCredentials: true});
    if(response.status === 200){
      setUserData(response?.data?.user)

    }
  } catch (error) {
    console.error(error)
  }
  finally{
    setIsLoading(false)
  }
  }

  useEffect(() => {
    fetchUserProfileData();
  }, [])
  
  return (
    <>
      <div className='m-8 flex flex-col gap-8'>
          <SupplierProfileComponent userData={userData} isLoading={isLoading}/>
      </div>
    </>
  )
}

export default SupplierProfile
