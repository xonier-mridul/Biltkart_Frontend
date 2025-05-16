import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuotationEditForm = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState([]);
  const [formData, setFormData] = useState({
    additionalComment: "",
    spreadQuantityData: [],
    price: [
      {
        pricePerUnit: "",
        totalUnit: "",
        product: "",
        gst: "",
        total: "",
        finalPrice: "",
      },
    ],
  });

  const [assignedBRFQ, setAssignedBRFQ] = useState(null);
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityDataChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...formData.spreadQuantityData];
    updatedData[index][name] = value;
    setFormData((prev) => ({ ...prev, spreadQuantityData: updatedData }));
  };

  const getAssignedBRFQ = async (id) => {
    try {
      if (!id) return;
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}vrfq/getbyid/${id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        const vrfq = res.data?.vrfq;
        setAssignedBRFQ(vrfq);
        setFormData((prev) => ({
          ...prev,
          spreadQuantityData:
            vrfq?.spreadQuantityData.map((item) => ({
              quantity: item.quantity || "",
              fromDate: item.fromDate || "",
              toDate: item.toDate || "",
              location: item.location || "",
            })) || [],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculatePrice = () => {
    if (!assignedBRFQ || !productData.length) return;

    const categoryId = assignedBRFQ?.brfqId?.rfqId?.category?._id;
    const filteredProduct = productData.find(
      (item) => item?.category?._id === categoryId
    );

    const totalUnit = assignedBRFQ?.TotalPrice[0]?.totalUnit || 0;
    const pricePerUnit = Number(filteredProduct?.finalPrice || 0);
    const total = pricePerUnit * totalUnit;
    const gst = total * 0.18;
    const finalPrice = total + gst;

    setFormData((prev) => ({
      ...prev,
      price: [
        {
          pricePerUnit,
          totalUnit,
          product: filteredProduct?._id || "",
          total,
          gst,
          finalPrice,
        },
      ],
    }));
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}catalog/user/paginate`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProductData(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}auth/verify-auth`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserData(response.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssignedBRFQ(id);
    getUser();
    getProducts();
  }, [id]);

  useEffect(() => {
    if (assignedBRFQ && productData.length > 0) {
      calculatePrice();
    }
  }, [assignedBRFQ, productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalAllowed = Number(assignedBRFQ?.brfqId?.rfqId?.quantity || 0);
      const totalEntered = formData.spreadQuantityData.reduce(
        (sum, item) => sum + Number(item.quantity || 0), 0
      );

      if (totalEntered !== totalAllowed) {
        setError(
          `Total quantity entered (${totalEntered}) exceeds the allowed quantity (${totalAllowed}).`
        );
        return;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}vrfq/update/${id}`,
        {
          ...formData,
          brfqId: assignedBRFQ?.brfqId?._id,
          createdBy: userData?._id,
          process: "updated by vendor"
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Quotation updated successfully!");
        setError("");
      }
    } catch (error) {
      console.error("Failed to submit quotation", error);
      setError(error?.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full items-center gap-5">
        <div className="w-1/2 bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2 px-4 py-3">
          <h2 className="text-md font-semibold uppercase">
            BRFQ Id:{" "}
            <span className="text-emerald-500">
              {" "}
              {assignedBRFQ?.brfqId?._id}
            </span>
          </h2>
        </div>
        <div className="w-1/2 bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2 px-4 py-3">
          <h2 className="text-md font-semibold">
            Buyer Id:{" "}
            <span className="text-emerald-500">
              {assignedBRFQ?.brfqId?.rfqId?.createdBy._id}
            </span>
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-4xl flex flex-col gap-6 border-emerald-500 border-2">
        <div className="px-8 py-6 border-b-1 border-[#eff2f5] flex justify-between items-center">
          <h2 className="font-semibold text-xl">Edit your quotation</h2>
          <button
            className="text-white bg-emerald-600 px-6 py-2.5 rounded-lg"
            onClick={() => navigate(-1)}
          >
            {" "}
            Back{" "}
          </button>
        </div>

        <div className="w-full flex flex-col gap-4 px-8 pb-8">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Delivery Schedule</h2>
            <h2 className="font-semibold text-xl">
              Total Quantity ({assignedBRFQ?.brfqId?.rfqId?.measurement || ""}):{" "}
              <span className="tracking-wide text-emerald-500">
                {assignedBRFQ?.brfqId?.rfqId?.quantity}
              </span>
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 items-center border-green-300 border bg-green-50 p-6 rounded-xl"
          >
            <div className="w-full grid grid-cols-4 gap-6">
              {formData.spreadQuantityData.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="quantity">
                      Quantity ({assignedBRFQ?.brfqId?.rfqId?.measurement || ""}
                      )
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none"
                      value={item.quantity}
                      onChange={(e) => handleQuantityDataChange(index, e)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="fromDate">From Date</label>
                    <input
                      type="date"
                      name="fromDate"
                      className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none"
                      value={item.fromDate
                        ? new Date(item.fromDate).toISOString().split("T")[0]
                        : ""}
                      
                      onChange={(e) => handleQuantityDataChange(index, e)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="toDate">To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none"
                      value={item.toDate
                        ? new Date(item.toDate).toISOString().split("T")[0]
                        : ""}
                      onChange={(e) => handleQuantityDataChange(index, e)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none"
                      value={item.location}
                      onChange={(e) => handleQuantityDataChange(index, e)}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="w-full flex flex-col gap-3 col-span-4">
              <label htmlFor="additionalComment">Additional Comment</label>
              <textarea
                name="additionalComment"
                className="w-full border bg-white border-zinc-200 p-3 rounded-lg outline-none"
                id="additionalComment"
                rows="6"
                placeholder="Write your comment"
                value={formData.additionalComment}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="w-full flex items-center justify-end">
              <div className="flex flex-col items-end gap-3">
                {error && <p className="text-red-600 font-medium">{error}</p>}
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg w-fit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
          {/* PRICE TABLE */}

          <div className="w-full">
            <table className="w-full border-1 border-stone-200">
              <thead>
                <tr className="bg-slate-100 border-b-1 border-stone-200">
                  <th className="p-4 text-start">
                    Price per unit ({assignedBRFQ?.brfqId?.rfqId?.measurement})
                  </th>
                  <th className="p-4 border-l-1 border-stone-200 text-start">
                    Total units
                  </th>
                  <th className="p-4 border-l-1 border-stone-200 text-start">
                    Price for total units
                  </th>
                  <th className="p-4 border-l-1 border-stone-200 text-start">
                    GST (<span className="text-red-400">18%</span>)
                  </th>
                  <th className="p-4 border-l-1 border-stone-200 text-start">
                    Total (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData?.price?.length > 0 ? (
                  formData?.price?.map((item, index) => (
                    <tr key={index} className=" border-b-1 border-stone-200">
                      <td className="p-4">
                        {" "}
                        <span className="font-medium">
                          ₹
                          {item?.pricePerUnit.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "N/A"}{" "}
                        </span>
                      </td>
                      <td className="p-4 border-l-1 border-stone-200">
                        {" "}
                        {item?.totalUnit || "N/A"}{" "}
                      </td>
                      <td className="p-4 border-l-1 border-stone-200">
                        {" "}
                        <span className="font-medium">
                          ₹
                          {item?.total.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "N/A"}
                        </span>{" "}
                      </td>
                      <td className="p-4 border-l-1 border-stone-200">
                        {" "}
                        <span className="bg-green-50 px-5 py-2 rounded-lg text-sm text-green-500 font-medium">
                          ₹
                          {item?.gst.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "N/A"}{" "}
                        </span>{" "}
                      </td>
                      <td className="p-4 border-l-1 border-stone-200">
                        {" "}
                        <span className="font-semibold">
                          ₹
                          {item?.finalPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "N/A"}
                        </span>{" "}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-center" colSpan={5}>
                      {" "}
                      Data not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationEditForm;
