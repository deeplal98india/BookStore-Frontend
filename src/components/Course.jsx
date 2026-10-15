import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:4001/book", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        // Support both array and { data: [] } API responses
        const books = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setBook(books);
      } catch (err) {
        console.error("Failed to fetch books:", err);

        setError(
          err.response?.status === 401
            ? "Please log in to view the books."
            : "Unable to load books right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
      {/* Page Introduction */}
      <div className="mt-28 text-center">
        <h1 className="text-2xl font-bold md:text-4xl">
          Explore Our{" "}
          <span className="text-pink-500">Book Collection</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
          Discover books across different categories and explore new ideas.
          Whether you want to learn a new skill, expand your knowledge, or
          find your next great read, start exploring our collection here.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-pink-500 px-5 py-2 text-white transition duration-300 hover:bg-pink-700"
        >
          Back to Home
        </Link>
      </div>

      {/* Book Collection */}
      <section className="mt-12 pb-12" aria-label="Book collection">
        {loading ? (
          <div className="py-12 text-center" role="status">
            <span className="loading loading-spinner loading-lg text-pink-500"></span>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Loading books...
            </p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500">{error}</p>

            {error.includes("log in") && (
              <Link
                to="/"
                className="mt-4 inline-block rounded-md bg-pink-500 px-5 py-2 text-white hover:bg-pink-700"
              >
                Go to Home to Log In
              </Link>
            )}
          </div>
        ) : book.length === 0 ? (
          <p className="py-12 text-center text-slate-600 dark:text-slate-300">
            No books are available at the moment. Please check back later.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {book.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Course;