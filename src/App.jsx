import React from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import About from "./components/About";

import AdminDashboard from "./components/AdminDashboard";
import AddBook from "./components/AddBook";
import ManageBooks from "./components/ManageBooks";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();

  const isAdmin = authUser?.role === "admin";

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Home />
            )
          }
        />

        {/* Courses - Login Required */}
        <Route
          path="/course"
          element={
            !authUser ? (
              <Navigate to="/" replace />
            ) : isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Courses />
            )
          }
        />

        {/* About Page */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Contact Page */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={
            isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Signup />
            )
          }
        />

        {/* Profile - Login Required */}
        <Route
          path="/profile"
          element={
            !authUser ? (
              <Navigate to="/" replace />
            ) : isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Profile />
            )
          }
        />

        {/* Admin Dashboard - Admin Only */}
        <Route
          path="/admin/dashboard"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Add Book - Admin Only */}
        <Route
          path="/admin/books/add"
          element={
            isAdmin ? (
              <AddBook />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Manage Books - Admin Only */}
        <Route
          path="/admin/books"
          element={
            isAdmin ? (
              <ManageBooks />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
