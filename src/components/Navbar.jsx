import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [authUser] = useAuth();

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [sticky, setSticky] = useState(false);

  // Apply theme globally
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");

    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const navItems = (
  <>
    <li>
      <Link to="/">Home</Link>
    </li>

    <li>
      <Link to="/course">Course</Link>
    </li>

    <li>
      <Link to="/contact">Contact</Link>
    </li>

    <li>
      <Link to="/about">About</Link>
    </li>
  </>
);


  const profilePhoto =
    authUser?.profilePic ||
    authUser?.profileImage ||
    authUser?.avatar ||
    authUser?.image ||
    "";

  const userInitial = (
    authUser?.fullname ||
    authUser?.name ||
    authUser?.email ||
    "U"
  ).charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b
        border-slate-200 bg-white text-slate-900
        transition-all duration-300
        dark:border-slate-700 dark:bg-slate-900 dark:text-white
        ${sticky ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-20">
        <div className="navbar min-h-16 bg-transparent px-0">

          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown">
              <button
                type="button"
                tabIndex={0}
                aria-label="Open navigation menu"
                className="btn btn-ghost btn-circle lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[60] mt-3 w-52 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {navItems}
              </ul>
            </div>

            <Link
              to="/"
              className="cursor-pointer text-xl font-bold text-slate-900 dark:text-white md:text-2xl"
            >
              bookStore
            </Link>
          </div>

          {/* Navbar End */}
          <div className="navbar-end gap-2 md:gap-3">

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex">
              <ul className="menu menu-horizontal items-center px-1">
                {navItems}
              </ul>
            </nav>

            {/* Search */}
            <div className="hidden md:block">
              <label className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 focus-within:border-pink-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                <input
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  className="w-28 grow bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-400"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={() =>
                setTheme((current) =>
                  current === "dark" ? "light" : "dark"
                )
              }
              className="btn btn-ghost btn-circle text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
                </svg>
              )}
            </button>

            {/* Profile / Login */}
            {authUser ? (
              <Link
                to="/profile"
                title="View Profile"
                aria-label="Open user profile"
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-300 transition hover:border-pink-500 dark:border-slate-600"
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="User profile"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-pink-500 text-lg font-bold text-white">
                    {userInitial}
                  </span>
                )}
              </Link>
            ) : (
              <div>
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-pink-500 dark:hover:bg-pink-600"
                  onClick={() =>
                    document.getElementById("my_modal_3")?.showModal()
                  }
                >
                  Login
                </button>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
