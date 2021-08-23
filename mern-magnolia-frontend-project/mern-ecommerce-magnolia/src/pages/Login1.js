//import and declaration
import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { login } from "../actions/userActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

//Start Login
const Login = ({ location, history }) => {
  // Login Redux codes start here //
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, errorRedux, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      //history.push(redirect)
    }
  }, [userInfo, history, redirect]);
  // Login Redux codes end here //

  const auth = useContext(AuthContext);
  let navigate = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Login Redux codes start here //
    dispatch(login(email, password));
    // Login Redux codes end here //

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

      let data = {
        email: email,
        password: password,
      };

      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post(
          "https://mern-ecommerce-apis.herokuapp.com/api/users/login",
          //  "http://localhost:5000/api/users/login",

          data,
          config
        );

        setIsLoading(false);
        setError(null);
        localStorage.setItem("token", response.data.token);
        let myuser = response.data.name;
        auth.login(myuser, response.data.isAdmin, response.data.token);
        navigate.push("/");
      } catch (err) {
        console.log("error from adnan " + err);
        setIsLoading(false);
        //   setError(err.response.data.errors[0].msg || "something went wrong");
      }
    }
  };

  return (
    <div>
      <div className="adnanLogin">
        <div class="a-divider a-divider-break"></div>

        <form onSubmit={(e) => onSubmit(e)}>
          <h1 className="text-center mb-5 adnanLoginLogInLabel">Sign In</h1>

          <div className="form-group">
            <label className="adnanLoginlabel">Email address</label>
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

          <div className="form-group ">
            <label className="adnanLoginlabel">Password</label>
            <input
              type="password"
              className="form-control adnanLoginInput2"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input "
                id="customCheck1"
              />
              <label
                className="custom-control-label adnanLoginRememberMeAndForgot "
                htmlFor="customCheck1"
              >
                Remember me
              </label>
            </div>
          </div>

          <input
            type="submit"
            className=" btn-block btn-primary adnanLoginSubmit"
            value="Sign In"
          />
          <input
            type="button"
            className=" btn-block btn-primary adnanLoginSubmit"
            onClick={() => setFormData({ name: "", email: "", password: "" })}
            value="Cancel"
          />

          <p className="forgot-password text-right adnanLoginRememberMeAndForgot">
            Forgot <a href="#">password?</a>
          </p>
        </form>
        <br />

        <div class="d-flex ">
          <hr className="my-auto flex-grow-1 " />
          <div className="px-4 adnanLoginRememberMeAndForgot">
            Not Register Yet?
          </div>
          <hr className="my-auto flex-grow-1 " />
        </div>

        <a
          type="submit"
          className=" btn-block btn-primary adnanLoginRegLink"
          href="/register"
        >
          Register
        </a>
      </div>
    </div>
  );
};
export default Login;
