import React, { useState, useEffect } from "react";
import "./forgotPassword.css";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import axios from "axios";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verify, setVerify] = useState(false);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
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
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
    setOtp("");
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      setEmail("");
    }
  }, [dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2>Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
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
                <div className="otpcontainer">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="number"
                    placeholder="OTP"
                    required
                    name="otp`"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
