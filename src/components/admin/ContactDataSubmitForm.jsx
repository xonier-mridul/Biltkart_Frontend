import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactDataSubmitForm = ({getContactData}) => {
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    location: "",
  });

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}admin-contact`,
        formData
      );
  
      if (response.status === 201) {
        getContactData()
        toast.success("Contact data submitted successfully", {
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
  
        setFormData({
          email: "",
          number: "",
          location: "",
        });
      }
    } catch (error) {
      console.error(error.message);
      
      toast.error("Contact data not submitted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  

  // Handle Submit End

  // Handle Change Start

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Submit End

  return (
    <>
      <ToastContainer />
      <div className="bg-white w-full border-2 border-emerald-500 rounded-4xl">
        <h3 className="text-[20px] font-semibold p-9 py-6 border-b-1 border-zinc-200">
          Fill the form
        </h3>
        <form className="p-9 py-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-3">
            <label className="text-lg" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
              type="email"
              name="email"
              placeholder="Enter email here"
              value={formData.email}
              onChange={handleChange}
            />
           </div>
           <div className="flex w-full flex-col gap-3">
              <label htmlFor="number">Contact No</label>
              <input  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg" type="number" name="number" placeholder="Enter your number" value={formData.number} onChange={handleChange} />
           </div>
           <div className="flex w-full flex-col gap-3">
             <label htmlFor="location">Location</label>
             <input  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg" type="text" name="location" placeholder="Enter your location" value={formData.location} onChange={handleChange}/>
           </div>


          <div className="flex items-center justify-end ">
          <button
          disabled={!formData.email || !formData.location || !formData.number}
            type="submit"
            className="rounded-lg bg-emerald-500 disabled:bg-emerald-300 px-6 py-3 text-white w-fit cursor-pointer">
            Save
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactDataSubmitForm;
