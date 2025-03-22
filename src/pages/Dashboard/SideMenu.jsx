import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Side Menu */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-black p-6 flex flex-col gap-6 text-white transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden self-end text-white"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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

        {/* User Profile */}
        <div className="flex items-center gap-3 border-b border-white pb-6">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-lg">M</span>
          </div>
          <div>
            <div className="text-sm font-semibold">Mohamed Abdelrahim</div>
            <div className="text-sm text-gray-400 font-poppins">01018603095</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 rounded-full transition-all duration-300 w-full ${
                isActive
                  ? "bg-white text-[#380356]"
                  : "text-white hover:bg-gray-100 hover:text-[#380356]"
              }`
            }
            onClick={() => setIsOpen(false)} // Close menu on link click in mobile
          >
            {({ isActive }) => (
              <>
                <span className="text-base font-poppins">Dashboard</span>
                <div className="flex items-center w-4 h-4 mt-2">
                  {isActive ? (
                    <box-icon
                      name="chevron-right"
                      type="solid"
                      size="s"
                      color="#380356"
                    />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
              </>
            )}
          </NavLink>
          <NavLink
            to="/dashboard/certificates"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2 rounded-full transition-all duration-300 w-full ${
                isActive
                  ? "bg-white text-[#380356]"
                  : "text-white hover:bg-gray-100 hover:text-[#380356]"
              }`
            }
            onClick={() => setIsOpen(false)} // Close menu on link click in mobile
          >
            {({ isActive }) => (
              <>
                <span className="text-base font-poppins">Certificates</span>
                <div className="flex items-center w-4 h-4 mt-2">
                  {isActive ? (
                    <box-icon
                      name="chevron-right"
                      type="solid"
                      size="s"
                      color="#380356"
                    />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* Overlay for mobile when menu is open */}
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