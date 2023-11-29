import React, { useEffect, useState } from "react";
import "./ManagerMainPage.css";
import AccessibleTable from "../../components/Table/table";

export default function ManagerMainPage() {
  const [wid, setwid] = useState("");
  const [pid, setpid] = useState("");
  const [size, setsize] = useState("");


  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const onChangeWid = (event) => {
    setwid(event.target.value);
  };

  const onChangePid = (event) => {
    setpid(event.target.value);
  };
  
  const onChangeSize = (event) => {
    setsize(event.target.value);
  };

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
        <button className="link">
          Delete item
        </button>
        <button className="link">
          Select all order
        </button>
        <button className="link">
          Check item order group by client id
        </button>
        <button className="link">
          Select inventoy with value larger than ...
        </button>
        <button className="link">
          Average number of item purchased by each client
        </button>
        <button className="link">
          List of user purchased all item
        </button>
      </div>
    </div>
  );
}
