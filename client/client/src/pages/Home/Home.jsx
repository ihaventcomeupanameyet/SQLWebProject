import React, { useEffect, useState } from "react";
import "./home.css";
import Card from "../../components/Card/Card";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../../components/Cart/Cart";

export default function Home() {
  const [data, setData] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/getData");
        const data = await res.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, []);

  return (
    <div>
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

      {data && (
        <div className="cardWrapper">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Card itemData={item} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
