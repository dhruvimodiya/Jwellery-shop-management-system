import React, { useRef, useState, useEffect } from "react";
import "./loginSignup.css";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

function LoginSignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verify, setVerify] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    gender: "",
    mobilenumber: "",
    pincode: "",
    password: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const {
    fname,
    lname,
    email,
    otp,
    address,
    gender,
    mobilenumber,
    pincode,
    password,
  } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const handleSendOtp = async () => {
    try {
      const response = await axios.post("/api/v1/register/sendotp", {
        email: email,
      });

      if (response.status === 200) {
        setIsOtpSent(true);
        toast.success("OTP Sent Successfully");
      } else {
        // Handle error, e.g., show an error message
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.log("API call failed", error);
    }
  };

  const handleVerifyOtp = () => {
    toast.success("OTP verified. Proceed with registration.");
    setVerify(true);
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("fname", fname);
    myForm.set("lname", lname);
    myForm.set("email", email);
    myForm.set("address", address);
    myForm.set("gender", gender);
    myForm.set("mobilenumber", mobilenumber);
    myForm.set("otp", otp);
    myForm.set("pincode", pincode);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
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
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login --jewellery" />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="fname"
                    value={fname}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lname"
                    value={lname}
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="signUpotp">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="number"
                    placeholder="OTP"
                    required
                    name="otp`"
                    value={otp}
                    onChange={registerDataChange}
                  />
                  {isOtpSent ? (
                    <button
                      type="button"
                      className="otpbutton"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="otpbutton"
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </button>
                  )}
                </div>
                <div className="input-group">
                  <select
                    name="gender"
                    value={gender}
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
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
                  <p> File</p>
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginSignUp;
