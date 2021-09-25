import React, { useState } from "react";
import Items from "./Items";
function Menu(props) {
  return (
    <div className={props.cName}>
      <Items
        cName={props.cName === "menuBar" ? "Items" : "ItemsSmall"}
        ItemName="About"
      />
      <Items
        cName={props.cName === "menuBar" ? "Items" : "ItemsSmall"}
        ItemName="Contact Us"
      />
      <Items
        cName={props.cName === "menuBar" ? "Items" : "ItemsSmall"}
        ItemName="Profile"
      />
      <Items
        cName={props.cName === "menuBar" ? "Items" : "ItemsSmall"}
        ItemName="Logout"
      />
    </div>
  );
}

export default Menu;
