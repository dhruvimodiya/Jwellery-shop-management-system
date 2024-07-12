import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import Loader from "../Loader/Loader"

const Dashboard = () => {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    setLoading(false)
  }, [dispatch]);

  let totalAmount = 0;
  orders && orders.forEach((item) => totalAmount += item.totalPrice)
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };
  Chart.register(CategoryScale);

  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <>
    {
      loading ? <Loader/> : (
        <>
        <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹ {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Order</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>User</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
        </>
     )
     } 
    </>
    
  );
};

export default Dashboard;
