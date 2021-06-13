import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="confirmation">
      <p>A verification link link has been sent to your Email. Please Check your Email.</p>
    </div>
  );
}

export default Note;
