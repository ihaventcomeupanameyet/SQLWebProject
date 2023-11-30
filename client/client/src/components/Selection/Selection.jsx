import React, { useEffect, useState } from "react";
import AccessibleTable from "../Table/table";
import "./selection.css";
import { toast } from "react-toastify";

function Selection() {
  const [data, setData] = useState([]);
  const [oid, setOid] = useState("");
  const [cid, setCid] = useState("");
  const [price, setPrice] = useState("");
  const [oidSwitch, setOidSwitch] = useState("AND");
  const [cidSwitch, setCidSwitch] = useState("AND");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          oid,
          cid,
          price,
          oidSwitch,
          cidSwitch,
        }),
      });

      const data = await res.json();
      console.log(data);
      setData(data);
      toast.success("Selection succesful");
    } catch (error) {
      toast.error(error);
      console.error("Error fetching data:", error);
    }
  };

  async function fetchWharehouses() {
    try {
      const res = await fetch("http://localhost:3000/order");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchWharehouses();
  }, []);

  return (
    <div>
      <h1>Slection</h1>
      {data ? (
        <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="input-select-group">
          <input
            type="text"
            placeholder="oid"
            required
            value={oid}
            onChange={(e) => setOid(e.target.value)}
          />
          <select
            value={oidSwitch}
            onChange={(e) => setOidSwitch(e.target.value)}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        <div className="input-select-group">
          <input
            type="text"
            placeholder="cid"
            required
            value={cid}
            onChange={(e) => setCid(e.target.value)}
          />
          <select
            value={cidSwitch}
            onChange={(e) => setCidSwitch(e.target.value)}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Selection;
