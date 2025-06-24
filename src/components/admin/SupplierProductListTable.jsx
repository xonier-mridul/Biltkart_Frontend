import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa6';

const SupplierProductListTable = ({
  totalPages,
  catalogData,
  errMessage,
  showDeletePopup,
  handleDelete,
  setShowDeletePopup,
  deleteCatalogId,
  setDeleteCatalogId,
  currentPage,
  setCurrentPage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      
    }
  };

  const handleDeletePopup = (id) => {
    setShowDeletePopup(true);
    setDeleteCatalogId(id);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteCatalogId(null);
  };

  const filteredData = catalogData.filter((item) =>
    `${item._id} ${item.category?.category} ${item.subCategory?.name} ${item.seller?.name} ${item.seller?.company} ${item.iso}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      {showDeletePopup && (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50 bg-black/10"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 bg-white rounded-xl w-[550px] flex flex-col gap-4 shadow-xl">
            <h2 className="text-2xl font-semibold">Are you sure to delete this?</h2>
            <div className="flex items-center justify-end gap-3">
              <button
                className="text-green-500 bg-green-100 px-5 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                onClick={() => handleDelete(deleteCatalogId)}
              >
                Yes
              </button>
              <button
                className="text-red-500 bg-red-100 px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}

  

      <div className="bg-white shadow-lg rounded-2xl m-5 border-2 border-emerald-500">
        <div className="mb-5 flex justify-between items-center px-8 py-6 border-b border-gray-300">
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-3 border rounded-lg outline-none bg-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to="/admin/catalog"
            className="bg-emerald-600 px-8 py-2 rounded-lg text-white text-lg flex items-center gap-3 hover:bg-emerald-700 transition"
          >
            Add Product <FaCartPlus />
          </Link>
        </div>

        <div className="p-4 px-7 overflow-x-auto">
          <table className="w-full border border-zinc-200">
            <thead>
              <tr className="bg-slate-100 border-b border-zinc-200">
                <th className="p-4 text-left">Manufacturer</th>
                <th className="p-4 text-left border-l-1 border-zinc-200">Category</th>
                <th className="p-4 text-left border-l-1 border-zinc-200">Product</th>
                <th className="p-4 text-left border-l-1 border-zinc-200">ISO Certification</th>
                <th className="p-4 text-left border-l-1 border-zinc-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id} className="border-b border-zinc-200">
                    <td className="p-4 capitalize ">{item?.createdBy?.company || "N/A"}</td>
                    <td className="p-4 capitalize border-l-1 border-zinc-200">{item.category?.category || "N/A"}</td>
                    <td className="p-4 capitalize border-l-1 border-zinc-200">{item.subCategory?.name || "N/A"}</td>
                    <td className="p-4 border-l-1 border-zinc-200">
                      <span
                        className={`py-2 px-4 rounded-lg font-semibold capitalize ${
                          item.iso === 'yes'
                            ? 'text-lime-500 bg-emerald-50'
                            : 'text-red-500 bg-red-50'
                        }`}
                      >
                        {item.iso || "N/A"}
                      </span>
                    </td>
                    <td className="p-4 border-l-1 border-zinc-200">
                      <div className="flex gap-3">
                        <button
                          className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition"
                          onClick={() => navigate(`/admin/product-list/product-view/${item._id}`)}
                        >
                          <FaEye className="text-xl" />
                        </button>
                        <button
                          className="bg-lime-500 text-white p-2 rounded-lg hover:bg-lime-600 transition"
                          onClick={() => navigate(`/admin/product-list/product-edit/${item._id}`)}
                        >
                          <MdEdit className="text-xl" />
                        </button>
                        <button
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                          onClick={() => handleDeletePopup(item._id)}
                        >
                          <MdDelete className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end p-6">
          <div className="flex items-center gap-2">
            <FaChevronLeft
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                  currentPage === index + 1 ? 'bg-emerald-500 text-white' : 'bg-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <FaChevronRight
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierProductListTable;
