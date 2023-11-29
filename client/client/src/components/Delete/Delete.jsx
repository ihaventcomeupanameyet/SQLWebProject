import React, { useEffect, useState } from "react";
import "./delete.css";
import AccessibleTable from "../Table/table";

export default function Delete() {
  const [data, setData] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");
  const handleChange = (e) => {
    setDeleteItem(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          pid: deleteItem,
        }),
      });
      if (res.status === 200) {
        fetchDataProducts();
        fetchDataInentory();
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function fetchDataProducts() {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchDataInentory() {
    try {
      const res = await fetch("http://localhost:3000/inventoryGetTable");
      const data = await res.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchDataProducts();
  }, []);
  useEffect(() => {
    fetchDataInentory();
  }, []);

  return (
    <div>
      <div className="tableWrapper">
        {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
        {inventory ? (
          <AccessibleTable
            rows={inventory.rows}
            collumns={inventory.colNumaes}
          />
        ) : null}
        <form onSubmit={handleDelete}>
          <input type="text" onChange={handleChange} value={deleteItem} />{" "}
          {/* Updated here */}
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}
