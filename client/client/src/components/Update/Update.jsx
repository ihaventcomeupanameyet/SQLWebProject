import React, { useEffect, useState } from "react";

import "./update.css";
import AccessibleTable from "../Table/table";

function Update() {
  const [data, setData] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [suplier, setSupplier] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [wid, setWid] = useState("");
  const [pid, setPid] = useState("");
  const [sid, setSid] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const clear = () => {
    setWid("");
    setPid("");
    setSid("");
    setSize("");
    setPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/updateInven", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          wid,
          pid,
          sid,
          price,
          size,
        }),
      });
      if (res.status === 200) {
        fetchDataInentory();
        fetchWarehouses();
        fetchWarehouses();
        fetchInventoryGetTable();
        clear();
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function fetchDataInentory() {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchWarehouses() {
    try {
      const res = await fetch("http://localhost:3000/wharehouses");
      const data = await res.json();
      setWarehouse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchSuplier() {
    try {
      const res = await fetch("http://localhost:3000/supplier");
      const data = await res.json();
      setSupplier(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchInventoryGetTable() {
    try {
      const res = await fetch("http://localhost:3000/inventoryGetTable");
      const data = await res.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchDataInentory();
    fetchWarehouses();
    fetchSuplier();
    fetchInventoryGetTable();
  }, []);
  return (
    <div>
      <div className="update-table-wrapper">
        {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
        {warehouse ? (
          <AccessibleTable
            rows={warehouse.rows}
            collumns={warehouse.colNumaes}
          />
        ) : null}
        {suplier ? (
          <AccessibleTable rows={suplier.rows} collumns={suplier.colNumaes} />
        ) : null}
        {inventory ? (
          <AccessibleTable
            rows={inventory.rows}
            collumns={inventory.colNumaes}
          />
        ) : null}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="wid"
          value={wid}
          onChange={(e) => setWid(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="pid"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="sid"
          value={sid}
          onChange={(e) => setSid(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
