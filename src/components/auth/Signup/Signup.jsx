import React, { useState } from "react";
import signupImg from "/Innovation-pana.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoaderBtn from "../../LoaderBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordValidation from "../../../pages/Dashboard/PasswordValidation/PasswordValidation";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "FirstName must be greater than 3 characters")
      .max(25, "FirstName must be less than or equal 25 characters")
      .required("FirstName is required"),
    lastName: Yup.string()
      .min(3, "LastName must be greater than 3 characters")
      .max(25, "LastName must be less than or equal 25 characters")
      .required("LastName is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      signupSendData(values);
    },
  });

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    setShowPasswordValidation(e.target.value.length > 0);
  };

  const allValidationsPass = () => {
    const password = formik.values.password;
    return (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[A-Z]/.test(password)
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const signupSendData = async (values) => {
    if (!allValidationsPass()) {
      toast.error("Please meet all password requirements");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
        values
      );
      
      toast.success(data.message, { autoClose: 500 });
      if(data?.user.role == "user"){
        navigate("/login");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if(error?.response.data.message){
        toast.error(error?.response?.data?.message, { autoClose: 600 });
      } else {
        toast.error(error.message, { autoClose: 600 });
      }
    } finally {
      setLoading(false);
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
            Signup
          </h2>

          <div className="flex justify-between flex-wrap mb-5">
            <div className="w-full mb-5 sm:mb-0 sm:w-[49%] relative">
              <label className="absolute left-3 top-[-10px] px-2 bg-white text-sm">
                FirstName
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full"
                name="firstName"
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div className="w-full sm:w-[49%] relative">
              <label className="absolute left-3 top-[-10px] px-2 bg-white text-sm">
                LastName
              </label>
              <input
                type="text"
                className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="mb-5 relative">
            <label className="absolute left-3 top-[-10px] px-2 bg-white text-sm z-10">
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
            {formik.errors.email && formik.touched.email && (
              <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-3 relative">
            <label className="absolute left-3 top-[-10px] px-2 bg-white text-sm z-10">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full pr-10"
                name="password"
                onChange={handlePasswordChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {showPasswordValidation && (
              <PasswordValidation 
                password={formik.values.password} 
                isVisible={showPasswordValidation} 
              />
            )}
          </div>

          <div className="mb-5 relative">
            <label className="absolute left-3 top-[-10px] px-2 bg-white text-sm z-10">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full pr-10"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="mb-5 relative">
            <label className="absolute left-3 top-[-10px] px-2 bg-white text-sm">
              Role
            </label>
            <select
              className="border-2 text-sm outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="user" className="p-2">Student</option>
              <option value="instructor" className="p-2">Instructor</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={!allValidationsPass() || loading}
            className={`py-3 text-white font-semibold block w-full rounded-[5px] text-sm ${
              allValidationsPass() ? "bg-[#410445] hover:bg-[#563458]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? <LoaderBtn /> : "Create Account"}
          </button>
          
          <section className="mt-3 text-gray-500 text-sm font-semibold">
            Already have an account? <Link className="text-[#410445] font-semibold" to={"/login"}>Login</Link>
          </section>
        </form>
      </div>
    </div>
  );
}