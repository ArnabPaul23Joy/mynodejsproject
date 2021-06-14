import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Button from "@material-ui/core/Button";
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
    <header>
      <h1>
        <HighlightIcon />
        Keeper{" "}
        {props.loginOr == "home" ? (
          <div className="allMenuItems">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleIconAccClick}
            >
              <AccountCircleRoundedIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div></div>
        )}
        {/* {props.loginOr == "home" ? (
          <div className="allMenuItems">
            <button onClick={handleClick}><AccountCircleRoundedIcon/></button>
          </div>
        ) : (
          <div></div>
        )} */}
      </h1>
    </header>
  );
}

export default Header;
