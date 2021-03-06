import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [inBool, setIn] = useState(false);
  function showFullForm(event) {
    setIn(true);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    if(note.title.length>0 && note.content.length>0){
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    }
    event.preventDefault();
  }

  return (
    <div>
      <form
        className="
      create-note"
      >
        {inBool ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={showFullForm}
          value={note.content}
          placeholder="Take a note..."
          rows={inBool ? "3" : "1"}
        />
        <Zoom in={inBool}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
