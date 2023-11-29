import React, { useEffect, useState } from "react";
import "./ManagerMainPage.css";
import AccessibleTable from "../../components/Table/table";

export default function ManagerMainPage() {
  const [wid, setwid] = useState("");
  const [pid, setpid] = useState("");
  const [size, setsize] = useState("");
  const [d_pid,set_dpid] = useState("");
  const [value,setValue] = useState("");

  const [data, setData] = useState([]);
  const [user, setUser] = useState("");


  const onChangedpid = (event) => {
    set_dpid(event.target.value);
  };

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  const onChangeWid = (event) => {
    setwid(event.target.value);
  };

  const onChangePid = (event) => {
    setpid(event.target.value);
  };
  
  const onChangeSize = (event) => {
    setsize(event.target.value);
  };

  async function netWorth(event){
    try {
      const reponse = await fetch(`http://localhost:3000/warehouseNetWorth/${value}`);
      const data = await reponse.json();
      setData(data);
    } catch (error){
    console.log("Error gettting the data", error);
    }
  }

  async function joinOrder(event){
    try {
      const reponse = await fetch("http://localhost:3000/joinOrder");
      const data = await reponse.json();
      setData(data);
    } catch (error){
    console.log("Error gettting the data", error);
    }
  }

  async function purchaseAll(event){
    try {
      const reponse = await fetch("http://localhost:3000/purchaseAllItem");
      const data = await reponse.json();
      setData(data);
    } catch (error){
      console.log("Error gettting the data", error);
    }
  }

  async function avgItemPerOrder(event){
    try {
      const reponse = await fetch("http://localhost:3000/AvgOrderPerchase");
      const data = await reponse.json();
      setData(data);
    } catch (error){
      console.log("Error gettting the data", error);
    }
  }

  async function displayItem(event){
    try {
      const res = await fetch("http://localhost:3000/product");
      const data = await res.json();
      setData(data);
    } catch (error){
      console.log("Error gettting the data", error);
    }
  }

  async function UpdateInven(e){
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:3000/updateInven", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wid,
          pid,
          size,
        }),
      });
      const res = await fetch("http://localhost:3000/getGivenQuery");
      const data = await res.json();
      setData(data);
    } catch (error){
      console.log("Error gettting the data", error);
    }
  }

  async function deleteProduct(e){
    try {
      const reponse = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          d_pid,
        }),
      });
    } catch (error){
      console.log("Error gettting the data", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/getGivenQuery");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);



  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, []);

  return (
    <div className="NewClass">
      <nav>
        <Menu:c></Menu:c>
      </nav>
      <div>
        {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
        <form onSubmit={UpdateInven}>

        <button className="link" type="submit">
          Update inventory
        </button>
        <input
            name="wid"
            className="UserInput"
            placeholder="wid"
            value={wid}
            onChange={onChangeWid}
        />
            
        <input
            name="pid"
            className="UserInput"
            placeholder="pid"
            value={pid}
            onChange={onChangePid}
        />

        <input
            name="size"
            className="UserInput"
            placeholder="New size"
            value={size}
            onChange={onChangeSize}
        />
        </form>

        <button className="link" onClick={deleteProduct}>
          Delete item
        </button>
        <input
            name="d_pid"
            className="UserInput"
            placeholder="product id"
            value={d_pid}
            onChange={onChangedpid}
        />
        <button className="link" onClick={displayItem}>
          Display Product
        </button>
        <button className="link" onClick={joinOrder}>
          Join orders
        </button>
        <button className="link" onClick={netWorth}>
          Warehouse with net value greater than:
        </button>
        <input
            name="value"
            className="UserInput"
            placeholder="value"
            value={value}
            onChange={onChangeValue}
        />
        <button className="link" onClick={avgItemPerOrder}>
          Average number of item purchased by each client
        </button>
        <button className="link" onClick={purchaseAll}>
          List of user purchased all item
        </button>
      </div>
    </div>
  );
}
