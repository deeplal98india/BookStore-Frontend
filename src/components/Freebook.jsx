import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
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
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        // API response direct array ya { data: [] } ho sakta hai
        const books = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        const freeBooks = books.filter(
          (item) => item.category?.toLowerCase() === "free"
        );

        setBook(freeBooks);
      } catch (error) {
        console.error(
          "Error fetching free books:",
          error.response?.data || error.message
        );

        setError(
          error.response?.status === 401
            ? "Please log in to explore our collection of free books."
            : "Books load nahi ho paayi. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: book.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, book.length),
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, book.length),
          slidesToScroll: 1,
          infinite: book.length > 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(1, book.length),
          slidesToScroll: 1,
          infinite: book.length > 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-8">
      <div className="mb-6">
        <h1 className="font-semibold text-xl pb-2 text-slate-900 dark:text-white">
          Free Offered Books
        </h1>

        <p className="text-slate-600 dark:text-slate-300">
          Discover a world of knowledge with our collection of free books and learning resources. Explore inspiring stories, expand your understanding, develop new skills, and uncover fresh ideas that help you grow personally and professionally. Whether you're looking to learn something new or broaden your horizons, start your learning journey with our handpicked selection of free books.
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-600 dark:text-slate-300">
          Loading free books...
        </div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">{error}</div>
      ) : book.length === 0 ? (
        <div className="py-10 text-center text-slate-600 dark:text-slate-300">
          No free books available right now.
        </div>
      ) : (
        <div className="px-2 pb-8">
          <Slider {...settings}>
            {book.map((item) => (
              <div key={item._id} className="px-2 py-2">
                <Cards item={item} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
}

export default Freebook;
