import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PasswordValidation from "../Dashboard/PasswordValidation/PasswordValidation";

export default function ProfileSettings({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [avatarPreview, setavatarPreview] = useState(user.avatar);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showValidation, setShowValidation] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => setavatarPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const image = new FormData();
      image.append("avatar", file);

      const response = await axios.post(
        "http://localhost:5000/api/v1/user/avatar",
        image,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser(response.data.user); 
        toast.success("Profile picture updated successfully", {
          autoClose: 500,
        });

        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating avatar", {
        autoClose: 600,
      });
    }
  };

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
    setavatarPreview(user.avatar);
  }, [user]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'newPassword') {
      setShowValidation(value.length > 0);
    }
  };

  const allValidationsPass = () => {
    const { newPassword, confirmPassword } = passwordData;
    return (
      newPassword.length >= 8 &&
      /\d/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      newPassword === confirmPassword
    );
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
      const response = await axios.put(
        "http://localhost:5000/api/v1/user/userProfile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully", { autoClose: 500 });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!allValidationsPass()) {
      toast.error("Please meet all password requirements");
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
            "Content-Type": "application/json",
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
        setShowValidation(false);
        toast.success("Password updated successfully", { autoClose: 500 });
      }
    } catch (error) {
      if (error.response?.data?.error_Message) {
        error.response.data.error_Message.forEach((err) => {
          toast.error(err.msg || "Validation error", { autoClose: 600 });
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update password",
          { autoClose: 600 }
        );
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-white overflow-hidden">
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
          {/* Avatar Section */}
          <div className="flex flex-col items-start space-y-4 w-full md:w-50">
            <div className="relative group">
              <label
                htmlFor="avatar-upload"
                className={`cursor-pointer ${
                  isEditing ? "hover:ring-4 hover:ring-blue-100" : ""
                } rounded-full transition-all duration-300`}
              >
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform duration-300 hover:scale-105"
                />
              </label>
              {isEditing && (
                <input
                  ref={fileInputRef}
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
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
                  Mobile
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                  />
                ) : (
                  <p className="px-4 py-3 text-gray-700 bg-gray-50 rounded-lg">
                    {user.phone}
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
                    disabled
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
                      email: user.email,
                      phone: user.phone,
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
                showPasswordFields ? "rotate-180" : ""
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
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <PasswordValidation 
                    password={passwordData.newPassword} 
                    isVisible={showValidation}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordData.confirmPassword && (
                    <div className={`mt-1 text-sm ${
                      passwordData.newPassword === passwordData.confirmPassword 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {passwordData.newPassword === passwordData.confirmPassword 
                        ? 'Passwords match' 
                        : 'Passwords do not match'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={!allValidationsPass()}
                  className={`px-4 py-2 text-sm rounded-xl shadow-md transition-all duration-300 ${
                    allValidationsPass() 
                      ? 'bg-[#410445] hover:bg-[#563458] text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordFields(false);
                    setShowValidation(false);
                  }}
                  className="px-4 py-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-300"
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