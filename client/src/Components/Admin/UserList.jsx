import React, { useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import MetaData from "../MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsers, clearErrors } from "../../actions/userAction";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/user/${id}`);
      toast.success(`User deleted successfully`);
      navigate("/admin/users");
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllUsers());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Users - ADMIN`} />
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Users</h1>
              <div className="allorders_container">
                {users &&
                  users.map((user) => (
                    <div className="order_item" key={user._id}>
                      <div className="productdata">
                        <p>Id : {user._id}</p>
                        <p>
                          Name : {user.fname}
                          {user.lname}
                        </p>
                        <p>Email : {user.email}</p>
                        Role : {""}
                        <span
                          className={
                            user.role === "admin" ? "greenColor" : "redColor"
                          }
                        >
                          {user.role}
                        </span>
                        <div className="admin-option">
                          <Link to={`/admin/user/${user._id}`}>
                            <EditIcon style={{ color: "rgb(0, 0, 0, 0.7)" }} />
                          </Link>
                          <Link onClick={() => deleteHandler(user._id)}>
                            <DeleteIcon
                              style={{ color: "rgb(0, 0, 0, 0.7)" }}
                            />
                          </Link>
                        </div>
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

export default UserList;
