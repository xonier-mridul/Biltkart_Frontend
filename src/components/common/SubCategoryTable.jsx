import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media Start
import { MdEdit, MdDelete } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Media End

const SubCategoryTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    categoryId: "",
  });
  const [updatedFormId, setUpdatedFormId] = useState(null)

  
  const filteredData = subCategoryData.filter((item=>
    `${item._id} ${item.categoryId?.category}  ${item.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  
  const length = filteredData.length;

  // Handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Get Category

  useEffect(() => {
    let isMounted = true;

    const fetching = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}category`, {withCredentials: true}
        );
        if (isMounted) {
         return setCategoryData(response?.data);
          
        }
      } catch (error) {
        console.error(error?.message);
      }
    };
    fetching();
    return () => {
      isMounted = false;
    };
  }, []);

  // Get Sub Category

  useEffect(() => {
    let isMounted = true;
    const fetching = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}sub-category/paginate?page=${currentPage}`, {withCredentials: true}
        );
        if (isMounted){
         setSubCategoryData(response?.data?.subCategory);
        setTotalPages(response?.data?.totalPages);
         
        }
          
      } catch (error) {
        console.error(error.message);
      }
    };
    fetching();
    return () => {
      isMounted = false;
    };
  }, [currentPage, subCategoryData]);

  // Add Sub Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}sub-category`,
        formData,
        {withCredentials: true}
      );
  
      if (response.status === 201 || response.status === 204) {
        
        setShowModal(false);
        toast.success( `"${formData.name}" Sub Category added successfully!`, {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" },
        });
        setFormData({
          name: "",
          categoryId: "",
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(` ${error.response?.data?.message || "Failed to add sub-category!"}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: "#D32F2F", color: "#fff" }, // Red background for errors
      });
    }
  };
  

  // Handle Delete

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this category?"
      );

      if (confirmDelete) {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}sub-category/${id}`,{withCredentials: true}
        );

        if (response.status === 200 || response.status === 204) {
          setSubCategoryData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );
          toast.success("Sub Category deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { backgroundColor: "#009689", color: "#fff" }
          });
        } else {
          alert("Failed to delete the category. Please try again.");
        }
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert(
        `Error deleting category: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // handle Edit

  const handleEdit = (item) => {
    
    setEditFormData({
      name: item.name,
      categoryId: item.categoryId._id
    });
    setUpdatedFormId(item._id)
  };

  // Handle Update

  const handleUpdate = async(e,id) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}sub-category/${id}`, editFormData);

      if (response.status === 200 || response.status === 204) {
        setEditFormData({
          name:"",
          categoryId:""
        })
        setUpdatedFormId(null)
        toast.success("Sub Category updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" }
        });
        
      }
      }
       catch (error) {
        console.error(error.message)
      }
    }

    // Handle Edit Close

    const handleEditClose = ()=>{
     
      setUpdatedFormId(null)
    }

    // Handle Page Change

    const handlePageChange = (no) =>{
      if(no>=1 && no<= totalPages){
 return setCurrentPage(no)
      }
    }

  return (
    <>
      {updatedFormId  && (
        <div
          className="fixed z-42 top-0 left-0 w-full h-full bg-[#00000024] backdrop-blur-xs"
          onClick={() => setUpdatedFormId(null)}
        ></div>
      )}

      {updatedFormId  && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl w-[890px]">
          <h2 className="font-bold text-2xl pb-2 text-black ">
            Edit Sub Category
          </h2>
          <span
            className="fixed top-4 right-4 cursor-pointer"
            onClick={handleEditClose} 
          >
            
            <FaXmark className="text-2xl" />{" "}
          </span>
          <form className="flex flex-col gap-5" onSubmit={(e)=>handleUpdate(e,updatedFormId)}>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label htmlFor=""> Category</label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="categoryId"
                  id="categoryId"
                  value={editFormData.categoryId}
                  onChange={handleChangeEdit}
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  {categoryData.map((e) => (
                    <option value={e._id}>{e.category}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="name">
                 Sub  Category
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  value={editFormData.name}
                  onChange={handleChangeEdit}
                />
              </div>
             
            </div>
            <div className="flex justify-end">
                <button
                  className="capitalize font-bold flex items-center gap-3 rounded-lg bg-teal-600 px-7 py-3 text-white w-fit cursor-pointer"
                  type="submit"
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
          </form>
        </div>
      )}

      {showModal && (
        <div
          className="fixed z-42 top-0 left-0 w-full h-full bg-[#00000024] backdrop-blur-md"
          onClick={() => setShowModal(false)}
        ></div>
      )}
      {showModal && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl w-[890px]">
          <h2 className="font-bold text-2xl pb-2 text-black ">
            Add Sub Category
          </h2>
          <span
            className="fixed top-4 right-4 cursor-pointer"
            onClick={() => setShowModal(!showModal)}
          >
            <FaXmark className="text-2xl" />{" "}
          </span>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="categoryId">
                  Category
                </label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  {categoryData.map((e) => (
                    <option value={e._id}>{e.category}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="name">
                 Sub Category
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Sub Category"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="capitalize font-bold flex items-center gap-3 rounded-lg bg-teal-600 px-7 py-3 text-white w-fit cursor-pointer"
                type="submit"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
      <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 m-5">
        <div className="mb-5 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className=" rounded-lg bg-emerald-600 px-6 py-3 text-white  justify-center disabled:bg-green-400 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {" "}
            Add{" "}
          </button>
        </div>
        <table className="w-full border-[1px] border-zinc-200 ">
          <thead>
            <tr className="bg-slate-100 border-b-1 border-zinc-200">
              <th className="p-4 text-start">Category</th>
              <th className="p-4 text-start border-l-1 border-zinc-200">
                Sub Category
              </th>
              <th className="p-4 text-start border-l-1 border-zinc-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  className="border-b-[1px] border-l-1 border-zinc-200"
                  key={item._id}
                >
                  <td className="p-4 border-zinc-200 border-l-1">
                    {item.categoryId?.category}
                  </td>
                  <td className="p-4 border-zinc-200 border-l-1">
                    {item.name}
                  </td>
                  <td className="p-4 px-6 border-l-1 border-zinc-200">
                    <div className="flex items-center gap-4">
                      <span
                        style={{ borderRadius: "6px" }}
                        className="rounded-lg bg-teal-600 px-2 py-2 text-white p-2 cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        <MdEdit className="text-xl " />
                      </span>
                      <span
                        style={{ borderRadius: "6px" }}
                        className="rounded-lg bg-red-500 px-2 py-2 text-white p-2 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDelete className="text-xl " />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b-[1px] border-l-1 border-zinc-200">
                <td
                  colSpan={3}
                  className="p-4 text-center border-zinc-200 border-l-1"
                >
                  No Sub Category
                </td>
              </tr>
            )}
          </tbody>
        </table>
         <div className="flex justify-end items-center p-6 pb-0">
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

export default SubCategoryTable;
