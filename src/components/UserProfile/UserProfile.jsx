import React from "react";
import "./UserProfile.css";
import { getUser, logout } from "../../services/AuthService";

function UserProfile() {
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    async function loadUserProfile() {
      const user = await getUser();
      if (user && user.profile) {
        console.log("User:", user);
        console.log("User profile:", user.profile);
        setProfile(user.profile);
      }
    }

    loadUserProfile();
  }, []);

  function handleLogout() {
    logout();
  }
  if (!profile) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="user-profile">
      <div>
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email || "Not provided"}
        </p>
        <p>
          <strong>Username:</strong> {profile.preferred_username || "N/A"}
        </p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
