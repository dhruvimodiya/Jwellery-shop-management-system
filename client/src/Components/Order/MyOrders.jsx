import React, { useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [error, dispatch]);
  return (
    <>
      <MetaData title={`${user.fname} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">{user.fname}'s Orders</Typography>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((item) => (
                  <tr className="orderData" key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.totalPrice}</td>
                    <td>
                      <Link to={`/order/${item._id}`}>View Order</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyOrders;
