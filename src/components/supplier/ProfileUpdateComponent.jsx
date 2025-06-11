import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileUpdateComponent = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    billingName: "",
    email: "",
    number: "",
    category: "",
  });

  const [branchDetail, setBranchDetail] = useState([
    {
      gstNumber: "",
      state: "",
      address: "",
    },
  ]);

  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        company: userData.company || "",
        billingName: userData.billingName || "",
        email: userData.email || "",
        number: userData.number || "",
        category: userData.category || "",
      }));

      if (userData.branchDetail && userData.branchDetail.length > 0) {
        setBranchDetail(userData.branchDetail);
      }
    }
  }, [userData]);

  useEffect(() => {
    const allFormFields = Object.values(formData);
    const filledFormFields = allFormFields.filter((v) => v && v.trim() !== "").length;
  
    let filledBranchFields = 0;
    let totalBranchFields = 0;
  
    branchDetail.forEach((branch) => {
      const branchValues = Object.values(branch);
      filledBranchFields += branchValues.filter((v) => v && v.trim() !== "").length;
      totalBranchFields += branchValues.length;
    });
  
    const totalFields = allFormFields.length + totalBranchFields;
    const filled = filledFormFields + filledBranchFields;
  
    setProgress(Math.round((filled / totalFields) * 100));
  }, [formData, branchDetail]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBranchChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBranches = [...branchDetail];
    updatedBranches[index][name] = value;
    setBranchDetail(updatedBranches);
  };

  const addBranchField = () => {
    setBranchDetail([
      ...branchDetail,
      { gstNumber: "", state: "", address: "" },
    ]);
  };

  const removeBranchField = (index) => {
    if (branchDetail.length === 1) return;
    const updated = branchDetail.filter((_, i) => i !== index);
    setBranchDetail(updated);
  };

  const handleSubmit = async (e) => {
     
     setIsLoading(true)
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}user/update`,
        {
          ...formData,
          branchDetail,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Profile not updated");
    }
    finally{
          setIsLoading(false)
        }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2">
        <div className="px-8 py-5 flex justify-between items-center border-b-1 border-stone-200">
          <h2 className="text-xl font-semibold">
            Welcome <span className="capitalize">{userData?.name}</span>
          </h2>
          <button
            type="button"
            className="bg-emerald-600 py-2.5 px-6 rounded-lg text-white flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        <div className="px-8 py-5 w-full flex flex-col gap-6">
          <div className="pb-4">
            <div className="mb-2 font-semibold text-gray-700">
              Profile Completion: {progress}%
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-xl overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: "Full Name", name: "name" },
                { label: "Company Name", name: "company" },
                { label: "Billing Name", name: "billingName" },
                { label: "Email", name: "email", type: "email" },
                { label: "Contact Number", name: "number", type: "number" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-3">
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <label htmlFor="category">Supplier Category</label>
                <select
                  name="category"
                  className="w-full border-1 border-zinc-200 outline-none p-3 rounded-lg"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Supplier Category
                  </option>
                  <option value="material supplier">Material Supplier</option>
                  <option value="service provider">Service Provider</option>
                  <option value="transporter">Transporter</option>
                  <option value="machine rentals">Machine Rentals</option>
                  <option value="waste management">Waste Management</option>
                  <option value="interior">Interior</option>
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              <h2 className="text-xl font-semibold mb-4">Branch Details</h2>
              {branchDetail.map((item, index) => (
                <div
                  key={index}
                  className="bg-sky-200 p-4 rounded-xl grid grid-cols-2 gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <label htmlFor={`gstNumber-${index}`}>GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={item.gstNumber}
                      onChange={(e) => handleBranchChange(index, e)}
                      className="w-full bg-white border-1 border-zinc-200 outline-none p-3 rounded-lg"
                      placeholder="GST Number"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor={`state-${index}`}>Select State</label>
                    <select
                      name="state"
                      value={item.state}
                      onChange={(e) => handleBranchChange(index, e)}
                      className="w-full bg-white border-1 border-zinc-200 outline-none p-3 rounded-lg"
                    >
                      <option value="" hidden>
                        Select State
                      </option>

                      {/* Indian States */}
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh"> Arunachal Pradesh </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>

                      {/* Union Territories */}
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                        Dadra and Nagar Haveli and Daman and Diu
                      </option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3 col-span-2">
                    <label htmlFor={`address-${index}`}>Full Address</label>
                    <input
                      type="text"
                      name="address"
                      value={item.address}
                      onChange={(e) => handleBranchChange(index, e)}
                      className="w-full bg-white border-1 border-zinc-200 outline-none p-3 rounded-lg"
                      placeholder="Enter your location"
                    />
                  </div>
                  <div className="flex justify-end items-center gap-3 col-span-2">
                    <button
                      type="button"
                      onClick={addBranchField}
                      className="bg-emerald-500 h-9 w-9 flex rounded-lg items-center justify-center text-white"
                    >
                      <FaPlus className="text-xl" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBranchField(index)}
                      className="bg-red-500 h-9 w-9 flex rounded-lg items-center justify-center text-white"
                    >
                      <FaMinus className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-emerald-700 transition-all duration-300"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateComponent;
