//import and declaration
import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import AuthContext from "../contexts/AuthContext";
//start register
const Register = () => {
  //start state and context
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useHistory();
  const auth = useContext(AuthContext);
  //form variables
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //get variables from form
  const { name, email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

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
    };
    try {
      const response = await axios.post(
        //"http://localhost:5000/api/users",

        "https://mern-ecommerce-apis.herokuapp.com/api/users",

        data,
        config
      );
      localStorage.setItem("token", response.data.token);
      let decodeddata = decode(response.data.token);
      console.log(decodeddata);
      const response1 = await axios.post(
        "https://mern-ecommerce-apis.herokuapp.com/api/users/login",
        //  "http://localhost:5000/api/users/login",

        data,
        config
      );
        setIsLoading(false);
      //  setError(null);
      localStorage.setItem("token", response.data.token);

      let myuser = response.data.name;
      auth.login(myuser, response.data.isAdmin);
      //navigate to root
      navigate.push("/");
    } catch (e) {
      console.log("error ", e);
    }
    }
  };

  return (
    <div class="adnanLogin">
      <h2>Sign Up</h2>
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
          value="Sign Up"
        />

        <input
          type="button"
          className=" btn-block btn-primary adnanLoginSubmit"
          onClick={() => setFormData({ name: "", email: "", password: "" })}
          value="Cancel"
        />
      </form>
    </div>
  );
};
export default Register;
