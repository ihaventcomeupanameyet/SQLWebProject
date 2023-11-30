import React, { useEffect, useState } from "react";
import "./ManagerMainPage.css";
import AccessibleTable from "../../components/Table/table";

export default function ManagerMainPage() {
  const [wid, setwid] = useState("");
  const [pid, setpid] = useState("");
  const [size, setsize] = useState("");
  const [d_pid, set_dpid] = useState("");
  const [value, setValue] = useState("");

  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const [valueThreshold, setValueThreshold] = useState("");

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

  async function netWorth(event) {
    try {
      const reponse = await fetch(
        `http://localhost:3000/warehouseNetWorth/${value}`
      );
      const data = await reponse.json();
      setData(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function joinOrder(event) {
    try {
      const reponse = await fetch("http://localhost:3000/joinOrder");
      const data = await reponse.json();
      setData(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function purchaseAll(event) {
    try {
      const reponse = await fetch("http://localhost:3000/purchaseAllItem");
      const data = await reponse.json();
      setData(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function avgItemPerOrder(event) {
    try {
      const reponse = await fetch("http://localhost:3000/AvgOrderPerchase");
      const data = await reponse.json();
      setData(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function displayItem(event) {
    try {
      const res = await fetch("http://localhost:3000/product");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function UpdateInven(e) {
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
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function deleteProduct(e) {
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
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  async function getInventoryAbove() {
    if (!valueThreshold) {
      alert("Please enter a value threshold");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/inventoryAbove/${valueThreshold}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching inventory", error);
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
      <div>
        {data ? (
          <AccessibleTable rows={data.rows} collumns={data.colNumaes} />
        ) : null}
        <form onSubmit={UpdateInven}>
          <button className="link" type="submit">
            Update inventory
          </button>
          <input
            className="UserInput"
            placeholder="wid"
            value={wid}
            onChange={onChangeWid}
          />

          <input
            className="UserInput"
            placeholder="pid"
            value={pid}
            onChange={onChangePid}
          />

          <input
            className="UserInput"
            placeholder="New size"
            value={size}
            onChange={onChangeSize}
          />
        </form>
        <button className="link">Delete item</button>

        <button className="link" onClick={joinOrder}>
          Join Orders
        </button>

        <button className="link" onClick={avgItemPerOrder}>
          get average Items in order
        </button>

        <input
          className="UserInput"
          placeholder="Enter Client ID"
          //value={inputCID}
          onChange={(e) => setInputCID(e.target.value)}
        />
        <input
          className="UserInput"
          placeholder="Enter value threshold"
          value={valueThreshold}
          onChange={(e) => setValueThreshold(e.target.value)}
        />
        <button className="link" onClick={getInventoryAbove}>
          Select inventory with value larger than...
        </button>

        <button className="link" onClick={netWorth}>
          netWorth
        </button>

        <button className="link" onClick={purchaseAll}>
          List of user purchased all item
        </button>
      </div>
    </div>
  );
}
