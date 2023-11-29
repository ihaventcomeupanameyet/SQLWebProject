import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { FaShoppingCart } from "react-icons/fa";

import "./home.css";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="Headering">
      <h1 color="white" className="MainTitle">
        Main Store
      </h1>
      <ul>
        <li className="ko">
          <a href="/">Home</a>
        </li>
        <li className="ko">
          <a href="/about">About</a>
        </li>

        <li className="ko" onClick={handleLogout}>
          Logout
        </li>

        <li className="ko icon">
          <FaShoppingCart onClick={() => setShowCart(!showCart)} />
        </li>
        {showCart && <Cart setShowCart={setShowCart} />}
      </ul>
    </div>
  );
}
