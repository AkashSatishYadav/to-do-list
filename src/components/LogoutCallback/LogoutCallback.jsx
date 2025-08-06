// src/components/LogoutCallback.js
import React, { useEffect } from "react";
import { handleLogoutCallback } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

function LogoutCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogoutCallback()
      .then(() => {
        console.log("Logout callback handled.");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error handling logout callback", err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>Signing you out...</div>;
}

export default LogoutCallback;
