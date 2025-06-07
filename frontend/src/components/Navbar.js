// src/components/Navbar.js

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f2f2f2", color: "#FFFFFF" }}>
      <Link to="/pilkarze" style={{ marginRight: 16 }}>
        Piłkarze
      </Link>
      <Link to="/pozycje" style={{ marginRight: 16 }}>
        Pozycje
      </Link>
      <Link to="/kluby" style={{ marginRight: 16 }}>
        Kluby
      </Link>
    </nav>
  );
}
