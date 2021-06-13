import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="confirmation">
      <h1>A verification link link has been sent to your Email. h1lease Check your Email.</h1>
    </div>
  );
}
s
export default Note;
