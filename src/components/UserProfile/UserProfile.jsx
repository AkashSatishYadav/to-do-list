import React from "react";
import "./UserProfile.css";

function UserProfile({ setIsLogged }) {
  function handleLogout() {
    setIsLogged(false);
  }
  return (
    <div className="user-profile">
      <div>
        <h2>User Profile</h2>
        <p>Name: Jane Doe</p>
        <p>Email: jane@example.com</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
