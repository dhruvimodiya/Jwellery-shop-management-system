import React from "react";
import "./footer.css";
import playstore from "../../images/playstore.jpg";
import appstore from "../../images/appstore.jpg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="leftfooter">
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS Mobile Devices.</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
      </div>
      <div className="midfooter">
        <h1>jewellery</h1>
        <p>Best Quality is our First Priority.</p>
        <p>Copyrights2023 &copy; </p>
      </div>
      <div className="rightfooter">
        <h4>Follow Us</h4>
        <Link to="https://www.instagram.com/">Instagram</Link>
        <Link to="https://www.twitter.com/">Twitter</Link>
        <Link to="https://www.facebook.com/">Facebook</Link>
      </div>
    </div>
  );
};

export default Footer;
