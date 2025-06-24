import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Media Start

import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Media End

const ContactDataTable = ({ contactData, setContactData, getContactData }) => {
  const [isActive, setIsActive] = useState(false);
  // GET CONTACT DATA

  // Handle Delete

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}admin-contact/${id}`
      );
      if (response.status === 200) {
        setContactData(contactData.filter((item) => item._id !== id));
        toast.success("Contact data deleted successfully", {
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
      console.error(error.message);
      toast.error("Contact data deleted successfully");
    }
  };

  const handleActive =async(id)=>{
   try {
       const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}admin-contact/${id}`);
       if(response.status === 200){
        getContactData()
        toast.success("Active status updated successfully");
       }
   } catch (error) {
    console.error(error);
    toast.error("Contact data deleted successfully");
   }
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl  border-2 border-emerald-500">
        <table className="w-full border-[1px] border-zinc-200 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-slate-100 border-b-1 border-zinc-200">
              <th className="p-4 text-start">Email</th>
              <th className="p-4 text-start border-l-1 border-zinc-200">
                Contact Number
              </th>
              <th className="p-4 text-start border-l-1 border-zinc-200">
                Location
              </th>
              <th className="p-4 text-start border-l-1 border-zinc-200">
                Is Active
              </th>
              <th className="p-4 text-start border-l-1 border-zinc-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((item) => (
              <tr
                key={item._id}
                className="border-b-[1px] border-l-1 border-zinc-200"
              >
                <td className="p-4 border-zinc-200 border-l-1">{item.email}</td>
                <td className="p-4 border-zinc-200 border-l-1">
                  {item.number}
                </td>
                <td className="p-4 border-zinc-200 border-l-1">
                  {item.location}
                </td>
                <td className="p-4 border-zinc-200 border-l-1">
                  <span
                    className={`${
                      item.isActive.toString() === "true"
                        ? "bg-emerald-50 text-lime-500"
                        : "bg-red-50 text-red-500"
                    } py-2 px-4 font-semibold rounded-lg capitalize`}
                  >
                    {item.isActive.toString()}
                  </span>
                </td>
                <td className="p-4 border-zinc-200 border-l-1">
                  <div className="flex items-center gap-4">
                    <button
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                        item.isActive === true ? "bg-green-500" : "bg-gray-300"
                      }`}
                      onClick={() => handleActive(item._id)}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${
                          item.isActive === true ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-lime-500 px-2 py-2 text-white cursor-pointer"
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactDataTable;
