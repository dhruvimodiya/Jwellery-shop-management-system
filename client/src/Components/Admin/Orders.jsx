import React, { useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/productAction";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllOrders } from "../../actions/orderAction";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/order/${id}`);
      toast.success(`Order deleted successfully`);
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
  }, [dispatch, error, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Orders - ADMIN`} />
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Orders</h1>
              <div className="allorders_container">
                {orders &&
                  orders.map((order) => (
                    <div className="order_item" key={order._id}>
                      <h6>Order Id : {order._id}</h6>
                      <p>Quantity : {order.orderItems.length}</p>
                      <p>Amount : {order.totalPrice}</p>
                      <h3>Status: {order.orderStatus}</h3>
                      <div className="admin-option">
                        <Link to={`/admin/order/${order._id}`}>
                          <EditIcon style={{ color: "rgb(0, 0, 0, 0.7)" }} />
                        </Link>
                        <Link onClick={() => deleteHandler(order._id)}>
                          <DeleteIcon style={{ color: "rgb(0, 0, 0, 0.7)" }} />
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
