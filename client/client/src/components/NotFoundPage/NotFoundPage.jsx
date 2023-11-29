import React from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

const NotFoundPage = () => {
  let navigate = useNavigate();

  return (
    <div className="cancelWrapper">
      <h1>This page doesn't exist</h1>
      <button onClick={() => navigate("/")}>Go to Home Page</button>
    </div>
  );
};

export default NotFoundPage;
