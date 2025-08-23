import React from "react";
import "./Login.css";

function Login() {
  function handleLogin() {
    window.location.href = "/bff/login?returnUrl=/dashboard";
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
