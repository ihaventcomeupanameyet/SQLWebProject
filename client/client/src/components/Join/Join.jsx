import React, { useEffect, useState } from "react";

import "./Join.css";
import AccessibleTable from "../Table/table";

function Join() {
  const [data, setOrder] = useState([]);
  const [data2, setItemOrder] = useState([]);
  const [data3, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/join");
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function fetchOrder() {
    try {
      const res = await fetch("http://localhost:3000/order");
      const data = await res.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchItemOrder() {
    try {
      const res = await fetch("http://localhost:3000/itemsOrder");
      const data = await res.json();
      setItemOrder(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchOrder();
    fetchItemOrder();
  }, []);

  return (
    <div>
      {data ? (
        <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
      ) : null}
      {data2 ? (
        <AccessibleTable rows={data2.rows} collumns={data2.colNumaes} />
      ) : null}
      {data3 ? (
        <AccessibleTable rows={data3.rows} collumns={data3.colNumaes} />
      ) : null}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Join;
