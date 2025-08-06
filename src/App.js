import logo from "./logo.svg";
import "./App.css";
import UserProfile from "./components/UserProfile";
import UserToDo from "./components/UserToDo";
import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Callback from "./components/Callback";
import LogoutCallback from "./components/LogoutCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/logout/callback" element={<LogoutCallback />} />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard">
              <UserProfile />
              <UserToDo />
            </div>
          }
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
