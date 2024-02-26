import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <nav className="main-nav">
        <div>
          <h1 className="text">Phone-Book </h1>
        </div>
        <div>
          <ul className="nav-list">
            {user ? (
              <>
                <li>
                  <NavLink className="main-item" to="/home">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="main-item" to="/mycontacts">
                    All Contacts
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <button
                    className="button"
                    onClick={() => {
                      alert("logout");
                      setUser();
                      localStorage.clear();
                      navigate("/signin", { replace: true });
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <NavLink className="main-item" to="/signup">
                    Register
                  </NavLink>
                </li>

                <li>
                  {" "}
                  <NavLink className="main-item" to="/signin">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
