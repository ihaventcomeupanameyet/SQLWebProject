import React, { useState, useEffect } from "react";
import "./Auth.css";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChnagePassword = (event) => {
    setPassword(event.target.value);
  };
  async function sendData(e) {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:3000/loginCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await reponse.json();

      if (data.user) {
        localStorage.setItem("token", data.user);
        window.location.href = "/";
      }

      console.log(data);
    } catch (error) {
      console.log("Error gettting the data", error);
    }
  }

  return (
    <div className="LoginWrapper">
      <div className="InnerWrapper">
        <form className="form" onSubmit={sendData}>
          <h1> Login</h1>
          <input
            className="UserInput"
            value={email}
            onChange={onChangeEmail}
            placeholder="user@email.com"
            type="email"
          />
          <input
            className="UserInput"
            placeholder="******"
            value={password}
            onChange={onChnagePassword}
            type="password"
          />
          <button type="submit" className="LoginButton">
            {" "}
            Login
          </button>
          <a className="fogetPassword link" href="#">
            Forgot Password
          </a>
          <a className="SignUp link" href="/signup">
            SingUp
          </a>
        </form>
      </div>
    </div>
  );
}
