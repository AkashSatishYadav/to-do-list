import logo from "./logo.svg";
import "./App.css";
import UserProfile from "./components/UserProfile";
import UserToDo from "./components/UserToDo";
import React from "react";
import Login from "./components/Login";

function App() {
  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <>
      {isLogged ? (
        <div className="dashboard">
          <UserProfile setIsLogged={setIsLogged}></UserProfile>
          <UserToDo></UserToDo>
        </div>
      ) : (
        <div>
          <Login setIsLogged={setIsLogged}></Login>
        </div>
      )}
    </>
  );
}

export default App;
