import { useEffect, useState } from "react";
import "./home.css";
import Card from "../../components/Card/Card";

export default function Home() {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <h1> HomePage</h1>
      {data && (
        <div className="cardWrapper">
          {data.map((item) => (
            <Card itemData={item} />
          ))}
        </div>
      )}
    </div>
  );
}
