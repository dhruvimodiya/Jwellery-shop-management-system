import React, { useEffect, useState } from "react";
import Metadata from "../MetaData";
import "./contact.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, contactForm } from "../../actions/userAction";
import Loader from "../Loader/Loader";

const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });
  const { name, email, phoneNo, message } = user;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.contact);
  const SubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phoneNo", phoneNo);
    myForm.set("message", message);

    dispatch(contactForm(myForm));
  };
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Message sent Successfully");
      navigate("/");
    }
  }, [dispatch, error, navigate, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="contactformContainer">
          <Metadata title="Contact Page" />
          <div className="contactform">
            <form onSubmit={SubmitHandler} className="form">
              <h1>Contact Here</h1>
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Name"
                onChange={registerDataChange}
                required
              />
              <input
                type="email"
                value={email}
                name="email"
                placeholder="example@gmail.com"
                onChange={registerDataChange}
                required
              />
              <input
                type="number"
                value={phoneNo}
                name="phoneNo"
                placeholder="Phone No."
                onChange={registerDataChange}
                required
              />
              <textarea
                rows="10"
                color="30"
                type="text"
                value={message}
                name="message"
                placeholder="Message"
                onChange={registerDataChange}
                required
              />
              <button>Send Message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
