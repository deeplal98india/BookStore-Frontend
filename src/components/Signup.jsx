import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname.trim(),
      email: data.email.trim(),
      password: data.password,
    };

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo
      );

      if (!res.data) {
        toast.error("Unable to create your account. Please try again.");
        return;
      }

      toast.success("Your account has been created successfully!");

      // Save user information if returned by the server.
      if (res.data.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }

      // Save token if signup API returns one.
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate(from, { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="
        min-h-screen flex items-center justify-center
        bg-slate-50 px-4 py-10
        text-slate-800 transition-colors duration-300
        dark:bg-slate-950 dark:text-white
      "
    >
      <div
        className="
          relative w-full max-w-md overflow-hidden
          rounded-3xl border border-slate-200
          bg-white shadow-xl shadow-slate-200/50
          dark:border-slate-800 dark:bg-slate-900
          dark:shadow-black/20
        "
      >

        <div className="px-6 py-8 sm:px-8">
          {/* Close button */}
          <Link
            to="/"
            aria-label="Go back to home"
            className="
              absolute right-4 top-5 flex h-9 w-9
              items-center justify-center rounded-full
              text-slate-500 transition
              hover:bg-slate-100 hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800 dark:hover:text-white
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </Link>

          {/* Heading */}
          <div className="mb-7 text-center">
            <div
              className="
                mx-auto mb-4 flex h-14 w-14 items-center
                justify-center rounded-2xl
                bg-pink-50 text-pink-600
                dark:bg-pink-500/10 dark:text-pink-400
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-7 w-7"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M20 8v6m-3-3h6" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Join our community and start exploring a world of knowledge.
            </p>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full name */}
            <div className="mb-5">
              <label
                htmlFor="signup-fullname"
                className="mb-2 block text-sm font-semibold"
              >
                Full Name
              </label>

              <div
                className={`
                  flex items-center gap-3 rounded-xl border px-4
                  bg-slate-50 transition-all duration-200
                  dark:bg-slate-800/70
                  ${
                    errors.fullname
                      ? "border-red-400 ring-4 ring-red-500/10"
                      : "border-slate-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 dark:border-slate-700 dark:focus-within:border-pink-400 dark:focus-within:ring-pink-400/10"
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5 shrink-0 text-slate-400"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>

                <input
                  id="signup-fullname"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="
                    min-w-0 w-full bg-transparent py-3.5
                    text-sm text-slate-800 placeholder:text-slate-400
                    outline-none dark:text-white
                    dark:placeholder:text-slate-500
                  "
                  {...register("fullname", {
                    required: "Full name is required.",
                    validate: (value) =>
                      value.trim().length > 0 ||
                      "Please enter your full name.",
                  })}
                />
              </div>

              {errors.fullname && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-semibold"
              >
                Email Address
              </label>

              <div
                className={`
                  flex items-center gap-3 rounded-xl border px-4
                  bg-slate-50 transition-all duration-200
                  dark:bg-slate-800/70
                  ${
                    errors.email
                      ? "border-red-400 ring-4 ring-red-500/10"
                      : "border-slate-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 dark:border-slate-700 dark:focus-within:border-pink-400 dark:focus-within:ring-pink-400/10"
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5 shrink-0 text-slate-400"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>

                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="
                    min-w-0 w-full bg-transparent py-3.5
                    text-sm text-slate-800 placeholder:text-slate-400
                    outline-none dark:text-white
                    dark:placeholder:text-slate-500
                  "
                  {...register("email", {
                    required: "Email address is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>

              <div
                className={`
                  flex items-center gap-3 rounded-xl border px-4
                  bg-slate-50 transition-all duration-200
                  dark:bg-slate-800/70
                  ${
                    errors.password
                      ? "border-red-400 ring-4 ring-red-500/10"
                      : "border-slate-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 dark:border-slate-700 dark:focus-within:border-pink-400 dark:focus-within:ring-pink-400/10"
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5 shrink-0 text-slate-400"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                </svg>

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="
                    min-w-0 w-full bg-transparent py-3.5
                    text-sm text-slate-800 placeholder:text-slate-400
                    outline-none dark:text-white
                    dark:placeholder:text-slate-500
                  "
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    shrink-0 rounded-lg p-1.5
                    text-slate-400 transition
                    hover:bg-slate-200 hover:text-slate-700
                    dark:hover:bg-slate-700 dark:hover:text-white
                  "
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 8.3 4.5 9 7-.3 1.1-1 2.2-2 3.2M6.2 6.2C4 7.6 2.5 9.7 2 12c.7 2.5 4 7 10 7 1.3 0 2.5-.3 3.6-.8" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-6 flex w-full items-center justify-center gap-2
                rounded-xl bg-pink-500 px-4 py-3.5
                text-sm font-semibold text-white
                shadow-lg shadow-pink-500/20
                transition-all duration-200
                hover:bg-pink-600 hover:shadow-pink-500/30
                active:scale-[0.99]
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                document.getElementById("my_modal_3")?.showModal()
              }
              className="
                font-semibold text-pink-600
                transition hover:text-pink-700 hover:underline
                dark:text-pink-400 dark:hover:text-pink-300
              "
            >
              Sign In
            </button>
          </p>

          {/* Login modal */}
          <Login />
        </div>
      </div>
    </main>
  );
}

export default Signup;
