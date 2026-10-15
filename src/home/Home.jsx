import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-white">
      <Navbar />

      <main className="pt-16">
        <Banner />
        <Freebook />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
