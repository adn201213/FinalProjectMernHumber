import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Image from "react-bootstrap/Image";
import logo from "../img/logo3.png";
import cart from "../img/cart1.png";
const Navigation1 = () => {
  // const auth = useContext(AuthContext);
  const auth = useContext(AuthContext);
  //const [showResults, setShowResults] = React.useState(false)
  return (
    <div>
      <nav className=" adnanNav navbar navbar-expand-lg navbar-dark bg-primary ">
        <div className=" container-fluid">
          <a className=" navbar-brand adannMagnolia " href="/">
            <Image class="img " src={logo} fluid />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item ">
                <NavLink to="/" className="nav-link adnanNav1">
                  Home
                </NavLink>
              </li>
              {/*
              <li className="nav-item">
                <NavLink to="/Products" className="nav-link adnanNav1 active">
                  Product
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/customers" className="nav-link adnanNav1 active">
                  Customers
                </NavLink>
              </li>
              */}

              <li className="nav-item">
                <NavLink to="/about" className="nav-link adnanNav1 active">
                  About
                </NavLink>
              </li>
              {/*  
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link adnanNav1 active">
                  Contact
                </NavLink>
              </li>
*/}
              <li className="nav-item dropdown adnanNav1 active">
                <a
                  className="nav-link dropdown-toggle active"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <div className="dropdown-menu adnanNav1">
                 
                 
                <NavLink to="/laptops" className=" dropdown-item  ">
                Laptops
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <NavLink to="/printers" className=" dropdown-item  ">
                  Printers
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <NavLink to="/electronics" className=" dropdown-item  ">
                  Electronics
                  </NavLink>
               
                
                  <div className="dropdown-divider"></div>

                  <NavLink to="/mobiles" className=" dropdown-item  ">
                  Mobiles
                  </NavLink>

               
                </div>
              </li>

              <li className="nav-item dropdown adnanNav1 active">
                <a
                  className="nav-link dropdown-toggle active"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <div className="dropdown-menu adnanNav1">
                  <NavLink to="/users" className=" dropdown-item  ">
                    Users
                  </NavLink>
                  <NavLink to="/Employees" className="dropdown-item  ">
                    Employees
                  </NavLink>
                  <NavLink to="/Products" className="dropdown-item  ">
                    Products
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <NavLink to="/Orders" className="dropdown-item  ">
                    Orders
                  </NavLink>
                  <div className="dropdown-divider"></div>
                </div>
              </li>

              {/* 
        <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
          */}

              {auth.isLoggedIn ? (
                <li className="nav-item nav1">
                  <NavLink
                    onClick={auth.logout}
                    to="/login"
                    className="nav-link adnanNav1 active  "
                  >
                    LogOut
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item nav1">
                  <NavLink to="/login" className="nav-link adnanNav1 active">
                    LogIn
                  </NavLink>
                </li>
              )}

              {/* 
              {auth.isLoggedIn ? (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        ) : (
          <li className="nav-item nav1">
          <NavLink to="/login" className="nav-link adnanNav1 active  ">
            LogIn
          </NavLink>
        </li>
        )}
*/}

              {/*
           
           
              <li class="nav-item">
                <NavLink to="/register" className="nav-link adnanNav1 active ">
                  Register
                </NavLink>
              </li>


              */}

              <a className=" btn-block btn-primary " href="/cart">
                <Image style={{ width: "60px" }} src={cart} />
              </a>
            </ul>

            {auth.isLoggedIn && (
              <div style={{ color: "white" }} className="adnanNav1 active">
                Hello {auth.loggedUser}
              </div>
            )}

            <form className="d-flex adnanSearch">
              <input
                className="form-control me-sm-2 "
                type="text"
                placeholder="Search"
              />
              <button
                className="btn btn-secondary my-2 my-sm-0 adanaSearchBtn"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation1;
