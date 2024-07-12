import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import "./adminProducts.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProducts = ({ product }) => {
    const navigate = useNavigate();
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/product/${id}`);
      toast.success(`Product deleted successfully`);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Link className="productCardAdmin" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div className="star-reviews">
          <Rating {...options} />
        </div>
        <p>Stock : {product.Stock}</p>
        <span>({product.numOfReviews} Reviews)</span>
        <span>{`₹${product.price}`}</span>
        <div className="admin-option">
          <Link to={`/admin/product/${product._id}`}>
            <EditIcon style={{color:"rgb(0, 0, 0, 0.7)"}}/>
          </Link>
          <Link onClick={() => deleteHandler(product._id)}>
            <DeleteIcon style={{color:"rgb(0, 0, 0, 0.7)"}}/>
          </Link>
        </div>
      </Link>
    </>
  );
};

export default AdminProducts;
