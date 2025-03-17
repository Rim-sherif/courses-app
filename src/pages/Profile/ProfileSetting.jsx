import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
export default function ProfileSettings({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
 
  const [avatarPreview, setavatarPreview] = useState(user.avatar);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleavatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setavatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setavatarPreview(user.avatar);
  }, [user]);
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const avatarFile = document.getElementById("avatar-upload").files[0];
      if (avatarFile) {
        const avatar = new FormData();
        avatar.append("avatar", avatarFile);

        await axios.post(
          "http://localhost:5000/api/v1/user/avatar",
          avatar,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      // Handle profile data update
      const response = await axios.put(
        "http://localhost:5000/api/v1/user/updateProfile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/user/changePass",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordFields(false);
        toast.success("Password updated successfully");
      }
    } catch (error) {
      if (error.response?.data?.error_Message) {
    
        error.response.data.error_Message.forEach(err => {
          toast.error(err.msg || "Validation error");
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to update password");
      }
    }
  };

  return (
    <div className=" w-full bg-white overflow-hidden  ">
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-semibold text-gray-900">
         Profile Settings
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#410445] rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>Edit Profile</span>
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* avatar Section */}
        <div className="flex flex-col items-start space-y-4 w-full md:w-50">
          <div className="relative group">
            <label
              htmlFor="avatar-upload"
              className={`cursor-pointer ${isEditing ? 'hover:ring-4 hover:ring-blue-100' : ''} rounded-full transition-all duration-300`}
            >
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform duration-300 hover:scale-105"
              />
              {isEditing && (
                <div className="absolute bottom-2 right-2 bg-[#410445] p-3 rounded-full shadow-md transform hover:scale-110 transition-transform duration-200 ring-2 ring-white">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </label>
            {isEditing && (
              <input
                id="avatar-upload"
                type="file"
                accept="avatar/*"
                onChange={handleavatarChange}
                className="hidden"
              />
            )}
          </div>
        </div>
  
        {/* Profile Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
              ) : (
                <p className="px-4 py-3 text-gray-700 bg-gray-50 rounded-lg">
                  {user.firstName}
                </p>
              )}
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
              ) : (
                <p className="px-4 py-3 text-gray-700 bg-gray-50 rounded-lg">
                  {user.lastName}
                </p>
              )}
            </div>
  
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
              ) : (
                <p className="px-4 py-3 text-gray-700 bg-gray-50 rounded-lg">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          
    
          {isEditing && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-[#410445] hover:bg-[#563458] text-white rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                  });
                  setavatarPreview(user.avatar);
                }}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
  
      {/* Password Change Section */}
      <div className="pt-8 border-t border-gray-100">
        <button
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <svg
              className="w-6 h-6 text-[#410445]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <span className="text-lg font-medium text-gray-900">
              Change Password
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
              showPasswordFields ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
  
        {showPasswordFields && (
          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
              </div>
            </div>
  
            <div className="flex justify-end   gap-4">
              <button
                type="submit"
                className=" px-4 py-2 text-sm bg-[#410445] hover:bg-[#563458] text-white rounded-xl shadow-md transition-all duration-300"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordFields(false)}
                className=" px-4 py-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  </div>
  );
}
