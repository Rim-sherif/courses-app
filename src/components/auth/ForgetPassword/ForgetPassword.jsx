import React, { useState } from "react";
import signupImg from "/My password-pana.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoaderBtn from "../../LoaderBtn";



export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading ,setLoading] = useState(false);
  
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      forgetPassword(values);
    },
  });

  const forgetPassword = async (values) => {
    setLoading(true);
    try {      
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/sendCode`,
        values
      );
      const {email} = values;
      window.localStorage.setItem("userEmail" , email);
      if(data.success){
        toast.success(data.message , { autoClose: 500 });
        navigate("/resetPassword")
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , {autoClose: 1000});
      }else{
        toast.error(error.message , {autoClose: 600});
      }
      
    }
  };


  return (
    <div className="md:h-[100vh] my-10 sm:my-0 lg:flex lg:items-center lg:justify-around w-[90%] mx-auto">
      <div className="lg:w-[40%] sm:w-[50%] sm:mx-auto">
        <img src={signupImg} className="w-full" alt="signup image" />
      </div>
      <div className="w-[100%] lg:w-[55%] sm:mx-auto sm:w-[70%]">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl mb-10 uppercase font-semibold text-center">
            Forget Password ?
          </h2>

          <div className="mb-5 relative">
            <label
              htmlFor=""
              className="absolute left-3 top-[-10px] px-2  bg-white text-sm"
            >
              Email
            </label>
            <input
              type="email"
              className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="py-3 bg-[#410445] cursor-pointer text-white font-semibold block w-full rounded-[5px] text-sm">
            {loading ? <LoaderBtn /> : "Request a reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}
