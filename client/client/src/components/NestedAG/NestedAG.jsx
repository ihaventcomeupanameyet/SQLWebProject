import React, { useEffect, useState } from "react";
import "./NestedAG.css";
import AccessibleTable from "../Table/table";

export default function NestedAG() {
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:3000/AvgOrderPerchase");
      const data = await reponse.json();
      setData(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }
  return <div>
    <div className="center"> 
    {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
      </div>
    <form onSubmit={handleSubmit}>
    <button type="submit">Find average number of item purchased per order for each client</button>
    </form>
   </div>;
}
