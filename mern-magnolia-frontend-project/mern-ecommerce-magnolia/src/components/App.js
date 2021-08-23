//import and declaration
import { useState, useCallback } from "react";
import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import AuthContext from "../contexts/AuthContext";
import Login from "../pages/Login1";
import Register from "../pages/Register1";
import HomeScreen from "../pages/HomeScreen";
import About from "../pages/About";
import Contact from "../pages/Contact";
//for Admin login
import NavigationAdmin from "../navigation/NavigationAdmin";
//for User Login
import NavigationUser from "../navigation/NavigationUser";
//for general
import Navigation from "../navigation/Navigation";
import Customers from "../pages/customers";
import ProductScreen from "../pages/ProductScreen";
import CartScreen from "../pages/CartScreen";
//import users from "../pages/users1";
import Employees from "../pages/Employees";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Cart from "../pages/CartScreen";
import { NavLink } from "react-router-dom";
import Mobiles from "../pages/Mobiles";
import Electronics from "../pages/Electronics";
import Printers from "../pages/Printers";
import Laptops from "../pages/Laptops";
//for style
import "./../App.css";
//for user crud
import UsersList from "../pages/users/UsersList";
import UpdateUser from "../pages/users/UpdateUser";
import DeleteUser from "../pages/users/DeleteUser";
import AddUser from "../pages/users/AddUser";

//Start App
const App = () => {
  //Context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setloggedUser] = useState("");
  const [IsAdmin, setIsAdmin] = useState(false);
  const [token1, setToken1] = useState("");
  const auth = useContext(AuthContext);
  //get Name, Role, Token
  const login = useCallback((name, role, token1) => {
    setIsLoggedIn(true);
    setloggedUser(name);
    setIsAdmin(role);
    setToken1(token1);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setloggedUser("");
  }, []);

  // This check for logins(Admin, user)
  let navroutes;
  {
    if (isLoggedIn == true && IsAdmin == true) {
      navroutes = <NavigationAdmin />;
    } else if (isLoggedIn == true && IsAdmin == false) {
      navroutes = <NavigationUser />;
    } else if (isLoggedIn == false) {
      navroutes = <Navigation />;
    }
  }

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          IsAdmin: IsAdmin,
          login: login,
          logout: logout,
          loggedUser: loggedUser,
          token1: token1,
        }}
      >
        <BrowserRouter>
          <div>
            {navroutes}
            <Container>
              <main className="py-5">
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/laptops" component={Laptops} />
                  <Route path="/electronics" component={Electronics} />
                  <Route path="/mobiles" component={Mobiles} />
                  <Route path="/printers" component={Printers} />

                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/cart/" component={CartScreen} />
                  <Route path="/users" component={UsersList} />
                  <Route path="/addUser" component={AddUser} />

                  <Route path="/updateUser/:id" component={UpdateUser} />
                  <Route path="/deleteUser/:id" component={DeleteUser} />
                  <Route path="/Employees" component={Employees} />
                  <Route path="/Orders" component={Orders} />
                  <Route path="/Products" component={Products} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/" exact component={HomeScreen} />
                </Switch>
              </main>
            </Container>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
