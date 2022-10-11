import React from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const emptyBasket = () => {
    dispatch({ type: "EMPTY_BASKET" });
  };
  return (
    <div className="orders">
      <h4 id="orders__state">Your Order has been placed!</h4>

      <div className="orders__container">
        <div className="orders__title">
          {" "}
          <h1 className="order__heading">Your Orders</h1>
          <div className="orders__price">
            <CurrencyFormat
              renderText={(value) => <h3>Order Total: {value}</h3>}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />{" "}
          </div>{" "}
        </div>

        <div className="orders__order">
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton
            />
          ))}
        </div>
        <div className="orders__continue">
          <Link to="/">
            <button id="orders__button" onClick={emptyBasket}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Orders;
