import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100/90  text-gray-600 text-center py-4 mt-6">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-800">NoteKeeper</span>. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
