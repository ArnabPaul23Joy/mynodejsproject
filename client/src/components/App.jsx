import React, { useState, useEffect } from "react";
import axios from "axios";
// import Header from "./Header";
// import Footer from "./Footer";
// import Note from "./Note";
// import CreateArea from "./CreateArea";
// import LogIn from "./LogIn";
// import Register from "./Register";
// import ConfirmationText from "./ConfirmationText";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Confirmation from "./Confirmation";
import Home from "./Home";;
function App() {

  
  return (
    <div className="App">
      <Router>
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
            <Confirmation/>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
