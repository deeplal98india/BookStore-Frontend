import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const AdminDashboard = () => {
  const [authUser, setAuthUser] = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const isAdmin = authUser?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login again.");
          return;
        }

        const response = await axios.get(
          "http://localhost:4001/book",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = response.data;

        const bookList = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : [];

        setBooks(bookList);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load books. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem("Users");
    localStorage.removeItem("token");

    setAuthUser(null);
    setProfileOpen(false);

    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  if (!authUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const freeBooks = books.filter(
    (book) =>
      String(book.category).toLowerCase() === "free"
  );

  const paidBooks = books.filter(
    (book) =>
      String(book.category).toLowerCase() === "paid"
  );

  const stats = [
    {
      title: "Total Books",
      value: loading ? "—" : books.length,
      icon: "📚",
    },
    {
      title: "Free Books",
      value: loading ? "—" : freeBooks.length,
      icon: "🎁",
    },
    {
      title: "Paid Books",
      value: loading ? "—" : paidBooks.length,
      icon: "💰",
    },
  ];

  const adminName =
    authUser.fullname ||
    authUser.name ||
    authUser.username ||
    "Super Admin";

  const adminEmail = authUser.email || "Admin account";

  const initials = adminName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-pink-500">
              BOOKSTORE ADMIN
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your books, categories, and pricing from one place.
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <Link
              to="/admin/books/add"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:bg-pink-600 sm:px-5"
            >
              <span className="text-lg">+</span>
              Add New Book
            </Link>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                aria-label="Open admin profile"
                aria-expanded={profileOpen}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-pink-300 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                <span className="text-xl">👤</span>
              </button>

              {profileOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    onClick={() => setProfileOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />

                  <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    {/* Admin Details */}
                    <div className="border-b border-slate-200 p-4 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600 dark:bg-pink-500/15 dark:text-pink-400">
                          {initials || "SA"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {adminName}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                            {adminEmail}
                          </p>
                        </div>
                      </div>

                      <span className="mt-3 inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                        Super Admin
                      </span>
                    </div>

                    {/* Profile Menu Items */}
                    <div className="p-2">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          toast("Profile page abhi available nahi hai.");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span className="text-lg">👤</span>
                        My Profile
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        <span className="text-lg">↪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800">
                  {stat.icon}
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              to="/admin/books/add"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-pink-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-pink-500/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl dark:bg-pink-500/10">
                ➕
              </div>

              <h3 className="font-semibold group-hover:text-pink-500">
                Add a New Book
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Add book details, image, category, and selling price.
              </p>
            </Link>

            <Link
              to="/admin/books"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-pink-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-pink-500/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl dark:bg-blue-500/10">
                📖
              </div>

              <h3 className="font-semibold group-hover:text-pink-500">
                Manage Books
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                View your book collection and review existing prices.
              </p>
            </Link>
          </div>
        </section>

        {/* Recent Books */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-5 dark:border-slate-800">
            <div>
              <h2 className="font-bold">Recent Books</h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Latest books in your collection
              </p>
            </div>

            <Link
              to="/admin/books"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <p className="p-8 text-center text-slate-500">
              Loading books...
            </p>
          ) : error ? (
            <p className="p-8 text-center text-red-500">
              {error}
            </p>
          ) : books.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-semibold">
                No books added yet
              </p>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Add your first book to get started.
              </p>

              <Link
                to="/admin/books/add"
                className="mt-4 inline-block font-semibold text-pink-500"
              >
                Add your first book →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-medium">Book</th>
                    <th className="px-5 py-4 font-medium">Category</th>
                    <th className="px-5 py-4 font-medium">Price</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {books.slice(0, 5).map((book) => (
                    <tr key={book._id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt={book.name || "Book"}
                              className="h-12 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                              📕
                            </div>
                          )}

                          <div>
                            <p className="font-semibold">
                              {book.name || "Untitled"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              {book.title || "Book"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800">
                          {book.category || "Uncategorized"}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {String(book.category).toLowerCase() === "free"
                          ? "Free"
                          : `₹${Number(
                              book.price || 0
                            ).toLocaleString("en-IN")}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
