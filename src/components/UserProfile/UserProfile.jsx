import React from "react";
import "./UserProfile.css";

function UserProfile() {
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    async function loadUserProfile() {
      const response = await fetch("/bff/user", {
        headers: {
          "X-CSRF": "1",
        },
		credentials: "include",
      });
      if (response.ok) {
		const claimsArray = await response.json();
        const claims = {};
        claimsArray.forEach(claim => {
          claims[claim.type] = claim.value;
        });
        setProfile(claims);
      }
    }

    loadUserProfile();
  }, []);

  async function handleLogout() {
     await fetch("/bff/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF": "1",
    },
    credentials: "include",
  });

  // Optional: Redirect to login or home page after logout
  window.location.href = "/login";
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
