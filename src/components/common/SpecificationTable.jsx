import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media Start
import { MdEdit, MdDelete } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Media End

const SpecificationTable = () => {
  const [specificationData, setSpecificationData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModel, setShowEditModel] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedId, setUpdatedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const isMounted = useRef(true);
  const isMount = useRef(true);

  
  // Handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let filteredData = specificationData.filter((item=>
    `${item._id} ${item.category.category} ${item.name}`.toLowerCase().includes(searchTerm.toLowerCase())
))

const handleCategoryFilter = (e)=>{
  setSpecificationData( specificationData.filter(item=>item.category?._id === e.target.value));
 
}

const length = filteredData.length;


  // Get Category Data or Specification Data
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}category`
      );

      if (response.status === 200 && isMount.current)
        return setCategoryData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };



  const getSpecification = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }specification/paginate?page=${currentPage}`
      );
      if (response.status === 200 && isMounted.current) {
        setTotalPages(response.data.totalPages);
        setSpecificationData(response.data.response);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  
    getSpecification();
    getCategory();
    
  }, [currentPage]);

  // Handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}specification`,
        formData
      );

      if (response.status === 201) {
        getSpecification();
        setFormData({
          name: "",
          category: "",
        });
        setShowModal(false);
        toast.success("Specification created successfully", {
          position: "top-right",
          autoClose: 3200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" },
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle Delete

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}specification/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Specification deleted successfully", {
          position: "top-right",
          autoClose: 3200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" },
        });
        setSpecificationData(
          specificationData.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Specification not deleted", {
        position: "top-right",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Handle Edit

  const handleEdit = async (item) => {
    try {
      setUpdatedId(item._id);
      setFormData({
        name: item.name,
        category: item.category._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Close

  const handleClose = () => {
    setUpdatedId(null);
    setFormData({
      name: "",
      category: "",
    });
  };

  // Handle Update

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}specification/${updatedId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        getSpecification();
        setUpdatedId(null);
        setFormData({
          name: "",
          category: "",
        });
        toast.success("Specification updated successfully", {
          position: "top-right",
          autoClose: 3200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" },
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Specification not updated", {
        position: "top-right",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Handle Page Change

  const handlePageChange = (no) => {
    if (no >= 1 && no <= totalPages) {
      return setCurrentPage(no);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Updated Model */}

      {updatedId && (
        <div
          className="fixed z-42 top-0 left-0 w-full h-full bg-[#00000024] backdrop-blur-xs"
          onClick={handleClose}
        ></div>
      )}

      {updatedId && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl w-[890px]">
          <h2 className="font-bold text-2xl pb-4 text-black ">
            Add Specification
          </h2>
          <span
            className="fixed top-4 right-4 cursor-pointer"
            onClick={handleClose}
          >
            <FaXmark className="text-2xl" />{" "}
          </span>

          <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="category">
                  {" "}
                  Choose Category{" "}
                </label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  id="category"
                >
                  <option value="" hidden>
                    Choose Category
                  </option>
                  {categoryData.map((item) => (
                    <option value={item._id}>{item.category}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="name">
                  {" "}
                  Add Specification{" "}
                </label>
                <input
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Add Specification"
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

      {/* Add Model */}

      {showModal && (
        <div
          className="fixed z-42 top-0 left-0 w-full h-full bg-[#00000024] backdrop-blur-xs"
          onClick={() => setShowModal(false)}
        ></div>
      )}

      {showModal && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl w-[890px]">
          <h2 className="font-bold text-2xl pb-4 text-black ">
            Add Specification
          </h2>
          <span
            className="fixed top-4 right-4 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <FaXmark className="text-2xl" />{" "}
          </span>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5">
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="category">
                  {" "}
                  Choose Category{" "}
                </label>
                <select
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  id="category"
                >
                  <option value="" hidden>
                    Choose Category
                  </option>
                  {categoryData.map((item) => (
                    <option value={item._id}>{item.category}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-3">
                <label className="text-lg" htmlFor="name">
                  {" "}
                  Add Specification{" "}
                </label>
                <input
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Add Specification"
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

      <div className="bg-white border-2 border-emerald-600 rounded-4xl p-8 m-5">
        <div className="mb-5 flex justify-between items-center">
          <div className="flex items-center gap-4">

         
          <input
            type="text"
            placeholder="Search..."
            className="w-60 p-2 border-1 border-[#f2f2f2] rounded-lg outline-none bg-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select name="selectCategory" id="selectCategory" className="w-full border-1 border-zinc-200 outline-none py-2 px-3 rounded-lg" onChange={handleCategoryFilter}>
            <option value="" hidden >Filter with Category</option>
            {categoryData?.map(item=>(
              <option value={item._id}>{item.category}</option>
            ))}
          </select>

          </div>
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
                Specifications
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
                    {item.category?.category}
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

export default SpecificationTable;
