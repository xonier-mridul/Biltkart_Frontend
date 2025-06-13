import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media Start
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Media End

const ProductListsForSupplierTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogData, setCatalogData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Handle Product Filter
  const handleProductFilter = (id) => {
    setSelectedSubCategory(id);
  };

  useEffect(() => {
    let data = [...catalogData];

    
    if (selectedSubCategory !== "all") {
      data = data.filter(
        (item) => item?.subCategory?._id === selectedSubCategory
      );
    }

   
    if (searchTerm.trim() !== "") {
      data = data.filter((item) =>
        `${item?.seller?.company} ${item?.category?.category} ${item?.subCategory?.name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [searchTerm, selectedSubCategory, catalogData]);

  
  const getCatalog = async (currentPage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}catalog/user/paginate?page=${currentPage}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCatalogData(response?.data?.response);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSubCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}sub-category`
      );
      if (response.status === 200) {
        setSubCategoryData(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCatalog(currentPage);
    getSubCategory();
  }, [currentPage]);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you want to delete your product?");
    if (!confirm) return;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}catalog/${id}`
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        setCatalogData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Product not deleted successfully");
    }
  };

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl m-5 border-2 border-emerald-500">
        <div className="mb-5 flex justify-between items-center px-8 py-6 border-b-1 border-gray-300">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-60 p-3 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              name="product"
              id="product"
              className="border-1 border-[#B5B5C3] outline-none rounded-lg px-3 py-2.5 text-lg text-gray-600"
              onChange={(e) => handleProductFilter(e.target.value)}
              value={selectedSubCategory}
            >
              <option value="all">View All</option>
              {subCategoryData.map((item) => (
                <option key={item._id} value={item._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

          <Link
            to={"/supplier-admin/catalog"}
            className="bg-emerald-600 p-3 px-8 rounded-lg text-white text-lg"
          >
            Add Product
          </Link>
        </div>

        <div className="p-4 px-7">
          <table className="w-full border-[1px] border-zinc-200">
            <thead>
              <tr className="bg-slate-100 border-b-1 border-zinc-200">
                <th className="p-4 text-start">Manufacturer</th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Category
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Product
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  ISO Certification
                </th>
                <th className="p-4 text-start border-l-1 border-zinc-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b-[1px] border-l-1 border-zinc-200"
                  >
                    <td className="p-4 border-zinc-200 border-l-1">
                      <span className="capitalize">
                        {item.createdBy?.company}
                      </span>
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1">
                      {item.category?.category}
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1">
                      {item.subCategory?.name}
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1">
                      <span
                        className={`${
                          item.iso === "yes"
                            ? "text-lime-500 bg-emerald-50"
                            : "text-red-500 bg-red-50"
                        } capitalize py-2 px-4 rounded-lg font-semibold`}
                      >
                        {item.iso}
                      </span>
                    </td>
                    <td className="p-4 border-zinc-200 border-l-1">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="rounded-lg bg-teal-600 px-2 py-2 text-white cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/supplier-admin/product-list/product-view/${item._id}`
                            )
                          }
                        >
                          <FaEye className="text-xl" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-lime-500 px-2 py-2 text-white cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/supplier-admin/product-list/product-edit/${item._id}`
                            )
                          }
                        >
                          <MdEdit className="text-xl" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-red-500 px-2 py-2 text-white cursor-pointer"
                          onClick={() => handleDelete(item._id)}
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

         <div className="flex justify-end items-center p-6 pb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={`cursor-pointer p-2 ${
                        currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <FaChevronLeft />
                    </span>
        
                    {(() => {
                      const startPage = Math.max(1, currentPage - 1);
                      const endPage = Math.min(totalPages, startPage + 2);
                      const pagesToShow = [];
        
                      for (let i = startPage; i <= endPage; i++) {
                        pagesToShow.push(
                          <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`h-9 w-9 rounded-lg flex items-center justify-center cursor-pointer ${
                              currentPage === i ? "bg-emerald-600 text-white" : ""
                            }`}
                          >
                            {i}
                          </button>
                        );
                      }
        
                      return pagesToShow;
                    })()}
        
                    <span
                      className={`cursor-pointer p-2 ${
                        currentPage === totalPages
                          ? "opacity-30 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <FaChevronRight />
                    </span>
                  </div>
                </div>
      </div>
    </>
  );
};

export default ProductListsForSupplierTable;
