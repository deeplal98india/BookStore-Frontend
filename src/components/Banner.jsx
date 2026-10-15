import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner from "../../public/Banner.png";

function Banner() {
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    if (email.trim()) {
      localStorage.setItem("bookStoreEmail", email.trim());
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        {/* Left Content */}
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Discover Books and Start Learning{" "}
              <span className="text-pink-500">
                Something New Every Day!
              </span>
            </h1>

            <p className="text-sm md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              Explore books across different categories, discover new ideas,
              and build your knowledge at your own pace. Your next great read
              starts here at BookStore.
            </p>

            
<label
  className="
    group flex items-center gap-3
    w-full max-w-xl
    rounded-xl border
    border-slate-200 bg-white
    px-4 py-3.5
    shadow-sm
    transition-all duration-300
    hover:border-pink-300 hover:shadow-md
    focus-within:border-pink-500
    focus-within:ring-4 focus-within:ring-pink-500/10
    dark:border-slate-700 dark:bg-slate-900
    dark:hover:border-pink-400
    dark:focus-within:border-pink-400
    dark:focus-within:ring-pink-400/10
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="
      h-5 w-5 shrink-0
      text-slate-400
      transition-colors duration-300
      group-focus-within:text-pink-500
      dark:text-slate-500
      dark:group-focus-within:text-pink-400
    "
  >
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>

  <input
    type="email"
    className="
      grow min-w-0 bg-transparent
      text-sm md:text-base
      text-slate-800 placeholder:text-slate-400
      outline-none border-none
      focus:outline-none focus:ring-0
      dark:text-white
      dark:placeholder:text-slate-500
    "
    placeholder="Enter your email address"
    aria-label="Email address"
    value={email}
    onChange={(event) => setEmail(event.target.value)}
  />

  {email.trim() && (
    <button
      type="button"
      onClick={() => setEmail("")}
      className="
        shrink-0 rounded-full p-1
        text-slate-400
        transition-colors
        hover:bg-slate-100 hover:text-slate-700
        dark:hover:bg-slate-800 dark:hover:text-white
      "
      aria-label="Clear email"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </button>
  )}
</label>
          </div>

          <Link
            to="/course"
            onClick={handleGetStarted}
            className="btn mt-6 btn-secondary"
          >
            Explore Books
          </Link>
        </div>

        {/* Right Banner Image */}
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12 object-contain"
            alt="Books and learning resources at BookStore"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
