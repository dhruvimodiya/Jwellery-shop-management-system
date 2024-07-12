import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UserContacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

  const getAllContacts = async () => {
    const contacts = await axios.get(`/api/v1/admin/contacts`);
    setLoading(false);
    setContacts(contacts.data.contacts);
  };
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/contact/${id}`);
      setLoading(false)
       navigate("/admin/contacts");
       toast.success("Contact Deleted Successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Contacts - ADMIN`} />
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Contacts</h1>
              <div className="allorders_container">
                {contacts && contacts.length > 0 ? (
                  contacts.map((item) => (
                    <div className="order_item" key={item._id}>
                      <div className="contactdata">
                        <p>Name : {item.name}</p>
                        <p>Email : {item.email}</p>
                        <p>Phone : {item.phoneNo}</p>
                        <h3>Message : {item.message}</h3>
                      </div>
                      <Link onClick={() => deleteHandler(item._id)}>
                        <DeleteIcon style={{ color: "rgb(0, 0, 0, 0.7)" }} />
                      </Link>
                    </div>
                  ))
                ) : (
                  <h1 className="productReviewsFormHeading">
                    No Contacts Found
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

export default UserContacts;
