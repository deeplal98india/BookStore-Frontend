import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  const features = [
    {
      icon: "📚",
      title: "Explore Books",
      description:
        "Discover books across different categories and find your next great read.",
    },
    {
      icon: "🎯",
      title: "Learn at Your Pace",
      description:
        "Explore learning resources and build your knowledge at a pace that suits you.",
    },
    {
      icon: "💡",
      title: "Discover New Ideas",
      description:
        "Read, explore new perspectives, and keep growing through knowledge.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-28 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center md:px-8 md:py-20">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600 dark:bg-pink-500/15 dark:text-pink-400">
            About BookStore
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
            Your Next Great Read
            <span className="text-pink-500"> Starts Here</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
            Welcome to BookStore, a place to explore books, discover new ideas,
            and make learning a part of everyday life. We aim to make discovering
            your next read simple and enjoyable.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/course"
              className="rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
            >
              Explore Books
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold transition hover:border-pink-500 hover:text-pink-500 dark:border-slate-700"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
            <div>
              <p className="font-semibold uppercase tracking-widest text-pink-500">
                Who We Are
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Making Reading and Learning More Accessible
              </h2>

              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                BookStore is designed to help readers explore books and find
                useful learning resources in one place. Whether you are looking
                for something new to read or want to expand your knowledge, our
                goal is to make your browsing experience clear and convenient.
              </p>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                We believe that every book can introduce a new idea, inspire
                curiosity, and create an opportunity to learn something valuable.
              </p>
            </div>

            <div className="flex min-h-72 items-center justify-center rounded-3xl border border-pink-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:min-h-96">
              <div className="text-center">
                <div
                  className="text-8xl"
                  role="img"
                  aria-label="Open books"
                >
                  📚
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Read More. Learn More.
                </h3>

                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Discover something new with every read.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-widest text-pink-500">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Knowledge Should Be Easy to Explore
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
              Our mission is to provide a simple and welcoming platform where
              people can discover books, explore learning opportunities, and
              develop a lasting interest in reading.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="text-center">
              <p className="font-semibold uppercase tracking-widest text-pink-500">
                Why BookStore?
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                A Better Way to Discover Books
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                Explore a simple reading experience designed around discovery,
                curiosity, and learning.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-100 text-3xl dark:bg-pink-500/15">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-20">
          <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Discover Your Next Book?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/90">
              Start exploring our collection and take the next step in your
              reading and learning journey.
            </p>

            <Link
              to="/course"
              className="mt-7 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Browse Books
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;
