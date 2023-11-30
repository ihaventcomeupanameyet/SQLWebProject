import React, { useEffect, useState } from "react";

import "./Join.css";
import AccessibleTable from "../Table/table";
import { toast } from "react-toastify";

function Join() {
  const [data, setOrder] = useState([]);
  const [data2, setItemOrder] = useState([]);
  const [data3, setData] = useState([]);
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
        }),
      });
      const data = await res.json();
      toast.success("Sucessfull join");
      setData(data);
    } catch (error) {
      toast.error(error);
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
    <div className="joint-wrappe">
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
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Join;
