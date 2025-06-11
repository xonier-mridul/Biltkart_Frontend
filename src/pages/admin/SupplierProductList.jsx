import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupplierProductListTable from '../../components/admin/SupplierProductListTable';
import api from '../../components/common/api';
import { toast } from 'react-toastify';

const SupplierProductList = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteCatalogId, setDeleteCatalogId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();

  const getUserCatalog = async (supplierId, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/catalog/catalog-by-supplier/${supplierId}`, {
      params: { page:currentPage },
      withCredentials: true,
    });

    if (response.status === 200) {
      setCatalogData(response.data.catalog);
      setTotalPages(response.data.totalPages);
    }
  } catch (error) {
    console.error(error);
    setErrMessage('Failed to fetch catalog data.');
  }
};


  useEffect(() => {
    if (id) getUserCatalog(id);
  }, [id, showDeletePopup, currentPage]);

  const handleDelete = async (productId) => {
    try {
      const response = await api.delete(`/catalog/${productId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('Product deleted successfully');
        setShowDeletePopup(false);
        setDeleteCatalogId(null);
      }
    } catch (error) {
      console.error(error);
      setErrMessage(error?.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <SupplierProductListTable
        totalPages={totalPages}
        catalogData={catalogData}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
        handleDelete={handleDelete}
        showDeletePopup={showDeletePopup}
        setShowDeletePopup={setShowDeletePopup}
        deleteCatalogId={deleteCatalogId}
        setDeleteCatalogId={setDeleteCatalogId}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SupplierProductList;
