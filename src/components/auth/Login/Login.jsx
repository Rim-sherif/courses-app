import React, {useState } from "react";
import signupImg from "/Innovation-pana.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getToken } from "../../../redux/reducers/tokenSlice";
import Loader from "../../Loader";
import LoaderBtn from "../../LoaderBtn";



export default function Login() {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);  


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()]).{8,}$"),
        "Password must have at least one Number, one special Character , one uppercase letter and count of characters 8 or more"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      loginSendData(values);
    },
  });

  const loginSendData = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
        values, { withCredentials: true }
      );
  
      if (data?.user?.isConfirmed) {
        toast.success(data.message, { autoClose: 500 });
        dispatch(getToken({ loggedIn: true, role: data.user.role }));
  
        window.localStorage.setItem("genToken", true);
  
        if (data.user.role === "user") navigate("/");
        if (data.user.role === "instructor") navigate("/dashboard");
        if (data.user.role === "admin") navigate("/admin");
        
      } else {
        toast.error(data.message, { autoClose: 700 });
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, { autoClose: 600 });
      } else {
        toast.error(error.message, { autoClose: 600 });
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
            Login
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
          <div className="mb-5 relative">
            <label
              htmlFor=""
              className="absolute left-3 top-[-10px] px-2  bg-white text-sm"
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

          <section className="mt-[-10px] mb-2 text-[12px] font-semibold">
            <Link
              className="text-[#7144F1] font-semibold"
              to={"/forgetpassword"}
            >
              Forget Password
            </Link>
          </section>

          <button className="py-3 bg-[#410445] cursor-pointer text-white font-semibold block w-full rounded-[5px] text-sm">
            {loading ? <div className="flex items-center py-2 gap-3 justify-center">
              <LoaderBtn/>
            </div> : "Login"}
          </button>
          <section className="mt-3 text-gray-500 text-sm font-semibold">
            Don't have an account?{" "}
            <Link className="text-[#410445] font-semibold" to={"/signup"}>
              Signup
            </Link>
          </section>
          
        </form>
      </div>
    </div>
  );
}
