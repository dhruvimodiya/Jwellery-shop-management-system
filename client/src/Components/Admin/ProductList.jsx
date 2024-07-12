import React, { useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import AdminProducts from "./AdminProducts";

const ProductList = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL PRODUCTS - ADMIN`} />
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Products</h1>
              <div className="container">
                {products &&
                  products.map((product) => (
                    <>
                      <AdminProducts product={product} key={product.name} />
                    </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
