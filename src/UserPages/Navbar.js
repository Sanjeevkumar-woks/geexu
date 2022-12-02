import React, { useState } from "react";
import Avatar from "react-avatar";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useData } from "../App";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const getData = useData();
  const {
    user_data,
    setUser_data,
    setLogin,
    setMessage,
    setx_auth_token,
    setRole,
  } = getData;

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    setUser_data({});
    setLogin(false);
    setMessage("");
    setx_auth_token("");
    setRole({});
  };
  const { result } = { ...user_data };
  const { person } = { ...result };
  const { email, display_name, updated_at, created_at } = { ...person };
  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <div className="navbar">
          <Link to="#" className="menu-avtar">
            <Avatar
              name={display_name}
              onClick={showSidebar}
              size="60"
              round={true}
            />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="menu-items">
              <div className="menu-head">
                <h1>{display_name}</h1>
                <p>{email}</p>
              </div>
              <div className="security">
                <small>Acount age: {created_at}</small>
                <p>Security:</p>
                <small>Last Update: {updated_at}</small>
              </div>
              <div className="button">
                <a href="passwordreset">ResetPassword</a>
                <br />
                <br />
                <a onClick={handleLogout} href="/login">
                  Logout
                </a>
              </div>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
