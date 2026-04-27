import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen bg-gray-800 text-white">
        <Navbar />

        <main className="flex-1 p-5">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
