import React, { useState } from 'react';

const Settings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }
    try {
      // Add your API call here
      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      setMessage({ type: 'error', text: 'Please type DELETE to confirm' });
      return;
    }
    try {
      // Add your API call here
      setMessage({ type: 'success', text: 'Account deleted successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className=" mx-auto space-y-8">
        {/* Message Display */}
        {message.text && (
          <div className={`p-4 rounded-lg ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Change Password Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-end bg-[#410445] text-white p-2 rounded-lg hover:bg-[#380356] transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-red-600">Delete Account</h3>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. Please type "DELETE" to confirm.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Type DELETE to confirm"
            />
            <button
              onClick={handleDeleteAccount}
              className=" bg-red-700 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
