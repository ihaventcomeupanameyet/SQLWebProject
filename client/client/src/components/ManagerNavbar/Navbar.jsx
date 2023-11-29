import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { FaShoppingCart } from "react-icons/fa";

import "./home.css";

export default function NavbarM() {
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
      <ul className="mNavbar">
        <li className="ko">
          <a href="/">Home</a>
        </li>
        <li className="ko">
          <a href="/manager/insert">Insert</a>
        </li>
        <li className="ko">
          <a href="/manager/delete">Delete</a>
        </li>
        <li className="ko">
          <a href="/manager/update">Update</a>
        </li>
        <li className="ko">
          <a href="/manager/selection">Selection</a>
        </li>
        <li className="ko">
          <a href="/manager/projection">Projection</a>
        </li>
        <li className="ko">
          <a href="/manager/join">Join</a>
        </li>
        <li className="ko">
          <a href="/manager/aggregation">Aggregation</a>
        </li>
        <li className="ko">
          <a href="/manager/aggregationH">Aggregation H</a>
        </li>
        <li className="ko">
          <a href="/manager/nestedAggregation">Nested AG</a>
        </li>
        <li className="ko">
          <a href="/manager/division">Division</a>
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
