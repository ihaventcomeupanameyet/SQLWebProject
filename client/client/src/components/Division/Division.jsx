import React, { useEffect, useState } from "react";
import "./Division.css";
import AccessibleTable from "../Table/table";


function Division() {
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:3000/purchaseAllItem");
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
    <button type="submit">Find clients who purchase all product</button>
    </form>
   </div>;
}

export default Division;


