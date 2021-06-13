import React, { useState, useEffect } from "react";
import axios from "axios";
// import Header from "./Header";
// import Footer from "./Footer";
// import Note from "./Note";
// import CreateArea from "./CreateArea";
// import LogIn from "./LogIn";
// import Register from "./Register";
// import ConfirmationText from "./ConfirmationText";
import Confirmation from "./Confirmation";
import Home from "./Home";;
import { set } from "mongoose";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {

  const [globToken, setGlobTok] = useState("InvalidToken");
  const [logIn, setLogInBox] = useState("default");

  function logInOrRegister(logValue) {
    setLogInBox(logValue);
  }
  

  
  function setToken() {

    axios.get("getnotes/", { withCredentials: true }).then((res) => {
      if (res.data.status === "Invalid Token") {
      }
      console.log(res.data);
      if (res.data.status === "Found bruh!") {
        setNotes(res.data.notes);
        // setLogInBox("home")
        logInOrRegister("home");
      } else if (res.data.status === "no data found") {
        setNotes(res.data.notes);
        // setLogInBox("home")
        logInOrRegister("home");
      } else {
        window.alert("Failed to get in bruh!");
        logInOrRegister("login");
      }
      // console.log(res.data)
    });
  }
  return (
    <div className="App">
      <Router>
        <Route
          path="/about"
          exact
          component={() => (
            <div>
              <h1>asdasnbdbnasndbasmbvdmb</h1>
            </div>
          )}
        />
        <Route
          path="/"
          exact
          component={() => (
            <Home/>
          )}
        />
        <Route
          path="/confirmation"
          exact
          component={() => (
            <Confirmation onLoggIn={logInOrRegister} onToken={setToken} />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
