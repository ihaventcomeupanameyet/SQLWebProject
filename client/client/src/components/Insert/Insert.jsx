import React, { useEffect, useState } from "react";
import "./Insert";
import AccessibleTable from "../Table/table";
import { toast } from "react-toastify";

function Insert() {
  const [data, setData] = useState([]);
  const [wid, setWid] = useState("");
  const [adress, setAdress] = useState("");
  const [mid, setMid] = useState("");
  const [flag, setFlag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/insertThingy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          wid,
          adress,
          mid,
          flag,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        fetchWharehouses();
      }
      toast.success("Insert succsess");
    } catch (error) {
      toast.error(error);
      console.error("Error fetching data:", error);
    }
  };

  async function fetchWharehouses() {
    try {
      const res = await fetch("http://localhost:3000/wharehouses");
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
      <h1>test</h1>
      {data ? (
        <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="wid"
          required
          value={wid}
          onChange={(e) => setWid(e.target.value)}
        />
        <input
          type="text"
          placeholder="adress"
          required
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
        <input
          type="text"
          placeholder="mid"
          required
          value={mid}
          onChange={(e) => setMid(e.target.value)}
        />
        <input
          type="text"
          placeholder="flag"
          required
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Insert;
