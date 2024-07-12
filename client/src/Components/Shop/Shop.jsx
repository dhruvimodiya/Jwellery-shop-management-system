import React, { useEffect, useState } from "react";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import "./shop.css";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import MetaData from "../MetaData";

const categories = ["Woman", "Men"];

const Shop = () => {
  const dispatch = useDispatch(1);

  const [currentPage, setCurrentPage] = useState();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { loading, error, products, productsCount, resultPerPage } =
    // filtereddProductsCount
    useSelector((state) => state.products);

  const params = useParams();
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  // let count = filteredProductsCount;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products --Jewellery" />
          <h2 className="productHeading">Products</h2>
          <div className="shop_content">
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                min={0}
                max={25000}
              />

              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <Typography component="legend">Ratings Above</Typography>

              <select
                value={ratings}
                onChange={(e) => {
                  const newRating = e.target.value;
                  setRatings(newRating);
                }}
              >
                <option value="">Choose Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          {resultPerPage < productsCount && (
            // count
            // productsCount
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Shop;
