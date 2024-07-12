import React, { useState } from "react";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggle = () => {
    setShowMenu(false);
  };
  return (
    <>
      <div className="d-flex navbar jcsb">
        <div className="logo">
          <h3>Jewellery </h3>
        </div>
        <nav>
          <ul
            className={`menu-list d-flex nav__links ${showMenu ? "show" : ""}`}
            onClick={toggleMenu}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <Link to="/search">
              <i className="search1 fa-solid fa-magnifying-glass"></i>
            </Link>
            <Link to="/cart">
              <i className="cart1 fa-solid fa-cart-plus"></i>
            </Link>
            <Link to="/login">
              <i className="account1 fa-regular fa-user"></i>
            </Link>
          </ul>
        </nav>
        <div className="icon d-flex">
          <Link to="/search" onClick={toggle}>
            <i className="search fa-solid fa-magnifying-glass"></i>
          </Link>
          <Link to="/cart" onClick={toggle}>
            <i className="cart fa-solid fa-cart-plus"></i>
          </Link>
          <Link to="/login" onClick={toggle}>
            <i className="account fa-regular fa-user"></i>
          </Link>
          <div className="menu-icon" onClick={toggleMenu}>
            <i className="ham fa fa-bars"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
