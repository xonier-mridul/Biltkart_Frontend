import React, {useState, useEffect} from 'react'
import ProfileUpdateComponent from '../../components/supplier/ProfileUpdateComponent'
import axios from 'axios'

const SupplierProfileUpdate = () => {
    const [userData, setUserData] = useState({})
   


    const fetchUserProfileData = async()=>{
      
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/profile`, {withCredentials: true});
          if(response.status === 200){
            setUserData(response?.data?.user)
      
          }
          
        } catch (error) {
          console.error(error)
        }
        
        }
      
        useEffect(() => {
          fetchUserProfileData();
        }, [])


  return (
    <>
      <div className='m-8 flex flex-col gap-8'>
         <ProfileUpdateComponent userData={userData} />
      </div>
    </>
  )
}

export default SupplierProfileUpdate
