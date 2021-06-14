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
  

  useEffect(() => {
    console.log(id, rFieldVal);
    axios.post("verify/", { id: id, rFieldVal: rFieldVal }).then((res) => {
      if (res.data.status === "Successful") {
        console.log(res.data.status);
        var link=window.location.host
        setHeaderText(
          "Your Email Is Confirmed.<br> Please Click on the link to do your listing.<br><a href=" +
            link +
            ">Click here to verify</a>"
        );
      } else {
        console.log(res.data.status);
        alert(res.data.status);
        window.location.replace(window.location.host);
      }
    });
  }, []);

  
  return (
    <div>
      <Header onLogout={function(){}} loginOr="confirmation" />
      <div className="confirmation">
        <h1>{headerText}</h1>
      </div>
      <Footer />
    </div>
  );
}
export default Confirmation;
