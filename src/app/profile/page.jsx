"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ContentLoader from 'react-content-loader';
import Cookies from 'js-cookie';

const ProfilePage = () => {
 
  
  const [error, setError] = useState(null);

  // State for password reset form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")): null;
  
  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Add logic to handle password reset
    console.log({
      currentPassword,
      newPassword,
      confirmPassword
    });
  };

  

  if (error) {
    return <p>Error: {error}</p>;
  }
  if(!userData) {
    return <p>you are not logged in!</p>
  }
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Avatar */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <Image
              src={'/default-avatar.jpg'} // Fallback to default if no avatar
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="text-gray-700">{userData.email}</p>
            <p>Role: {userData.role}</p>
          </div>
        </div>
      </div>

      {/* Reset Password Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-1">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
