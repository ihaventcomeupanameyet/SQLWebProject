import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SingUp from "./pages/Auth/SingUp";
import Home from "./pages/Home/Home";
import ManagerMainPage from "./pages/ManagerMainPage/ManagerMainPage";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: "hey" }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/ManagerMainPage" element={<ManagerMainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
