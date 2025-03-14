import React from "react";
import signupImg from "/Signup.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()]).{8,}$"),
        "Password must have at least one Number, one special Character , one uppercase letter and count of characters 8 or more"
      )
      .required("Password is required"),
      confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "confirm Password is not match password")
          .required("repassword is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  const resetPassword = async (values) => {
    
    try {      
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/reset/password/${token}`,
        values
      );
      console.log(data);
      
      toast.success(data.message);
      navigate("/login")
    } catch (error) {
      console.log(error);
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message);
      }else{
        toast.error(error.message);
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
          <h2 className="text-3xl mb-10 uppercase font-semibold text-center">
            Reset Password
          </h2>

          <div className="mb-5 relative">
            <label
              htmlFor=""
              className="absolute left-3 top-[-10px] px-2 font-semibold bg-white text-sm"
            >
              Password
            </label>
            <input
              type="password"
              className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor=""
              className="absolute left-3 top-[-10px] px-2 font-semibold bg-white text-sm"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                {formik.errors.confirmPassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <button className="py-3 bg-black cursor-pointer text-white font-semibold block w-full rounded-[5px] text-sm">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
