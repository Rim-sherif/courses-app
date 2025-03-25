import "boxicons/css/boxicons.min.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: "fa-solid fa-home" },
    {
      path: "/dashboard/certificates",
      label: "Certificates",
      icon: "fa-solid fa-certificate",
    },
    {
      path: "/dashboard/course",
      label: "Courses",
      icon: "fa-solid fa-book",
      subItems: [
        { path: "/dashboard/course/add", label: "Add Course" },
        { path: "/dashboard/course/free", label: "Free Courses" },
        { path: "/dashboard/course/paid", label: "Paid Courses" },
      ],
    },
    {
      path: "/dashboard/live-stream",
      label: "Live Stream",
      icon: "fa-solid fa-video",
    },
    {
      path: "/dashboard/verification",
      label: "Account verification",
      icon: "fa-regular fa-address-card",
    },
    {
      path: "/dashboard/support",
      label: "Customer Support",
      icon: "fa-solid fa-headset",
    },
    {
      path: "/dashboard/setting",
      label: "Settings",
      icon: "fa-solid fa-gear",
    },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* SideMenu */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-[270px] bg-black p-6 flex flex-col z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button className="md:hidden self-end text-white" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-white pb-6">
          <svg
            className="w-8 h-8 text-[#A5158C]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <NavLink to="/" className="text-2xl font-bold text-[#ffffff]">
            Mentora
          </NavLink>
        </div>

        {/* Navigation Links - Add flex-grow to push footer to bottom */}
        <div className="flex-grow flex flex-col gap-2 space-y-2 mt-2">
          {navLinks.map((link) => (
            <div key={link.path}>
              {link.subItems ? (
                <div>
                  <button
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    className={`flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-300 w-full text-white hover:bg-gray-100 hover:text-[#380356]`}
                  >
                    <div className="flex items-center gap-4">
                      <i className={`${link.icon} text-white`}></i>
                      <span className="text-base font-poppins">{link.label}</span>
                    </div>
                    <i className={`fa-solid fa-chevron-${isCoursesOpen ? 'down' : 'right'} text-white`}></i>
                  </button>
                  <div className={`ml-4 mt-2 space-y-2 transition-all duration-300 ${isCoursesOpen ? 'block' : 'hidden'}`}>
                    {link.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center px-2 py-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "text-white bg-[#410445]"
                              : "text-white hover:bg-gray-100 hover:text-[#380356]"
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-sm font-poppins">{subItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-300 w-full ${
                      isActive
                        ? "text-white bg-[#410445]"
                        : "text-white hover:bg-gray-100 hover:text-[#380356]"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-4">
                        <i className={`${link.icon} ${isActive ? "text-white" : "text-white"}`}></i>
                        <span className="text-base font-poppins">{link.label}</span>
                      </div>
                      <div className="flex items-center w-4 h-4">
                        {isActive ? (
                          <i className="fa-solid fa-chevron-right text-[#380356]"></i>
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Profile Section - Add before footer */}
        <div className="mt-auto ">
      
          <button 
            onClick={() => {/* Add your logout logic here */}}
            className="w-full mt-2 p-2 text-left text-white rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Log Out</span>
          </button>
        </div>

        {/* Footer - adjust margin top */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex flex-col items-center gap-2 text-sm text-gray-400">
            <span>&copy; 2025 Mentora</span>
            <span className="text-xs">Version 1.0.0</span>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default SideMenu;