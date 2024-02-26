import React, { useEffect, useState } from "react";
import { contactSchema } from "./contactschema";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Layout from "../../Components/Layout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

const ContactModel = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const registerContact = async (values) => {
    const newValue = {
      name: values.name,
      email: values.email,
      number: values.number,
      address: {
        Country: values.Country,
        State: values.State,
        City: values.City,
      },
    };

    const userId = JSON.parse(localStorage.getItem("token"));
    newValue.userId = userId.user._id;

    console.log(newValue);

    const response = await fetch(`http://localhost:8000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValue),
    });
    const result = await response.json();
    if (result) {
      console.log(result);
      toast.success("contact create successfully");
      navigate("/mycontacts", { replace: true });
    } else {
      toast.error("user already exits");
    }

    reset();
  };

  return (
    <Layout>
      <div className="w-50 border">
        <h1 className="text-center">Contact Form</h1>
        <form onSubmit={handleSubmit(registerContact)}>
          <div className="w-50 ml-25">
            <label>Name:-</label>
            <input
              className="contact-input"
              type="text"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
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

          <div>
            <label>Email:-</label>
            <input
              className="contact-input"
              type="email"
              placeholder="Enter your Email"
              {...register("email", { required: "Email is required" })}
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
              {errors.number && errors.number.message}
            </span>
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              {...register("number", { required: "Number is required" })}
              error={!!errors.number}
            />
            <span
              style={{
                color: "red",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {errors.number && errors.number.message}
            </span>
          </div>

          <div>
            <Controller
              name="address"
              control={control}
              defaultValue={{ Country: "", State: "", City: "" }}
              render={({ field }) => (
                <div>
                  <div
                    className="d-flex"
                    style={{
                      gap: "10px",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                  >
                    <label>Country</label>
                    <select
                      style={{ width: "200px" }}
                      className="select"
                      required
                      {...field.Country}
                      {...register("Country")}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>

                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      gap: "10px",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                  >
                    <label>State</label>
                    <select
                      className="select"
                      placeholder="country"
                      style={{ width: "220px" }}
                      required
                      {...field.State}
                      {...register("State")}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Select State</option>

                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      gap: "10px",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                  >
                    <label>city</label>
                    <select
                      className="select"
                      style={{ width: "220px" }}
                      required
                      {...field.City}
                      {...register("City")}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>

                      {City &&
                        City.getCitiesOfState(country, state).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}
            />
          </div>
          <div>
            <button
              style={{
                backgroundColor: "blue",
                marginTop: "30px",
                marginLeft: "140px",
                width: "150px",
                height: "40px",
                border: "none",
                outline: "none",
                borderRadius: "10px",
              }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ContactModel;
