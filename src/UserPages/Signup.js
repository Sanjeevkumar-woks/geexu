import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../App";
import "./User.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordAgain] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const getData = useData();

  const { message, setMessage } = getData;

  function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      email,
      password,
      display_name,
    };
    fetch("http://localhost:9000/users/api/v2/people/create", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((d) => setMessage(d.msg))
      .catch((err) => console.log(err));
    if (message == "Sucessfull signup") navigate("/login");
    console.log(message);
  }

  const showpassword = () => {
    setShow(!show);
  };
  return (
    <div className="login">
      <div className="heading">
        <h2>Please tell us a little about you!</h2>
      </div>
      <div className="login-container">
        <form className="login-form">
          <h2>Sign Up</h2>
          <input
            required
            id="Display-Name"
            placeholder="Display Name"
            value={display_name}
            onChange={(e) => setDisplay_name(e.target.value)}
            type="text"
          />

          <input
            required
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <input
            required
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "password" : "text"}
          />
          <input
            required
            id="passwordagain"
            placeholder="Password Again"
            value={passwordagain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            type={show ? "password" : "text"}
          />
        </form>
        <div className="checkbox">
          <label>
            <input type="checkbox" onClick={showpassword} />{" "}
            <small>Show Password</small>
          </label>
        </div>
        {message ? <small style={{ color: "red" }}>{message}</small> : ""}
        <div className="btns">
          <button className="login-btn" onClick={handleSubmit}>
            Signup
          </button>
          <button className="signup-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
