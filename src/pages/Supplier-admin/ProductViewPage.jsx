import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProductViewTable from '../../components/admin/ProductViewTable';
import api from '../../components/common/api';

const ProductViewPage = () => {
 // States Start
      const [catalogData, setCatalogData] = useState([])
     

      // States End
  
     const {id} = useParams();
  
  
     // Get Catalog 
  
     const getCatalogById = async () => {
      if (!id) return; 
    
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}catalog/${id}`);
        if (response.status === 200) {
          setCatalogData(response.data);
        }
      } catch (error) {
        console.error("Error fetching catalog:", error.message);
      }
    };

   
  
    useEffect(() => {
      getCatalogById();
     
    }, [id]);
  

  return (
    <>
      <div className='p-5 flex flex-col gap-5'>
       
       
         <ProductViewTable catalogData={catalogData} />

      </div>
    </>
  )
}

export default ProductViewPage