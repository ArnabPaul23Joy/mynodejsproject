import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LogIn from "./LogIn";
import Register from "./Register";
import ConfirmationText from "./ConfirmationText";
import Confirmation from "./Confirmation";
import { set } from "mongoose";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function Home() {

  useEffect(() => {
    console.log("hey!!!!!");
    axios.post("loginWithToken/", { withCredentials: true }).then((res) => {
      if (res.data.status === "Success") {
        console.log();
        setToken();
      } else {
        console.log(res.data.status);
        logInOrRegister("login");
      }
    });
  }, []);

  const [globToken, setGlobTok] = useState("InvalidToken");
  const [logIn, setLogInBox] = useState("default");

  function logInOrRegister(logValue) {
    setLogInBox(logValue);
  }
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    axios
      .post("post/", {
        title: newNote.title,
        content: newNote.content,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Failed to save the note bruh!") {
          window.alert("failed to add note bro!");
        } else {
          setNotes((prevNotes) => {
            return [...prevNotes, res.data.noteNew];
          });
          logInOrRegister("home");
        }
      });
  }

  function deleteNote(id) {
    axios
      .post("deletenote/", { note: notes[id], withCredentials: true })
      .then((res) => {
        if (res.data.status === "Delete Succeeded") {
          setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
              return index !== id;
            });
          });
          logInOrRegister("home");
        } else {
          window.alert("Failed to Delete bruh!");
        }
        console.log("App's delete butt res");
        console.log(res.data);
      });
  }
  function setToken() {
    axios.post("getnotes/", { withCredentials: true }).then((res) => {
      if (res.data.status === "Invalid Token") {
      }
      console.log(res.data);

      if (res.data.status === "Found bruh!") {
        setNotes(res.data.notes);
        logInOrRegister("home");
      } else if (res.data.status === "no data found") {
        setNotes(res.data.notes);
        logInOrRegister("home");
      } else {
        window.alert("Failed to get in bruh!");
        logInOrRegister("login");
      }
    });
  }
  function logOut() {
    axios.post("logout/", { withCredentials: true }).then((res) => {
      if (res.data.status === "Invalid Token") {
        window.alert("failed to logout!");
      } else {
        logInOrRegister("login");
      }
    });
  }
  return (
    <div>
      <Header onLogout={logOut} loginOr={logIn} />
      {logIn === "Confirmation" ? <ConfirmationText /> : <div></div>}
      {logIn === "login" ? (
        <LogIn onLoggIn={logInOrRegister} onToken={setToken} />
      ) : (
        <div></div>
      )}
      {logIn === "register" ? (
        <Register onLoggIn={logInOrRegister} onToken={setToken} />
      ) : (
        <div></div>
      )}
      {logIn === "home" ? (
        <div>
          <CreateArea onAdd={addNote} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.postTitle}
                content={noteItem.postContent}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
