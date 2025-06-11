import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [oldPassShow, setOldPassShow] = useState(false);
  const [newPassShow, setNewPassShow] = useState(false);
  const [cNewPassShow, setCNewPassShow] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
  });

  // Router 

  const navigate = useNavigate()

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      if (passwords.newPassword !== passwords.cNewPassword)
        return setMessage(
          "Your new password is not matching please fill again"
        );
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}user/change-password`,
        passwords,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Your password change successfully");
        setPasswords({
          oldPassword: "",
          newPassword: "",
          cNewPassword: "",
        });
        
        setTimeout(async() => {
          const logout = await axios.post(`${import.meta.env.VITE_SERVER_URL}user/logout`, {}, {withCredentials: true});
          if(logout.status === 200){

            navigate('/login')
          }
        }, 1000);
        
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
      setMessage(error?.response?.data?.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2 ">
        <div className="px-8 py-4 border-b-stone-200 border-b-1">
          <h2 className="text-2xl font-semibold">Change your password here</h2>
        </div>
        <div className="px-8 py-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg" htmlFor="oldPassword">
                Old Password
              </label>
              {oldPassShow ? (
                <div className="flex flex-nowrap items-center gap-2 border-1 border-zinc-200 p-3 rounded-lg">
                  {" "}
                  <input
                    type="text"
                    name="oldPassword"
                    className="w-full  outline-none  "
                    value={passwords.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter your old password"
                  />{" "}
                  <span onClick={() => setOldPassShow(false)}>
                    <FaEyeSlash className="text-xl" />{" "}
                  </span>{" "}
                </div>
              ) : (
                <div className="flex flex-nowrap items-center gap-2 border-1 border-zinc-200 p-3 rounded-lg">
                  {" "}
                  <input
                    type="password"
                    name="oldPassword"
                    className="w-full  outline-none  "
                    value={passwords.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter your old password"
                  />{" "}
                  <span onClick={() => setOldPassShow(true)}>
                    <FaEye className="text-xl" />{" "}
                  </span>{" "}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-lg" htmlFor="newPassword">
                  New Password
                </label>
                {newPassShow ? (
                  <div className="flex flex-nowrap items-center gap-2 border-1 border-zinc-200 p-3 rounded-lg">
                    {" "}
                    <input
                      type="text"
                      name="newPassword"
                      className="w-full  outline-none  "
                      value={passwords.newPassword}
                      onChange={handleChange}
                      placeholder="Enter your old password"
                    />{" "}
                    <span onClick={() => setNewPassShow(false)}>
                      <FaEyeSlash className="text-xl" />{" "}
                    </span>{" "}
                  </div>
                ) : (
                  <div className="flex flex-nowrap items-center gap-2 border-1 border-zinc-200 p-3 rounded-lg">
                    {" "}
                    <input
                      type="password"
                      name="newPassword"
                      className="w-full  outline-none  "
                      value={passwords.newPassword}
                      onChange={handleChange}
                      placeholder="Enter your old password"
                    />{" "}
                    <span onClick={() => setNewPassShow(true)}>
                      <FaEye className="text-xl" />{" "}
                    </span>{" "}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-lg" htmlFor="newPassword">
                  Confirm New Password
                </label>
                {cNewPassShow ? (
                  <div className="flex flex-nowrap items-center gap-2 border-1 border-zinc-200 p-3 rounded-lg">
                    {" "}
                    <input
                      type="text"
                      name="cNewPassword"
                      className="w-full  outline-none  "
                      value={passwords.cNewPassword}
                      onChange={handleChange}
                      placeholder="Enter your old password"
                    />{" "}
                    <span onClick={() => setCNewPassShow(false)}>
                      <FaEyeSlash className="text-xl" />{" "}
                    </span>{" "}
                  </div>
                ) : (
                  <div className="flex flex-nowrap items-center gap-2 border-1 border-zinc-200 p-3 rounded-lg">
                    {" "}
                    <input
                      type="password"
                      name="cNewPassword"
                      className="w-full  outline-none  "
                      value={passwords.cNewPassword}
                      onChange={handleChange}
                      placeholder="Enter your old password"
                    />{" "}
                    <span onClick={() => setCNewPassShow(true)}>
                      <FaEye className="text-xl" />{" "}
                    </span>{" "}
                  </div>
                )}
              </div>
            </div>
            <div>
              {" "}
              <p className="text-red-500">{message} </p>
            </div>
            <div className="flex justify-end items-center">
              <button
                disabled={
                  !passwords.oldPassword ||
                  !passwords.newPassword ||
                  !passwords.cNewPassword
                }
                className="bg-emerald-600 py-2.5 px-8 rounded-lg text-white text-lg disabled:bg-emerald-400"
                type="submit"
              >
                {" "}
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
