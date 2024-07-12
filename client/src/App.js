import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import webFont from "webfontloader";
import Navbar from "./Components/Header/Navbar";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import LoginSignUp from "./Components/User/LoginSignUp";
import Footer from "./Components/Footer/Footer";
import PageNotFound from "./Components/Page404/PageNotFound";
import Search from "./Components/Search/Search";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import ProductDetails from "./Components/Product/ProductDetails";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Cart from "./Components/Cart/Cart";
import MyOrders from "./Components/Order/MyOrders";
import OrderDetails from "./Components/Order/OrderDetails";
import Shipping from "./Components/Cart/Shipping";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./Components/Header/UserOptions";
import { useSelector } from "react-redux";
// Admin Files
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import Orders from "./Components/Admin/Orders";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UserList from "./Components/Admin/UserList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";
import UserContacts from "./Components/Admin/UserContacts";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    // window.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/products/:keyword" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginSignUp />} />

          <Route
            path="/account"
            element={isAuthenticated ? <Profile /> : <LoginSignUp />}
          />
          <Route
            path="/me/update"
            element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}
          />

          <Route
            path="/password/update"
            element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={isAuthenticated ? <Shipping /> : <LoginSignUp />}
          />
          <Route
            path="/orders"
            element={isAuthenticated ? <MyOrders /> : <LoginSignUp />}
          />
          <Route
            path="/order/:id"
            element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />}
          />
          <Route
            path="/order/confirm"
            element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}
          />
          <Route path="*" element={<PageNotFound />} />

          {/* admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <UserList />
              )
            }
          />

          <Route
            path="/admin/products"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <ProductList />
              )
            }
          />

          <Route
            path="/admin/product"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <NewProduct />
              )
            }
          />

          <Route
            path="/admin/product/:id"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <UpdateProduct />
              )
            }
          />

          <Route
            path="/admin/orders"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <Orders />
              )
            }
          />

          <Route
            path="/admin/order/:id"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <ProcessOrder />
              )
            }
          />

          <Route
            path="/admin/user/:id"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <UpdateUser />
              )
            }
          />

          <Route
            path="/admin/reviews"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <ProductReviews />
              )
            }
          />

          <Route
            path="/admin/contacts"
            element={
              loading === false && isAuthenticated && user.role !== "admin" ? (
                <LoginSignUp />
              ) : (
                <UserContacts />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
