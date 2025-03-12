import React from "react";
import signupImg from "/Signup.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function Signup() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
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
      .matches(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()]).{8,}$") , "Password must have at least one Number, one special Character , one uppercase letter and count of characters 8 or more")
      .required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "confirm Password is not match password")
      .required("repassword is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
              <label
                htmlFor=""
                className="absolute left-3 top-[-10px] px-2 font-semibold bg-white text-sm"
              >
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
              {formik.errors.firstName && formik.touched.firstName ? (
                <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                  {formik.errors.firstName}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full sm:w-[49%] relative">
              <label
                htmlFor=""
                className="absolute left-3 top-[-10px] px-2 font-semibold bg-white text-sm"
              >
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
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                  {formik.errors.lastName}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mb-5 relative">
            <label
              htmlFor=""
              className="absolute left-3 top-[-10px] px-2 font-semibold bg-white text-sm"
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
              Repassword
            </label>
            <input
              type="password"
              className="border-2 outline-0 focus:border-blue-500 border-gray-300 p-3 rounded w-full"
              name="repassword"
              onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repassword}
            />
            {formik.errors.repassword && formik.touched.repassword ? (
              <div className="bg-red-200 mt-1 rounded px-3 p-2 text-sm">
                {formik.errors.repassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <button className="py-3 bg-black cursor-pointer text-white font-semibold block w-full rounded-[5px] text-sm">
            Create Account
          </button>
          <section className="mt-3 text-gray-500 text-sm font-semibold">
            Already have an account? <Link className="text-[#7144F1] font-semibold" to={"/login"}>Login</Link>
          </section>
        </form>
      </div>
    </div>
  );
}
