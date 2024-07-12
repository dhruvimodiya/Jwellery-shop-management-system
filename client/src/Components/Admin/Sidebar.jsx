import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="logo">
        <h1>Jewellery</h1>
      </NavLink>
      <NavLink to="/admin/dashboard">
        <p>
          <DashboardIcon />
          Dashboard
        </p>
      </NavLink>
      <NavLink to="/admin/products">
        <p>
          <PostAddIcon />
          Products
        </p>
      </NavLink>
      <NavLink to="/admin/product">
        <p>
          <AddIcon />
          Create Products
        </p>
      </NavLink>
      <NavLink to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </NavLink>
      <NavLink to="/admin/users">
        <p>
          <PeopleIcon />
          Users
        </p>
      </NavLink>
      <NavLink to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </NavLink>
      <NavLink to="/admin/contacts">
        <p>
          <ContactSupportIcon />
          Contacts
        </p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
