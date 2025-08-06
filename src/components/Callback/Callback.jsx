import React from "react";
import { handleCallback } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function processSignin() {
      await handleCallback();
      navigate("/dashboard");
    }
    processSignin();
  }, [navigate]);

  return <p>Signing you in...</p>;
}

export default Callback;
