import React from "react";
import { addToCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";

import "./card.css";

export default function Card({ itemData }) {
  const dispatch = useDispatch();
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
          <button
            className="MyCurrentButton"
            onClick={() =>
              dispatch(
                addToCart({
                  name: itemData.name,
                  pid: itemData.pid,
                  price: itemData.price,
                  sid: itemData.sid,
                  wid: itemData.wid,
                  link: itemData.link,
                  quantity: 1,
                })
              )
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
