import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import ConfirmModal from "./common/ConfirmModal";

function Logout() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    try {
      // Clear saved authentication data
      localStorage.removeItem("Users");
      localStorage.removeItem("token");

      // Update authentication state
      setAuthUser(null);

      // Close confirmation modal
      setShowConfirm(false);

      // Show success message
      toast.success("Logout successfully");

      // Redirect to Home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="cursor-pointer rounded-md bg-red-500 px-3 py-2
        text-white transition-colors hover:bg-red-600"
      >
        Logout
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to logout from your account?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
        variant="danger"
      />
    </>
  );
}

export default Logout;
