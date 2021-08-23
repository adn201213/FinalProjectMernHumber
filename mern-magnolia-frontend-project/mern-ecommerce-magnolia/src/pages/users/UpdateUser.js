//import and declaration
import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
//start Update
const UpdateUser = (props) => {
  //context and state
  const initialUserListState = {
    _id: "",
    name: "",
    email: "",
    isAdmin: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUserListState);
  const [message, setMessage] = useState("");
  let navigate = useHistory();

  const auth = useContext(AuthContext);
  //get user
  const getUser = (id) => {
    //   let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDQ4MjM3ZjFlNzNlM2I5Y2I5NTZhNyIsImlhdCI6MTYyODAxNzU4NiwiZXhwIjoxNjMwNjA5NTg2fQ.vpPSyYWR_nMTeRhgRF_DYi05yS5DzgKpLcKF3nemzko";

    let config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
        Authorization: "Bearer " + auth.token1,
      },
    };
    axios
      .get("https://mern-ecommerce-apis.herokuapp.com/api/users/" + id, config)
      .then((response) => {
        setCurrentUser(response.data);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };
  //Update User
  const updateUser = () => {
    let data = currentUser;
    // let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDQ4MjM3ZjFlNzNlM2I5Y2I5NTZhNyIsImlhdCI6MTYyODAxNzU4NiwiZXhwIjoxNjMwNjA5NTg2fQ.vpPSyYWR_nMTeRhgRF_DYi05yS5DzgKpLcKF3nemzko";

    let config = {
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
        Authorization: "Bearer " + auth.token1,
      },
    };

    axios
      .put(
        "https://mern-ecommerce-apis.herokuapp.com/api/users/" +
          props.match.params.id,
        data,
        config
      )

      .then((response) => {
        console.log(response.data);

        setMessage("The tutorial was updated successfully!");
        navigate.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //navaiagte to user list
  const navigateToUsers = () => {
    navigate.push("/users");
  };
  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <center>
            <h1>Update User</h1>
          </center>
          <form>
            <div className="form-group">
              <label style={{ fontWeight: "bold" }} htmlFor="id">
                Id
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={currentUser._id}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="form-group">
              <label style={{ fontWeight: "bold" }} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="form-group">
              <label style={{ fontWeight: "bold" }} htmlFor="email">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label style={{ fontWeight: "bold" }} htmlFor="isAdmin">
                IsAdmin
              </label>
              <input
                type="text"
                className="form-control"
                id="isAdmin"
                name="isAdmin"
                value={currentUser.isAdmin}
                onChange={handleInputChange}
              />
            </div>

            <br />
          </form>
          <button
            style={{ marginRight: "380px" }}
            type="submit"
            className="btn btn-success"
            onClick={updateUser}
          >
            Update User
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={navigateToUsers}
          >
            Back TO List
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
