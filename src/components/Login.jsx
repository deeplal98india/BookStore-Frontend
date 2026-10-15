import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [, setAuthUser] = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email.trim(),
      password: data.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );

      const user = response.data?.user;
      const token = response.data?.token;

      if (!user) {
        toast.error("User information was not returned by the server.");
        return;
      }

      localStorage.setItem("Users", JSON.stringify(user));

      if (token) {
        localStorage.setItem("token", token);
      }

      setAuthUser(user);

      toast.success("Logged in successfully!");

      document.getElementById("my_modal_3")?.close();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div>
      <dialog
        id="my_modal_3"
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className="
            relative w-full max-w-md overflow-hidden
            rounded-t-3xl sm:rounded-3xl
            border border-slate-200
            bg-white text-slate-800
            shadow-2xl
            dark:border-slate-700
            dark:bg-slate-900 dark:text-white
          "
        >

          {/* Close button */}
          <button
            type="button"
            onClick={() =>
              document.getElementById("my_modal_3")?.close()
            }
            className="
              absolute right-4 top-5
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-slate-500 transition
              hover:bg-slate-100 hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800 dark:hover:text-white
            "
            aria-label="Close login dialog"
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
          </button>

          <div className="px-6 pb-7 pt-7 sm:px-8">
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome Back!
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Sign in to explore books and continue your learning journey.
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <div
                  className={`
                    flex items-center gap-3 rounded-xl border px-4
                    transition-all duration-200
                    ${
                      errors.email
                        ? "border-red-400 ring-4 ring-red-500/10"
                        : "border-slate-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 dark:border-slate-700 dark:focus-within:border-pink-400 dark:focus-within:ring-pink-400/10"
                    }
                    bg-slate-50 dark:bg-slate-800/70
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
                    id="login-email"
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
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div
                  className={`
                    flex items-center gap-3 rounded-xl border px-4
                    transition-all duration-200
                    ${
                      errors.password
                        ? "border-red-400 ring-4 ring-red-500/10"
                        : "border-slate-200 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 dark:border-slate-700 dark:focus-within:border-pink-400 dark:focus-within:ring-pink-400/10"
                    }
                    bg-slate-50 dark:bg-slate-800/70
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
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="
                      min-w-0 w-full bg-transparent py-3.5
                      text-sm text-slate-800 placeholder:text-slate-400
                      outline-none dark:text-white
                      dark:placeholder:text-slate-500
                    "
                    {...register("password", {
                      required: "Password is required.",
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

              {/* Submit button */}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
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

            {/* Signup link */}
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                onClick={() =>
                  document.getElementById("my_modal_3")?.close()
                }
                className="
                  font-semibold text-pink-600
                  transition hover:text-pink-700 hover:underline
                  dark:text-pink-400 dark:hover:text-pink-300
                "
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close login dialog">close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Login;
