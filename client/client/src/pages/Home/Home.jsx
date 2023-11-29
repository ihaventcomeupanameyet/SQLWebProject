import React, { useEffect, useState } from "react";
import "./home.css";
import Card from "../../components/Card/Card";
import Cart from "../../components/Cart/Cart";

export default function Home() {
  const [data, setData] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState("");

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
