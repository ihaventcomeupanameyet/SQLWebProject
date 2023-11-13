import React from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  const products = useSelector((state) => state.cart.products);
  console.log(products);
  const totalPrice = products
    .reduce((accumulator, item) => {
      return item.price * item.quantity + accumulator;
    }, 0)
    .toFixed(2);
  return (
    <div className="cartWrapper">
      <h1 className="cartTittle">Cart</h1>

      <div className="cartProducts">
        {products?.map((item, state) => (
          <div className="cartProduct">
            <img src={item.link} alt={item.name} className="cartProductImg" />
            <div className="detailsWrapper">
              <p>{item.name}</p>
              <span>${item.price}</span>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cartBottom">
        <p>Total Value</p>
        <span>$ {totalPrice}</span>
        <button>PayInFull</button>
      </div>
    </div>
  );
}
