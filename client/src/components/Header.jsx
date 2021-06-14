import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
function Header(props) {
  function handleClick(){
    props.onLogout()
  }
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper{" "}
        {props.loginOr == "home" ? (
          <div className="allMenuItems">
            <button onClick={handleClick}><AccountCircleRoundedIcon/></button>
          </div>
        ) : (
          <div></div>
        )}
      </h1>
    </header>
  );
}

export default Header;
