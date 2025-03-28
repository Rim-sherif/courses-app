import "boxicons/css/boxicons.min.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SideMenu = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleNavigation = () => {
    if (isMobile) {
      onClose();
    }
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: "fa-solid fa-home" },
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
    <div
      className={`fixed md:relative top-0 left-0 min-h-screen w-[270px] bg-[#410445] p-6 flex flex-col z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Mobile Close Button */}
      {isMobile && (
        <button 
          className="self-end text-white mb-4"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
        <svg className="w-8 h-8 text-[#A5158C]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <NavLink 
          to="/" 
          className="text-2xl font-bold text-white hover:text-[#A5158C] transition-colors"
          onClick={handleNavigation}
        >
          Mentora
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow flex flex-col mt-4 space-y-2">
        {navLinks.map((link) => (
          <div key={link.path}>
            {link.subItems ? (
              <div>
                <button
                  onClick={() => toggleSubmenu(link.label)}
                  className="flex items-center justify-between px-3 py-2 rounded-md w-full text-white hover:bg-[#5b0564]"
                >
                  <div className="flex items-center gap-4">
                    <i className={`${link.icon} text-white`}></i>
                    <span>{link.label}</span>
                  </div>
                  <i className={`fa-solid fa-chevron-${openSubmenu === link.label ? "down" : "right"} text-white`}></i>
                </button>

                {openSubmenu === link.label && (
                  <div className="ml-4 mt-2 space-y-2">
                    {link.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        onClick={handleNavigation}
                        className="flex items-center px-3 py-2 rounded-md text-white hover:bg-[#5b0564]"
                      >
                        <span>{subItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={link.path}
                onClick={handleNavigation}
                className="flex items-center px-3 py-2 rounded-md text-white hover:bg-[#5b0564]"
              >
                <i className={`${link.icon} text-white`}></i>
                <span className="ml-3">{link.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Profile & Logout Section */}
      <div className="mt-auto flex flex-col space-y-2">
        <button 
          className="w-full p-2 text-left text-white flex items-center gap-3 rounded-md hover:bg-[#5b0564]"
          onClick={handleNavigation}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Log Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-500 text-center text-gray-300 text-sm">
        <span>&copy; 2025 Mentora</span>
        <span className="block text-xs mt-1">Version 1.0.0</span>
      </div>
    </div>
  );
};

export default SideMenu;