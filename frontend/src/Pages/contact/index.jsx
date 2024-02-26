import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./index.css";
import { LiaUserEditSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Mycontact = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);

  //--------------------------------------------------------------------------------------------//

  // get contact api

  const getData = async () => {
    const user = localStorage.getItem("token");
    let userData = JSON.parse(user);
    try {
      const result = await axios.get(
        `http://localhost:8000/api/mycontacts/${userData.user._id}`
      );
      console.log(result);
      // const result = response.json();
      if (result.statusText === "OK") {
        // console.log("dev", result.data.contact);
        setContact(result.data.contact);
      } else {
        console.log("contacts empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  //----------------------------------------------------------------------------------------//

  // delete contact api

  const deleteContact = async (_id) => {
    console.log("sachim");
    try {
      const result = await fetch(`http://localhost:8000/api/delete/${_id}`, {
        method: "DELETE",
      });
      const response = result.json();
      if (response) {
        getData();
        toast.error("delete contact");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  //console.log("////", modelData._id);
  return (
    <Layout>
      <div className="full-div">
        <div className="table-header">
          <h3> All Contacts</h3>
          <div className="btn-box">
            <input type="search" placeholder="search"></input>
            <button>Search</button>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contact?.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.number}</td>
                  <td>{contact.address.Country}</td>
                  <td>{contact.address.State}</td>
                  <td>{contact.address.City}</td>
                  <td>
                    <button
                      className="tab-btn"
                      onClick={() => {
                        deleteContact(contact._id);
                      }}
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/edit/${contact._id}`, { replace: true })
                      }
                    >
                      <LiaUserEditSolid />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
export default Mycontact;
