import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
function Header(props) {
  function handleLogout(){
    setAnchorEl(null);
    props.onLogout()
  }


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconAccClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {props.loginOr == "home" ? (
        <div className="NavigationBar">
          <ListIcon />
          <h1>TaskListApp</h1>
          <div className="allMenuItems">
            <Button
              onClick={handleLogout}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              <p>
                <AccountCircleRoundedIcon />
                logout
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="NavigationBar">
          <ListIcon />
          <h1>TaskListApp</h1>
        </div>
      )}
    </div>
  );
}

export default Header;
