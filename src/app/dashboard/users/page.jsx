"use client";
import useFetch from "@/hooks/useFetch";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Cookies from "js-cookie";
import apiKey from "@/utils/api_key";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmationModal"; // Import the ConfirmModal component

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
  </div>
);

const UserPage = () => {
  const { data, error, loading, fetchData } = useFetch("/users");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const currUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleRoleChange = async (userId, newRole) => {
     
    const token = Cookies.get("accessToken");

    try {
      const response = await axios.patch(
        `https://aefff-api.vercel.app/api/users/${userId}`,
        { role: newRole, updatedBy: userId },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchData();
        toast("Role updated successfully...");
        console.log("Role updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to update role");
    }
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    const token = Cookies.get("accessToken");

    try {
      const response = await axios.delete(
        `https://aefff-api.vercel.app/api/users/${userToDelete}`,
        {
          headers: {
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Close modal and remove user from list
        setModalOpen(false);
        setUsers(users.filter((user) => user._id !== userToDelete));
        toast("User deleted successfully...");
        fetchData(); // Reload users
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-6">User Management</h2>

      <div className="overflow-x-auto">
        {loading ? (
          <div>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : (
          <table className="w-full border-collapse bg-white text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1 w-full md:w-auto"
                    >
                      <option value="GUEST">Guest</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  {currUser.role == "ADMIN" &&
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>}
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      disabled
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {error && (
          <div className="text-red-500 mt-4">Failed to load users.</div>
        )}
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        onConfirm={handleDeleteUser}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default UserPage;
