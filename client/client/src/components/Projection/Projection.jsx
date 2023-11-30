import React, { useEffect, useState } from "react";

import "./Projection.css";
import AccessibleTable from "../Table/table";
import { toast } from "react-toastify";

function Projection() {
  const [data, setData] = useState([]);
  const [coll, setCol] = useState("");
  const [table, setTable] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/proyection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          coll,
          name: table,
        }),
      });

      if (res.status === 200) {
        clear();
      }
      const data = await res.json();
      console.log(data);
      setData(data);
      toast.success("Projection succesful");
    } catch (error) {
      toast.success(error);
      console.error("Error fetching data:", error);
    }
  };

  const clear = () => {
    setCol("");
    setTable("");
  };
  return (
    <div>
      {data ? (
        <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
      ) : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="col"
          required
          value={coll}
          onChange={(e) => setCol(e.target.value)}
        />
        <input
          type="text"
          placeholder="table"
          required
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Projection;
