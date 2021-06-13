import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";
import { useParams } from "react-router";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
function Confirmation(props) {
  
    function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
  var query = useQuery();
  var [headerText,setHeaderText] = useState("Your Email Confirmation Is Going On.");
  var id = query.get("id");
  var rFieldVal = query.get("rFieldVal");
  
  function logOut() {
    axios.post("logout/", { withCredentials: true }).then((res) => {
      if (res.data.status === "Invalid Token") {
        window.alert("failed to logout!");
      } else {
        props.onLoggIn("login");
      }
    });
  }

  useEffect(() => {
    console.log(id, rFieldVal);
    axios.post("verify/", { id: id, rFieldVal: rFieldVal }).then((res) => {
      if (res.data.status === "Success") {
        console.log(res.data.status);
        setHeaderText("Your Email Is Confirmed.");
        // props.onToken();
      } else {
        console.log(res.data.status);
        // props.onLoggIn("login");
      }
    });
  }, []);

  return (
    <div>
      <Header onLogout={logOut} />
      <div className="confirmation">
        <h1>{headerText}</h1>
      </div>
      <Footer />
    </div>
  );
}
export default Confirmation;
