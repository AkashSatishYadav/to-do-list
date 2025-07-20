import React from "react";
import "./Login.css";

function Login({ setIsLogged }) {
  function handleLogin() {
    setIsLogged(true);
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
