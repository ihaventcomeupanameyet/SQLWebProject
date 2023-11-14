import React from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeItem, resetCart } from "../../redux/cartReducer";

export default function Cart({ setShowCart }) {
  const products = useSelector((state) => state.cart.products);
  const token = localStorage.getItem("token");
  const totalPrice = products
    .reduce((accumulator, item) => {
      return item.price * item.quantity + accumulator;
    }, 0)
    .toFixed(2);
  async function sendData(e) {
    e.preventDefault();
    try {
      console.log("before the reponse to the back");
      const reponse = await fetch("http://localhost:3000/addTheOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          products,
          totalPrice,
        }),
      });
      const data = await reponse.json();
      console.log(data);
      if (data.msg) {
        dispatch(resetCart());
        setShowCart(false);
      }
    } catch (error) {
      console.log("Error paying the thing", error);
    }
  }
  const dispatch = useDispatch();
  return (
    <div className="cartWrapper">
      <h1 className="cartTittle">Cart</h1>

      <div className="cartProducts">
        {products?.map((item, state) => (
          <div className="cartProduct" key={state}>
            <img src={item.link} alt={item.name} className="cartProductImg" />
            <div className="detailsWrapper">
              <p>{item.name}</p>
              <span>${item.price}</span>
              <p>Quantity: {item.quantity}</p>
              <FaTrashAlt
                className="icon"
                onClick={() =>
                  dispatch(
                    removeItem({
                      pid: item.pid,
                    })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="cartBottom">
        <p>Total Value</p>
        <span>$ {totalPrice}</span>
        <button onClick={sendData}>PayInFull</button>
      </div>
    </div>
  );
}
