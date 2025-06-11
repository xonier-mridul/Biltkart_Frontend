import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media Start
import { MdEdit, MdDelete } from "react-icons/md";
import { FaArrowRight, FaXmark } from "react-icons/fa6";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Media End

const CategoryTable = ({
  categoryData,
  setCategoryData,
  totalPages,
  setTotalPages,
  currentPage,
  setCurrentPage
}) => {
  const [Form, setForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
  });
  const [updatedId, setupdatedId] = useState("");

  // Handle Change

  // Delete Category
  const handleDelete = async (e) => {
    try {
      const checking = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (checking) {
        const response =  await axios.delete(`${import.meta.env.VITE_SERVER_URL}category/${e}`);

        if(response.status === 200){
        setCategoryData(categoryData.filter((item) => item._id !== e));

        toast.success("Category Deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#009689", color: "#fff" },
        });}

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle Patch

  const handlePatch = async (e) => {
    e.preventDefault();
    try {
      if (!updatedId) {
        console.error("Category ID not found");

        return;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}category/${updatedId}`,
        formData
      );

      if (response.status === 200) {
        setCategoryData((prevData) =>
          prevData.map((item) =>
            item._id === updatedId
              ? { ...item, category: formData.category }
              : item
          )
        );

        setForm(false);
        setupdatedId("");

        toast.success("Category updated successfully", {
          position: "top-right",
          autoClose: 3000,
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
      console.error("Error updating category:", error);
    }
  };

  // Handle FormShow

  const handleFormShow = (data) => {
    setForm(!Form);
    setFormData({
      category: data.category,
    });
    setupdatedId(data._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Page Change

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const length = categoryData.length;

  return (
    <>
      <ToastContainer limit={1}/>
      {Form && (
        <div
          className="backdrop-blur-xs fixed top-0 left-0 z-42 w-full h-full bg-[#00000024] "
          onClick={() => setForm(!Form)}
        ></div>
      )}
      {Form && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 shadow-2xl -translate-y-1/2 z-50 bg-white p-8 rounded-2xl w-[650px]">
          <h2 className="font-bold text-2xl pb-2 text-black ">
            Update Category
          </h2>
          <span
            className="fixed top-4 right-4 cursor-pointer"
            onClick={() => setForm(!Form)}
          >
            <FaXmark className="text-2xl" />{" "}
          </span>
          <form className="flex flex-col gap-5" onSubmit={handlePatch}>
            <div className="flex flex-col gap-3">
              <label className="text-lg" htmlFor="category">
                Add Category
              </label>
              <input
                className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your category"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="capitalize font-bold flex items-center gap-3 rounded-lg bg-teal-600 px-6 py-3 text-white w-fit disabled:bg-green-400"
                type="submit"
              >
                {" "}
                Update
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white p-8 rounded-4xl border-2 border-emerald-500">
        <table className="w-full border-1 border-zinc-200">
          <thead>
            <tr className="border-b-1 border-zinc-200 bg-slate-100">
              <th className="text-start p-4 px-6 w-2/3">Category</th>
              <th className="text-start p-4 px-6 border-l-1 w-1/3 border-zinc-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {length > 0 ? (
              categoryData?.map((e) => (
                <tr className="border-b-1 border-zinc-200" key={e._id}>
                  <td className="p-4 px-6">
                    {" "}
                    <span className="text-lg">{e.category} </span>
                  </td>
                  <td className="p-4 px-6 border-l-1 border-zinc-200">
                    <div className="flex items-center gap-4">
                      <span
                        style={{ borderRadius: "6px" }}
                        className="rounded-lg bg-teal-600 px-2 py-2 text-white p-2 cursor-pointer"
                        onClick={() => handleFormShow(e)}
                      >
                        <MdEdit className="text-xl " />
                      </span>
                      <span
                        style={{ borderRadius: "6px" }}
                        className="rounded-lg bg-red-500 px-2 py-2 text-white p-2 cursor-pointer"
                        onClick={() => handleDelete(e._id)}
                      >
                        <MdDelete className="text-xl " />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b-1 border-zinc-200">
                <td className="p-4 px-6 text-center" colSpan={2}>
                  No data
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

export default CategoryTable;
