// src/authService.js
import { UserManager } from "oidc-client-ts";

const oidcConfig = {
  authority: "https://localhost:5001", // your IDP URL (adjust port if needed)
  client_id: "react-spa-notes",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email notesAPI offline_access",
  post_logout_redirect_uri: "http://localhost:3000/logout/callback",
  automaticSilentRenew: true
};

const userManager = new UserManager(oidcConfig);

export const login = () => {
  return userManager.signinRedirect();
};

export const logout = () => {
  return userManager.signoutRedirect();
};

export const handleCallback = async () => {
  return await userManager.signinRedirectCallback();
};

export const handleLogoutCallback = async () => {
  return await userManager.signoutRedirectCallback();
};

export const getUser = async () => {
  return await userManager.getUser();
};

export const getAccessToken = async () => {
  const user = await userManager.getUser();
  return user?.access_token;
};

export default userManager;
