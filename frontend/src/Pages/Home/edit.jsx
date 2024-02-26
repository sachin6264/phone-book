import React, { useEffect, useState } from "react";
import { contactSchema } from "./contactschema";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Layout from "../../Components/Layout";

const EditContact = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const { register, setValue, handleSubmit, control } = useForm();
  const { id } = useParams(); // Assuming you have defined id as a route parameter

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getsinglecontact/${id}`
        );
        const data = await response.json();
        console.log("sachin", data);

        setValue("name", data.name);
        setValue("email", data.email);
        setValue("number", data.number);
        setValue("Country", data.address.Country);
        setValue("State", data.address.State);

        setCountry(data.address.Country);
        setState(data.address.State);
        setState(data.address.City);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, [id]);

  const editContact = async (values) => {
    const updatedValue = {
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
    updatedValue.createdBy = userId.user._id;

    try {
      const response = await fetch(
        `http://localhost:8000/api/updatecontact/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValue),
        }
      );

      const result = await response.json();
      if (result) {
        console.log(result);
        alert("Contact updated successfully");
        navigate("/mycontacts", { replace: true });
      } else {
        console.log("Error updating contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <Layout>
      <div className="container  w-50 mt-4">
        <h1 style={{ textAlign: "center" }}>Edit Contact</h1>
        <form onSubmit={handleSubmit(editContact)}>
          <div className="d-flex justify-content-center mt-3">
            <label>Name:-</label>
            <input
              className="contact-input"
              type="text"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <label>Email:-</label>
            <input
              className="contact-input"
              type="email"
              placeholder="Enter your Email"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <label>Numb:-</label>
            <input
              className="contact-input"
              placeholder="Enter your Number"
              {...register("number", { required: "Number is required" })}
            />
          </div>

          <div>
            <Controller
              name="address"
              control={control}
              defaultValue={{ Country: "", State: "", City: "" }}
              render={({ field }) => (
                <div>
                  <div className="d-flex justify-content-center mt-3">
                    <label>Country</label>
                    <select
                      style={{ width: "200px" }}
                      className="select"
                      required
                      {...field.Country}
                      {...register("Country")}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
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
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <label>city</label>
                    <select
                      className="select"
                      style={{ width: "220px" }}
                      required
                      {...field.City}
                      {...register("City")}
                      onChange={(e) => setCity(e.target.value)}
                    >
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
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              border: "none",
              marginLeft: "260px",
              marginTop: "20px",
              width: "140px",
              height: "35px",
              borderRadius: "10px",
            }}
          >
            {" "}
            Update Contact
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditContact;
