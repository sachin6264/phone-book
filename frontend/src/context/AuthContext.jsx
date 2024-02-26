import { Context, createContext, useEffect, useState } from "react";
import axios from "axios";
import { json, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    userLoggedIn();
  }, []);

  // user loggedin

  const userLoggedIn = async () => {
    let data = localStorage.getItem("token");
    let user = JSON.parse(data);
    try {
      const res = await fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await res.json();
      if (result) {
        navigate("/home", { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // login connection

  const Loginuser = async (userData) => {
    try {
      console.log("userData", userData);
      const response = await axios.post(
        "http://localhost:8000/api/signin",
        userData
      );
      if (response.data.token) {
        const userToken = JSON.stringify(response.data);

        localStorage.setItem("token", userToken);
        // JSON.stringify(localStorage.setItem("user", response.data.user));

        console.log(response);
        setUser(response.data.user);
        alert("login successfully");
        navigate("/home", { replace: true });
      } else {
        alert("invalid email or password");
      }
    } catch (error) {
      console.log({ message: error });
    }
  };

  //console.log("adsdfs", user);

  // Register connection

  const Registeruser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        userData
      );
      if (response.data.error) {
        alert("email already exit");
        navigate("/signup", { replace: true });
      } else {
        alert("register successfully! please login");
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.log({ message: error });
    }
  };

  // post contact

  return (
    <AuthContext.Provider
      value={{ Loginuser, Registeruser, user, setUser, userLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
