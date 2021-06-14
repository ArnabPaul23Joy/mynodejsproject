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
  var link = window.location.hostname + "/";
  var query = useQuery();
  var [headerText,setHeaderText] = useState("Your Email Confirmation Is Going On.");
  var id = query.get("id");
  var rFieldVal = query.get("rFieldVal");
  
  var [emailConfirmed,setEmailConfirmed]=useState(false)
  useEffect(() => {
    console.log(id, rFieldVal);
    axios.post("verify/", { id: id, rFieldVal: rFieldVal }).then((res) => {
      if (res.data.status === "Successful") {
        console.log(res.data.status);
        var link=window.location.host
        setEmailConfirmed(true);
      } else {
        console.log(res.data.status);
        alert(res.data.status);
        window.location.replace(window.location.host);
      }
    });
  }, []);

  
  return (
    <div>
      <Header onLogout={function () {}} loginOr="confirmation" />
      {!emailConfirmed ? (
        <div className="confirmation">
          <h1>{headerText}</h1>
        </div>
      ) : (
        <div className="confirmation">
          <h1>Your Email Is Confirmed.<br/><a href={link}>Click here to do your listing</a>.<br/></h1>
        </div>
      )}

      <Footer />
    </div>
  );
}
export default Confirmation;
