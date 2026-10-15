
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

function Profile() {
  const [authUser] = useAuth();

  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  const photo =
    authUser.profilePic ||
    authUser.profileImage ||
    authUser.avatar ||
    authUser.image;

  return (
    <div className="min-h-screen pt-28 px-4 dark:bg-slate-900
      dark:text-white flex justify-center">
      <div className="w-full max-w-md h-fit p-6 rounded-2xl
        shadow-lg border dark:border-slate-700 text-center">

        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover
              mx-auto border-4 border-pink-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto
            bg-pink-500 text-white text-3xl font-bold
            flex items-center justify-center">
            {(authUser.fullname || authUser.name ||
              authUser.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}

        <h2 className="text-2xl font-bold mt-4">
          {authUser.fullname || authUser.name || "User"}
        </h2>

        <p className="text-gray-500 dark:text-gray-300 mt-2">
          {authUser.email}
        </p>

        {authUser.role && (
          <p className="mt-2 capitalize">
            Role: {authUser.role}
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-md bg-slate-200
              text-slate-900"
          >
            Home
          </Link>

          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Profile;
