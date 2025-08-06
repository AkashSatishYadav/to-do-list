import React from "react";
import "./Login.css";
import { login } from "../../services/AuthService";

function Login() {
  function handleLogin() {
    login();
  }
  return (
    <div className="login">
      <div className="login-box">
        <button onClick={handleLogin}>Login with SkyDrive</button>
      </div>
    </div>
  );
}

export default Login;
