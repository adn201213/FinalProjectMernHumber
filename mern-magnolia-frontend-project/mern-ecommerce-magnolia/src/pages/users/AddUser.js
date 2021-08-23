//import and declaration
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
//Start Add User
const AddUser = () => {
  //state and context
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [id1, setId1] = useState("");
  //form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: "",
  });
  let navigate = useHistory();
  // get values from the form
  const { name, email, password, isAdmin } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    //validation
    //validation
    let formValid = true;
    let emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email == "") {
      formValid = false;
      setEmailError("Please enter email");
      console.log(emailError);
    } else if (!email.match(emailPattern)) {
      formValid = false;
      setEmailError("Please enter email in valid format");
      console.log(emailError);
    } else {
      formValid = true;
      setEmailError("");
    }
    if (formValid) {
      setIsLoading(true);
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let data = {
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin,
      };
      try {
        const response = await axios.post(
          //"http://localhost:5000/api/users",
          "https://mern-ecommerce-apis.herokuapp.com/api/users",
          data,
          config
        );
        setIsLoading(false);
        localStorage.setItem("token", response.data.token);
        setId1(response.data._id);
        let decodeddata = decode(response.data.token);
        console.log(decodeddata);
        navigate.push("/users");
      } catch (e) {
        console.log("error ", e);
      }
    }
  };
  //naviagte to user List
  const navigateToUsers = () => {
    navigate.push("/users");
  };

  return (
    <div class="registration">
      <h2>Add user</h2>
      <br />

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="adnanLoginlabel"> Username</label>
          <input
            type="text"
            className="form-control adnanLoginInput1"
            placeholder="Enter Username"
            name="name"
            value={name}
            onChange={onChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        <div className="form-group">
          <label className="adnanLoginlabel">Email</label>
          <input
            type="text"
            className="form-control adnanLoginInput1"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        <div className="form-group">
          <label className="adnanLoginlabel">password</label>
          <input
            type="text"
            className="form-control adnanLoginInput1"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        <input
          type="submit"
          className=" btn-block btn-primary adnanLoginSubmit"
          value="Add User"
        />

        <input
          type="button"
          className=" btn-block btn-primary adnanLoginSubmit"
          onClick={() => setFormData({ name: "", email: "", password: "" })}
          value="Cancel"
        />

        <button
          type="button"
          className="btn btn-primary adnanLoginSubmit"
          onClick={navigateToUsers}
        >
          Back TO List
        </button>
      </form>
    </div>
  );
};
export default AddUser;
