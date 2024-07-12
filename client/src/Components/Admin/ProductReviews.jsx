import React, { useEffect, useState } from "react";
import "./productReview.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllReviews } from "../../actions/productAction";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Rating } from "@mui/material";
import {Link} from "react-router-dom"

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productId, seProductId] = useState("");
  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );

  const deleteHandler = async (reviewId, productId) => {
    try {
      await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
      toast.success(`Review deleted successfully`);
      navigate("/admin/reviews");
    } catch (error) {
      toast.error(error);
    }
  };
  const productReviewSubmitHandler = () => {
    dispatch(getAllReviews(productId));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Reviews - ADMIN`} />
          <div className="dashboard">
            <SideBar />
            <div className="productReviewsContainer">
              <form
                className="productReviewsForm"
                onSubmit={productReviewSubmitHandler}
              >
                <h1 className="productReviewsFormHeading">ALL Reviews</h1>
                <div>
                  <StarIcon />
                  <input
                    type="text"
                    placeholder="Product id"
                    required
                    value={productId}
                    onChange={(e) => seProductId(e.target.value)}
                  />
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                >
                  Search Review
                </Button>
              </form>
              <div className="allorders_container">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div className="order_item" key={review._id}>
                      <div className="productdata">
                        <h3>{review.name}</h3>
                        <p> Comment: {review.comment}</p>
                        <div className="star-reviews">
                          <Rating
                            value={review.rating}
                            precision={0.5}
                            readOnly={true}
                          />
                        </div>
                        <Link
                          onClick={() => deleteHandler(review._id, productId)}
                          style={{ color: "rgb(0, 0, 0, 0.7)" }}
                        >
                          <DeleteIcon />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="productReviewsFormHeading">
                    No Reviews Found
                  </h1>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductReviews;
