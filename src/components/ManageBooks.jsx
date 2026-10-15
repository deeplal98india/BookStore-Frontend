import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

export default function ManageBooks() {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const token = localStorage.getItem("token");
  const isAdmin = authUser?.role === "admin";

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:4001/book",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(
        Array.isArray(response.data?.data)
          ? response.data.data
          : []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load books."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAdmin && token) {
      fetchBooks();
    } else {
      setLoading(false);
    }
  }, [isAdmin, token, fetchBooks]);

  const handleDelete = async (book) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${
        book.title || book.name || "this book"
      }"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(book._id);

      const response = await axios.delete(
        `http://localhost:4001/book/${book._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks((previousBooks) =>
        previousBooks.filter(
          (item) => item._id !== book._id
        )
      );

      toast.success(
        response.data?.message ||
          "Book deleted successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete book."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const filteredBooks = books.filter((book) =>
    [book.title, book.name, book.category]
      .filter(Boolean)
      .some((value) =>
        String(value)
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
  );

  return (
    <div
      className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-10"
      onClick={() => setOpenMenuId(null)}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/admin/dashboard"
              onClick={(event) => event.stopPropagation()}
              className="mb-4 inline-block text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              ← Back to Dashboard
            </Link>

            <p className="text-xs font-bold uppercase tracking-widest text-pink-600">
              Bookstore Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Manage Books
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Search, review and manage your book collection.
            </p>
          </div>

          <Link
            to="/admin/books/add"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center justify-center rounded-xl bg-pink-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-pink-600"
          >
            + Add New Book
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Books
            </p>
            <p className="mt-2 text-3xl font-bold">
              {books.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Free Books
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {
                books.filter(
                  (book) =>
                    String(book.category).toLowerCase() === "free"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Paid Books
            </p>
            <p className="mt-2 text-3xl font-bold text-pink-600">
              {
                books.filter(
                  (book) =>
                    String(book.category).toLowerCase() === "paid"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Books Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">
                All Books
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {filteredBooks.length} books found
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onClick={(event) => event.stopPropagation()}
              placeholder="Search books..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-950 sm:max-w-xs"
            />
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500">
              Loading books...
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl">📚</div>

              <h3 className="mt-3 font-bold">
                {search
                  ? "No matching books"
                  : "No books added yet"}
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {search
                  ? "Try another search term."
                  : "Add your first book to get started."}
              </p>

              {!search && (
                <Link
                  to="/admin/books/add"
                  className="mt-5 inline-block font-semibold text-pink-600 hover:text-pink-700"
                >
                  Add your first book →
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Book
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      Name
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      Category
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      Price
                    </th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt={book.title || book.name || "Book"}
                              onError={(event) => {
                                event.currentTarget.style.visibility =
                                  "hidden";
                              }}
                              className="h-14 w-11 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                            />
                          ) : (
                            <div className="flex h-14 w-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                              📖
                            </div>
                          )}

                          <span className="max-w-[200px] truncate font-semibold">
                            {book.title || "Untitled"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {book.name || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                          {book.category || "Unknown"}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        ₹
                        {Number(book.price || 0).toLocaleString("en-IN")}
                      </td>

                      {/* Three-dot Actions Menu */}
                      <td className="px-5 py-4">
                        <div
                          className="relative flex justify-end"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            type="button"
                            aria-label="Book actions"
                            aria-expanded={openMenuId === book._id}
                            onClick={() =>
                              setOpenMenuId((currentId) =>
                                currentId === book._id
                                  ? null
                                  : book._id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            ⋮
                          </button>

                          {openMenuId === book._id && (
                            <div className="absolute right-0 top-full mt-2 z-50 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  toast(
                                    "Edit Book API abhi connect nahi hui."
                                  );
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                              >
                                <span>✏️</span>
                                Edit
                              </button>

                              <button
                                type="button"
                                disabled={deletingId === book._id}
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleDelete(book);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-500/10"
                              >
                                <span>🗑️</span>
                                {deletingId === book._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
