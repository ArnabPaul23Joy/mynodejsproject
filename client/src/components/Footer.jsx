import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footerClass">
      <footer>
        <p>Copyrightâ“’ Arnab Paul Joy, {year}</p>
      </footer>
    </div>
  );
}

export default Footer;
