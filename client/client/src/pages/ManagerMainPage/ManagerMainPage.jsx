import React, { useEffect, useState } from "react";
import "./ManagerMainPage.css";
import AccessibleTable from "../../components/Table/table";

export default function ManagerMainPage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/getGivenQuery");
        const data = await res.json();
        setData(data);
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
      <div className="NewClass">
        {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
      </div>
    </div>
  );
}
