import React, { useState } from "react";
import "./User.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  return (
    <div className="login">
      <h2> Let's Reset your Password !</h2>
      <div className="login-container">
        <h2> Reset Password</h2>
        <div className="login-form">
          <input
            required
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <br />
        <div className="btns">
          <button className="login-btn">Get Link</button>
        </div>
        <br />
        <a href="/login" alt="login">
          <small>Login</small>
        </a>
      </div>
    </div>
  );
}
