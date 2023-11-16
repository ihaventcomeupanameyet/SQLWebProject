import React, { useState } from "react";
import "./Auth.css";

export default function () {
  const [email,setEmail]=useState("");
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const [city,setCity]=useState("");
  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  const [name,setName]=useState("");
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const [street_address,SetStreet_address]=useState("");
  const onChangeSaddress = (event) => {
    SetStreet_address(event.target.value);
  };
  const [postal_code,setPostal_code]=useState("");
  const onChangePC = (event) => {
    setPostal_code(event.target.value);
  };
  const [province,setProvince]=useState("");
  const onChangeProvince = (event) => {
    setProvince(event.target.value);
  };
  const [psword,setPsword]=useState("");
  const onChangePsword = (event) => {
    setPsword(event.target.value);
  };

  async function sendData(e) {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:3000/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          street_address,
          postal_code,
          email,
          city,
          province,
          psword,
        }),
      });
    } catch (error) {
      console.log("Error inserting data", error);
    }
  }
  return (
    <div className="LoginWrapper">
      <div className="InnerWrapper">
        <form className="form" onSubmit={sendData}>
          <h1> SignUp</h1>
          <input name="name" className="UserInput" placeholder="name" value={name} onChange={onChangeName}/>
          <input
            name="street_address"
            className="UserInput"
            placeholder="street_address"
            value={street_address}
            onChange={onChangeSaddress}
          />
          <input
            name="postal_code"
            className="UserInput"
            placeholder="postal code"
            value={postal_code}
            onChange={onChangePC}
          />
          <input name="City" className="UserInput" placeholder="City" value={city} onChange={onChangeCity} />
          <input
            name="email"
            className="UserInput"
            value={email}
            onChange={onChangeEmail}
            placeholder="user@email.com"
            type="email"
          />
          <input
            password="password"
            className="UserInput"
            placeholder="******"
            value={psword}
            onChange={onChangePsword}
            type="password"
          />
          <div id="mainDiv" class="ProvinceDiv">
            <label for="povinces">Province:</label>
            <select id="povinces" name="provincesS" value={province} onChange={onChangeProvince}>
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
          <button className="LoginButton" type="submit"> Register</button>
          <a className="SignUp link" href="/login">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}
