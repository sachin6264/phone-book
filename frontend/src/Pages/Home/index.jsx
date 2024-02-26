import { NavLink } from "react-router-dom";
import Layout from "../../Components/Layout";
import AuthContext from "../../context/AuthContext";
import "./index.css";

import React, { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="welcome">
          <h1>Contact save</h1>
          <h2>{user && user?.name}.......</h2>
          <button className="wel-btn">
            <NavLink to="/create-contact"> Add Contact</NavLink>
          </button>
        </div>
        <div className="wel-img">
          <img src="https://img.freepik.com/free-vector/customer-support-illustration_23-2148885963.jpg?size=626&ext=jpg" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
