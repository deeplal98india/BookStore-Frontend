import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // No contact API is connected yet.
    // Avoid displaying a false success message.
    toast.error(
      "Contact form abhi submit nahi ho sakta. Please email se contact karein."
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-screen-2xl px-4 pb-16 pt-28 md:px-20">
        {/* Heading */}
        <section className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
            Contact BookStore
          </span>

          <h1 className="mt-5 text-3xl font-bold md:text-5xl">
            We'd Love to{" "}
            <span className="text-pink-500">Hear from You</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
            Have a question about our books or learning resources?
            Send us a message and tell us how we can help.
          </p>
        </section>

        {/* Contact Layout */}
        <section className="grid gap-8 lg:grid-cols-5">
          {/* Contact Information */}
          <div className="rounded-2xl bg-slate-100 p-6 dark:bg-slate-900 md:p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold">
              Get in Touch
            </h2>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              We're here to help with your BookStore questions.
              Choose a contact option below.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-pink-100 p-3 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Contact us by email
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Add your official support email here.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-pink-100 p-3 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400">
                  <MessageCircle size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Book Support</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Questions about books and learning resources
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-pink-100 p-3 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Online Platform</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Explore our BookStore online
                  </p>
                  <Link
                    to="/course"
                    className="mt-2 inline-block text-sm font-semibold text-pink-500 hover:text-pink-600"
                  >
                    Explore Books →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-8 lg:col-span-3">
            <h2 className="text-2xl font-bold">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Fill in the details below.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
