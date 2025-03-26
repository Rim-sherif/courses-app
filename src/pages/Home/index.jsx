import {
  faBook,
  faCertificate,
  faComment,
  faCommentDots,
  faGraduationCap,
  faPaperPlane,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import img from "/learning-concept-illustration.png";
import Featuredinstructors from "../../components/Featuredinstractors";
import instr6 from "../../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg";
import instr7 from "../../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg";
import instr8 from "../../assets/images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const fetchCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/v1/category/all`
  );
  if (!response.data.success) {
    throw new Error("Failed to fetch categories");
  }
  return response.data.courses;
};

const Home = () => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage = { text: message, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA278io0SVH4c6-Pk-k5en1nh41Q0JON6Q",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: message.trim() }],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        const botText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Could not understand the response";

        setMessages((prev) => [...prev, { text: botText, isUser: false }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I encountered an error. Please try again.",
            isUser: false,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2A0B2C] to-[#410445] text-white py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative hidden md:block">
              <div className="absolute -top-20 w-[600px] h-[600px] bg-gradient-to-r from-[#FF2DF1]/20 to-[#F6DC43]/20 rounded-full blur-2xl animate-pulse"></div>
              <img
                src={img}
                alt="Learning experience"
                className="relative z-10 w-full max-w-[500px] mx-auto animate-float animate-custom-bounce"
              />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#F6DC43]/10 rounded-full blur-xl"></div>
              <div className="absolute -right-12 bottom-40 bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#F6DC43] p-3 rounded-xl">
                    <svg
                      className="w-8 h-8 text-[#410445]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">
                      Daily Active Learners
                    </p>
                    <p className="text-2xl font-bold text-[#F6DC43]">15,000+</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 space-y-8 md:pl-12">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-[#F6DC43] to-[#FF2DF1] bg-clip-text text-transparent">
                Transform Your Future Through Learning
              </h1>
              <p className="text-xl text-blue-100 opacity-90 max-w-xl leading-relaxed">
                Dive into immersive learning experiences with 10,000+ expert-led
                courses. Gain practical skills, earn certifications, and advance
                your career on your schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="relative group bg-gradient-to-r from-[#F6DC43] to-[#FF2DF1] text-[#410445] px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#FF2DF1]/30 transition-all duration-300 transform hover:-translate-y-1">
                  <Link to="/login">
                    <span className="relative z-10">Start Now</span>
                  </Link>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
                </button>
                <button className="relative group border-2 border-[#F6DC43]/50 text-[#F6DC43] px-8 py-4 rounded-xl font-semibold hover:bg-[#F6DC43]/10 hover:border-[#F6DC43] transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10">Explore Programs</span>
                  <div className="absolute inset-0 bg-[#F6DC43] opacity-0 group-hover:opacity-5 transition-opacity rounded-xl"></div>
                </button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-4">
                  <img
                    src={instr6}
                    alt="Student"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <img
                    src={instr7}
                    alt="Student"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <img
                    src={instr8}
                    alt="Student"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-[#F6DC43] flex items-center justify-center text-[#410445] font-bold">
                    5K+
                  </div>
                </div>
                <span className="text-blue-100 opacity-80">
                  Join our community of successful learners
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#a225e0] relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-white">
            Explore Popular Categories
            <span className="block mt-2 text-[#000000] text-lg font-medium">
              Master in-demand skills
            </span>
          </h2>

          {isLoading ? (
            <div className="text-center py-20">Loading categories...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              Failed to fetch categories
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:px-8 px-2">
              {categories.slice(0, 8).map((category) => (
                <Link
                  to={`/category/${category._id}`}
                  key={category._id}
                  className="relative rounded-lg p-6 h-40 flex items-center justify-center text-center transition-transform transform hover:scale-105 overflow-hidden"
                >
                  {/* Use an img tag for better error handling */}
                  <img
                    src={category.thumbnail}
                    alt={`${category.title} thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={(e) => {
                      // Fallback to a placeholder image if the thumbnail fails to load
                      e.target.src =
                        "https://via.placeholder.com/150?text=Image+Not+Found";
                    }}
                    loading="lazy" // Lazy load images for better performance
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10" />
                  {/* Category title */}
                  <h3 className="relative text-white text-lg font-semibold capitalize z-20">
                    {category.title }
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Instructors */}
      <Featuredinstructors />

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#410445]/5 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-[#410445]">
            About Us
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center mt-5 px-4 md:px-8">
            <div className="space-y-6 relative">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#A5158C]/10 rounded-full z-0"></div>
              <h3 className="text-3xl font-bold text-[#410445] relative z-10">
                Empowering Future Leaders Through Innovation
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                At the heart of our mission is a commitment to democratizing
                education. We connect 500,000+ learners worldwide with industry
                experts from top-tier organizations, fostering a dynamic
                ecosystem of knowledge exchange.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center space-x-2 text-[#410445]">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>200+ Expert Instructors</span>
                </li>
                <li className="flex items-center space-x-2 text-[#410445]">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>85% Career Advancement</span>
                </li>
              </ul>
              <button className="mt-6 px-8 py-3 bg-[#410445] text-white rounded-full hover:bg-[#A5158C] transition-all transform hover:scale-105">
                Meet Our Team
              </button>
            </div>
            <div className="space-y-8 relative">
              <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 bg-[#410445]/5 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-[#410445] rounded-lg">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#410445]">
                          Our Mission
                        </h4>
                        <p className="text-gray-600 mt-1">
                          Democratizing quality education through technology
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-[#A5158C]/5 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-[#A5158C] rounded-lg">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#A5158C]">
                          Our Vision
                        </h4>
                        <p className="text-gray-600 mt-1">
                          Global learning community without boundaries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-[#410445] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-white">
            Contact Us
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-6 ">
            <div className="space-y-8 text-white">
              <div>
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="text-gray-200 leading-relaxed">
                  Have questions or need support? Our team is here to help you
                  succeed. Reach out for course guidance, technical assistance,
                  or partnership opportunities.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">+1 (555) 123-4567</p>
                    <p className="text-gray-200 text-sm">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">support@eduguide.com</p>
                    <p className="text-gray-200 text-sm">24/7 Support Center</p>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/20">
                <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 md:p-3 bg-white/10 rounded-full hover:bg-[#1877F2] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#410445]"
                    aria-label="Visit our Facebook page"
                  >
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-95 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 md:p-3 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-[#405DE6] hover:via-[#C13584] hover:to-[#FFDC80] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#410445]"
                    aria-label="Visit our Instagram profile"
                  >
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-95 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 md:p-3 bg-white/10 rounded-full hover:bg-[#000000] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#410445]"
                    aria-label="Visit our TikTok profile"
                  >
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-95 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-5.394 10.692 6.33 6.33 0 0010.857-4.424V8.687a8.182 8.182 0 004.773 1.526V6.79a4.831 4.831 0 01-1.003-.104z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="peer pt-8 pb-2 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#410445]"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-sm transition-all"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="peer pt-8 pb-2 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#410445]"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-sm transition-all"
                    >
                      Email Address
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    rows="4"
                    className="peer pt-8 pb-2 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#410445]"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-sm transition-all"
                  >
                    Your Message
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#410445] text-white px-8 py-4 rounded-lg hover:bg-[#A5158C] transition-all transform hover:scale-[1.02]"
                >
                  Send Message
                  <svg
                    className="w-5 h-5 inline-block ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Button and Modal */}
      <button
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-8 right-8 p-4 bg-[#A5158C] text-white rounded-full shadow-lg hover:bg-[#A5158C] transition-colors duration-200 z-50"
        aria-label="Open chat"
      >
        <FontAwesomeIcon
          icon={faCommentDots}
          className="text-4xl text-[#ffffff]"
        />
      </button>
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in">
          <div className="fixed bottom-4 right-4 md:bottom-20 md:right-8 w-full md:w-[450px] max-h-[calc(100vh-30rem)] min-h-[400px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-100 transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-[#410445] to-[#5a0c60] rounded-xl shadow-sm">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="text-white text-xl transform -rotate-3"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Course Assistant
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-100/80 text-[#410445] rounded-full backdrop-blur-sm">
                      Beta
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500/90">
                    How can I help you today?
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 hover:bg-gray-50/50 rounded-lg transition-all duration-200 group"
                aria-label="Close chat"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-lg text-gray-400 group-hover:text-gray-600 transition-colors"
                />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.isUser ? "justify-end" : "justify-start"
                  } mb-4 last:mb-0`}
                >
                  <div
                    className={`flex max-w-[75%] lg:max-w-[60%] py-2 px-4 rounded-xl min-h-12 ${
                      msg.isUser
                        ? "bg-gradient-to-br from-[#410445] to-[#520a57] text-white ml-12 shadow-lg"
                        : "border-gray-200 bg-gray-100 text-gray-800 mr-12 shadow"
                    } transition-all duration-200 hover:shadow-xl inline-block`}
                  >
                    <span className="text-sm leading-6 whitespace-pre-wrap break-words">
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <div className="flex gap-2.5">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 placeholder-gray-400 text-gray-700 bg-white shadow-sm transition-all duration-200"
                />
                <button
                  onClick={sendMessage}
                  className="px-5 py-2.5 bg-gradient-to-br from-[#410445] to-[#9e4ba3] text-white rounded-xl hover:from-[#5e0b64] hover:to-[#77207e] shadow-md transform transition-all duration-200 active:scale-95"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-sm transform rotate-12"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
