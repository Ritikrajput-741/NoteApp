import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("home");

  return (
  <nav className="bg-gray-100/90 flex  justify-between backdrop-blur-md sticky top-0 z-50 px-6 py-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BookOpen className="text-blue-600" size={28} />
        <h1 className="text-xl font-bold text-gray-800">
          NOTE<span className="text-blue-600">App</span>
        </h1>
      </div>

      {/* Links */}
      <ul className="flex gap-6 text-gray-600 font-medium">
        <Link
          to={"/"}
          onClick={() => setActive("home")}
          className={`cursor-pointer hover:text-blue-600 transition ${
            active === "home"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : ""
          }`}
        >
          Home
        </Link>

        <Link
          to={"/create"}
          onClick={() => setActive("create")}
          className={`cursor-pointer hover:text-blue-600 transition ${
            active === "create"
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : ""
          }`}
        >
          Create
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
