import React from "react";
import "./confirmOrder.css";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router";

const ConfirmOrder = () => {
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

  let navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const placeOrder = async () => {
    try {
      dispatch(createOrder(order));
      toast.success("Your Order has been Placed Successfully");
      localStorage.removeItem("cartItems");
      navigate("/orders");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.grossTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>
                  {user.fname}
                  {user.lname}
                </span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} × ₹{item.price} ={" "}
                      <b>₹ {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal :</p>
                <span>₹ {orderInfo.grossTotal}</span>
              </div>
              <div>
                <p>Shipping Charges :</p>
                <span>₹ {orderInfo.shippingCharges}</span>
              </div>
              <div>
                <p>GST :(18%)</p>
                <span>₹ {orderInfo.tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹ {orderInfo.totalPrice}</span>
            </div>
            <button onClick={placeOrder}>
              Place Order ₹ {orderInfo.totalPrice}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
