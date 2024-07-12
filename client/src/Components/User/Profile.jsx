import React, { useEffect } from "react";
import MetaData from "../MetaData";
import "./profile.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  let navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.fname} ${user.lname}'s Profile`} />
          <div className="profileContainer">
            <div className="first_div">
              <h1>My Profile</h1>
              <img
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt={user.fname}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div className="second_div">
              <div>
                <h4>Full Name</h4>
                <p>
                  {user.fname} {user.lname}
                </p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div className="other_links">
                {/* <Link to="/orders">My Orders</Link> */}
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
