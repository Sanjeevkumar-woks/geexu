import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import { useData } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const getData = useData();

  const {
    user_data,
    setUser_data,
    login,
    setLogin,
    message,
    setMessage,
    x_auth_token,
    setx_auth_token,
    role,
    setRole,
  } = getData;

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      email,
      password,
    };
    fetch("http://localhost:9000/users/api/v2/people/authenticate", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((d) => setUser_data(d))
      .catch((err) => console.log(err));

    if (user_data.msg == "Sucessfull Login") {
      setLogin(true);
      setx_auth_token(user_data.result.authentication_token);
      setRole(user_data.result.person.role.key);
      console.log(login, x_auth_token, role);
      navigate("/home");
      //role==="user"? navigate('/'): navigate('/admin')
    } else {
      setMessage(user_data.msg);
    }
  }

  const showpassword = () => {
    setShow(!show);
  };

  return (
    <div className="login">
      <div className="heading">
        <h2>Welcome !</h2>
        <h2>Please login to continue.</h2>
      </div>
      <div className="login-container">
        <h2>LOGIN</h2>
        <form className="login-form">
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
        </form>

        <div className="checkbox">
          <label>
            <input type="checkbox" onClick={showpassword} />{" "}
            <small>Show Password</small>
          </label>
          <a href="/passwordreset" alt="passwordreset">
            <small>Forgot password?</small>
          </a>
        </div>
        {message ? <small style={{ color: "red" }}>{message}</small> : ""}
        <div className="btns">
          <button className="login-btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
