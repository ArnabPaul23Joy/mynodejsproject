import React, { useState } from "react";

function Items(props) {
  function handleItemClick(e) {
    e.preventDefault();
  }
  return (
    <div onClick={handleItemClick} className={props.cName}>
      <ul>{props.ItemName}</ul>
    </div>
  );
}

export default Items;
