import React, { useEffect, useState } from "react";
import "./Aggregation.css";
import AccessibleTable from "../Table/table";
import { toast } from "react-toastify";

function Aggregation() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const onChangeValue = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch(
        `http://localhost:3000/warehouseNetWorth/${value}`
      );
      const data = await reponse.json();
      setData(data);
      toast.success("Agreggation sucessfully executed");
    } catch (error) {
      toast.error(error);
      console.log("Error gettting the data", error);
    }
  };
  return (
    <div>
      <div className="center">
        {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="value"
          className="UserInput"
          placeholder="value"
          value={value}
          onChange={onChangeValue}
        />
        <button type="submit">
          List all warehouse with net worth greater than...
        </button>
      </form>
    </div>
  );
}

export default Aggregation;
