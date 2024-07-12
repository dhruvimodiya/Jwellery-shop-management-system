import React, { useState, useEffect } from "react";
import "./updateProfile.css";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("fname", fname);
    myForm.set("lname", lname);
    myForm.set("email", email);
    myForm.set("address", address);
    myForm.set("gender", gender);
    myForm.set("mobilenumber", mobilenumber);
    myForm.set("pincode", pincode);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
    navigate(`/account`);
    toast.success("Profile Updated Successfully");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setEmail(user.email);
      setAddress(user.address);
      setGender(user.gender);
      setPincode(user.pincode);
      setMobilenumber(user.mobilenumber);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate(`/account`);
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, user, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="signUpName">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <textarea
                    type="text"
                    name="address"
                    cols="10"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required
                  />
                </div>

                <div className="input-group">
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="tel"
                    name="mobilenumber"
                    value={mobilenumber}
                    onChange={(e) => setMobilenumber(e.target.value)}
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="number"
                    placeholder="pincode"
                    required
                    name="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  <p>File</p>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                  // disabled = {loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
