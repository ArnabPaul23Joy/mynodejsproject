import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header(props) {
  function handleClick(){
    props.onLogout()
  }
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper {props.loginOr == "home"?<button onClick={handleClick}>logout</button>:<div></div>}
        
      </h1>
    </header>
  );
}

export default Header;
