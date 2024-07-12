import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "./home.css";
import MetaData from "../MetaData";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="ECOMMERCE" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="welcomeHeading">Welcome To The Jewellery</h1>
          <div className="services">
            <div className="service">
              <div className="delhivery-data services_items">
                <i className="fa-solid fa-truck"></i>
                <h5>Fast Delhivery</h5>
              </div>
            </div>
            <div className="easy_return service">
              <div className="services_items">
                <i className="fa fa-undo"></i>
                <h5>Easy Returns</h5>
              </div>
            </div>
            <div className="support service">
              <div className="services_items">
                <i className="fa-solid fa-headset"></i>
                <h5>24 X 7 Support</h5>
              </div>
            </div>
          </div>
          <div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard product={product} key={product.name} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
