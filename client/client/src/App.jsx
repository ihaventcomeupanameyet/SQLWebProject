import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SingUp from "./pages/Auth/SingUp";
import Home from "./pages/Home/Home";
import ManagerMainPage from "./pages/ManagerMainPage/ManagerMainPage";
import { ProtectedRoute } from "./components/PrivateRoutes/privateroutes";
import Navbar from "./components/Navbar/Navbar";
import NavbarM from "./components/ManagerNavbar/Navbar";
import Delete from "./components/Delete/Delete";
import Insert from "./components/Insert/Insert";
import Update from "./components/Update/Update";
import Selection from "./components/Selection/Selection";
import Projection from "./components/Projection/Projection";
import Join from "./components/Join/Join";
import Aggregation from "./components/Aggregation/Aggregation";
import AggregationH from "./components/AggregationH/AggregationH";
import NestedAG from "./components/NestedAG/NestedAG";
import Division from "./components/Division/Division";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };
  const ManagerLayout = () => {
    return (
      <ProtectedRoute>
        <div className="app">
          <NavbarM />
          <Outlet />
        </div>
      </ProtectedRoute>
    );
  };
  const Router = createBrowserRouter([
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "/manager",
      element: <ManagerLayout />,
      children: [
        {
          path: "",
          element: <ManagerMainPage />,
        },
        {
          path: "delete",
          element: <Delete />,
        },
        {
          path: "insert",
          element: <Insert />,
        },
        {
          path: "update",
          element: <Update />,
        },
        {
          path: "selection",
          element: <Selection />,
        },
        {
          path: "projection",
          element: <Projection />,
        },
        {
          path: "join",
          element: <Join />,
        },
        {
          path: "aggregation",
          element: <Aggregation />,
        },
        {
          path: "aggregationH",
          element: <AggregationH />,
        },
        {
          path: "nestedAggregation",
          element: <NestedAG />,
        },
        {
          path: "division",
          element: <Division />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SingUp />,
    },
  ]);

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

  return <RouterProvider router={Router} />;
}

export default App;
