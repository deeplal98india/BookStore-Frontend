import React from "react";

function Footer() {
  return (
    <footer
      id="about"
      className="footer footer-center rounded bg-white p-10 text-slate-700 dark:bg-slate-900 dark:text-white"
    >
      {/* About BookStore */}
      <div className="max-w-xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          About BookStore
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          BookStore helps readers discover books and explore learning
          resources. Find your next read, build your knowledge, and keep
          learning every day.
        </p>
      </div>

      {/* Footer Links */}
      <nav className="grid grid-flow-col flex-wrap justify-center gap-4">
        <a href="#about" className="link link-hover">
          About Us
        </a>

        <a href="#contact" className="link link-hover">
          Contact Us
        </a>

        <a href="/course" className="link link-hover">
          Explore Courses
        </a>

        <a href="/" className="link link-hover">
          Home
        </a>
      </nav>

      {/* Social Media Links */}
      <nav aria-label="Social media">
        <div className="grid grid-flow-col gap-5">
          {/* X / Twitter */}
          <a
            href="https://x.com/DeeplalKumar11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            title="X (Twitter)"
            className="transition hover:text-sky-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.901 1.153h3.308l-7.227 8.26L23.485 22h-6.769l-5.3-6.932L5.35 22H2.04l7.73-8.835L1.515 1.153h6.94l4.79 6.333zM17.74 19.77h1.833L7.322 3.27H5.355z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@Coding_with_deeplal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
            className="transition hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/deeplal.kumar.77964"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className="transition hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/deeplal-kumar-b47548229/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="transition hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Copyright */}
      <aside>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Deeplal BookStore. All rights reserved.
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
