import React from "react";
import "./Auth.css";

export default function () {
  return (
    <div className="LoginWrapper">
      <div className="InnerWrapper">
        <form className="form">
          <h1> Login</h1>
          <input
            className="UserInput"
            placeholder="user@email.com"
            type="email"
          />
          <input className="UserInput" placeholder="******" type="password" />
          <button className="LoginButton"> Login</button>
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
