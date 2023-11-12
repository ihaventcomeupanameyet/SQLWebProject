import React from "react";
import "./card.css";

export default function Card({ itemData }) {
  return (
    <div>
      <div className="Wrapper">
        <div className="Inner">
          <img src={itemData.link} alt="dowjaodj" />
          <h1 className="MainTitle">{itemData.name}</h1>
          <div className="WrapperOfExtraThingie">
            <div className="ExtraInfo">
              <p>Wharehouse: {itemData.wid}</p>
              <p>Supplier: {itemData.sid}</p>
            </div>
            <p>${itemData.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
