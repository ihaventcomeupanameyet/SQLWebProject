import React from "react";
import "./Auth.css";

export default function () {
  return (
    <div className="LoginWrapper">
      <div className="InnerWrapper">
        <form className="form">
          <h1> SignUp</h1>
          <input name="name" className="UserInput" placeholder="name" />
          <input
            name="street_address"
            className="UserInput"
            placeholder="street_address"
          />
          <input
            name="postal_code"
            className="UserInput"
            placeholder="postal code"
          />
          <input name="City" className="UserInput" placeholder="City" />
          <input
            name="email"
            className="UserInput"
            placeholder="user@email.com"
            type="email"
          />
          <input
            password="password"
            className="UserInput"
            placeholder="******"
            type="password"
          />
          <div id="mainDiv" class="ProvinceDiv">
            <label for="povinces">Province:</label>
            <select id="povinces" name="provincesS">
              <option value="ON">ON</option>
              <option value="QC">QC</option>
              <option value="NS">NS</option>
              <option value="NB">NB</option>
              <option value="MB">MB</option>
              <option value="BC">BC</option>
              <option value="PE">PE</option>
              <option value="SK">SK</option>
              <option value="AB">AB</option>
              <option value="NL">NL</option>
            </select>
          </div>
          <button className="LoginButton"> Register</button>
          <a className="SignUp link" href="/login">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}
