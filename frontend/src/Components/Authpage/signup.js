import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "./loginsignup";
import "./auth.css";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import AuthContext from "../../context/AuthContext";

//import Loginuser from "../../context/AuthContext";

const Signup = () => {
  const { Registeruser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignupSchema) });

  const registerUser = (values) => {
    setData(values);
    Registeruser(values);
    reset();
  };

  return (
    <Layout>
      <div className="body">
        <div className="wrapper">
          <form onSubmit={handleSubmit(registerUser)}>
            <h1>Sign In</h1>
            <div className="input-box">
              <i class="bi bi-person"></i>
              <input
                className=""
                type="name"
                placeholder=" name"
                {...register("name", {
                  required: { value: true, message: "feild is required" },
                })}
                error={!!errors.name}
              />

              <span
                style={{
                  color: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {errors.name && errors.name.message}
              </span>
            </div>

            <div className="input-box">
              <i class="bi bi-envelope"></i>
              <input
                className=""
                type="email"
                placeholder="email address"
                {...register("email", {
                  required: { value: true, message: "field is required" },
                })}
                error={!!errors.email}
              />

              <span
                style={{
                  color: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {errors.email && errors.email.message}
              </span>
            </div>

            {/* <div className="input-box">
          <input
            className=""
            type="text"
            placeholder="role"
            {...register("role", {
              required: { value: true, message: "feild is required" },
            })}
            //   error={!!errors.role}
          />
          {/* <span >
                {errors.role && errors.role.message}
              </span> 
        </div> */}
            <div className="input-box">
              <i class="bi bi-lock"></i>
              <input
                className=""
                type="password"
                placeholder="password"
                {...register("password", {
                  required: { value: true, message: "feild is required" },
                })}
                error={!!errors.password}
              />

              <span
                style={{
                  color: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="remember">
              <label>
                {" "}
                <input type="checkbox" /> Remember me{" "}
              </label>
            </div>
            <div>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>

            <div className="login-link">
              <p>
                Already have account:<Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
