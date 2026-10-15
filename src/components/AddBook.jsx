import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const initialForm = {
  title: "",
  name: "",
  price: "",
  category: "paid",
  image: "",
};

export default function AddBook() {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAdmin = authUser?.role === "admin";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "image") {
      setImageError(false);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    setFormData((previous) => ({
      ...previous,
      category,
      price: category === "free" ? "0" : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    const name = formData.name.trim();
    const image = formData.image.trim();

    if (!title || !name || !image || formData.price === "") {
      toast.error("Please fill in all required fields.");
      return;
    }

    const price = Number(formData.price);

    if (!Number.isFinite(price) || price < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (formData.category === "free" && price !== 0) {
      toast.error("Free book ka price ₹0 hona chahiye.");
      return;
    }

    if (formData.category === "paid" && price <= 0) {
      toast.error("Paid book ka price ₹0 se zyada hona chahiye.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login again.");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        name,
        price,
        category: formData.category,
        image,
      };

      await axios.post(
        "http://localhost:4001/book",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book added successfully!");
      setFormData(initialForm);
      setImageError(false);
      navigate("/admin/books");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add book."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 transition hover:text-pink-700"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-8 mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
            Bookstore Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Add New Book
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add book information, cover image and selling price.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {/* Book Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <h2 className="text-lg font-bold">
                  Book Information
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Enter the basic details of your book.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Book Title *
                    </label>

                    <input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Introduction to JavaScript"
                      maxLength={200}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Author / Book Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter author or book name"
                      maxLength={200}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Book Cover Image URL *
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/book-cover.jpg"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />

                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Paste a publicly accessible image URL.
                    </p>
                  </div>
                </div>
              </section>

              {/* Pricing & Category */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <h2 className="text-lg font-bold">
                  Pricing & Category
                </h2>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Book Category *
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 dark:border-slate-700 dark:bg-slate-950"
                    >
                      <option value="free">Free Book</option>
                      <option value="paid">Paid Book</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Selling Price (₹) *
                    </label>

                    <div className="flex items-center overflow-hidden rounded-xl border border-slate-300 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 dark:border-slate-700">
                      <span className="border-r border-slate-200 px-4 py-3 text-slate-500 dark:border-slate-700">
                        ₹
                      </span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder={
                          formData.category === "free"
                            ? "0"
                            : "Enter price"
                        }
                        required
                        readOnly={formData.category === "free"}
                        className="w-full bg-white px-3 py-3 outline-none read-only:cursor-not-allowed read-only:bg-slate-100 dark:bg-slate-950 dark:read-only:bg-slate-800"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {formData.category === "free"
                        ? "Free books ka price ₹0 fix hai."
                        : "Paid book ki selling price enter karo."}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Preview & Actions */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="font-bold">Cover Preview</h2>

                <div className="mt-4 flex min-h-64 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                  {formData.image.trim() && !imageError ? (
                    <img
                      src={formData.image}
                      alt="Book cover preview"
                      onLoad={() => setImageError(false)}
                      onError={() => setImageError(true)}
                      className="max-h-64 w-auto max-w-full rounded-lg object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl">📚</div>
                      <p className="mt-3 text-sm font-medium text-slate-500">
                        {imageError
                          ? "Image could not be loaded"
                          : "Your book cover will appear here"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Listing Preview
                  </p>

                  <p className="mt-2 break-words font-bold">
                    {formData.title || "Book title"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {formData.name || "Author / book name"}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold capitalize text-pink-700 dark:bg-pink-500/10 dark:text-pink-300">
                      {formData.category}
                    </span>

                    <span className="font-bold">
                      ₹
                      {formData.price === ""
                        ? "0"
                        : Number(formData.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-pink-500 px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Saving Book..." : "Save Book"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialForm);
                    setImageError(false);
                  }}
                  disabled={loading}
                  className="mt-3 w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Reset Form
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Fields marked with * are required.
                </p>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
}
