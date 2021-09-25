import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footerClass">
      <footer>
        <p>Copyrightⓒ Arnab Paul Joy, {year}</p>
      </footer>
    </div>
  );
}

export default Footer;
