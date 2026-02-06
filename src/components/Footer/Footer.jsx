import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-3 mt-4">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <small>© {new Date().getFullYear()} Movie Hub</small>
        
      </div>
    </footer>
  );
};

export default Footer;
