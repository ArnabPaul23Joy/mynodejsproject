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
function App() {

  // function getCookie(cname) {
  //   var name = cname + "=";
  //   var decodedCookie = decodeURIComponent(document.cookie);
  //   var ca = decodedCookie.split(";");
  //   for (var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "Invalid Token";
  // }
  useEffect(() => {
    console.log("hey!!!!!");
    // console.log(getCookie("keeeppperrr"))
    // console.log(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"));
    // const globToken = getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper");
    // setGlobTok(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"))
    axios.post("loginWithToken/", { withCredentials: true }).then((res) => {
      // if(res.data.status==="Invalid Token"){
      if (res.data.status === "Success") {
        console.log();
        setToken();
        //props.onLoggIn("home");
      } else {
        console.log(res.data.status);
        logInOrRegister("login");

        // props.onNote(res.data)
      }
      // }
      // setGlobTok(res.data.token)
      // console.log()
      // if(res.data.status==="Found bruh!"){
      //   // setNotes(.notes)
      //   logInOrRegister("home")
      //   props.onToken(res.data)
      // }
      // else if(res.data.status==="no data found"){
      //   logInOrRegister("home")
      //   props.onToken(res.data)
      // }
      // else{
      //   logInOrRegister("login")
      // console.log("ggg    "+res.data.status)
      // }
    });
  }, []);

  const [globToken, setGlobTok] = useState("InvalidToken");
  const [logIn, setLogInBox] = useState("default");
  // function setCookie(cname, gTokn, exdays) {
  //   var d = new Date();
  //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  //   var expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + gTokn + ";" + expires + ";path=/";
  // }

  function logInOrRegister(logValue) {
    setLogInBox(logValue);
  }
  // setGlobTok(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"))
  // if(logIn==="reload"){
  // }

  const [notes, setNotes] = useState([]);
  // const [delBut, setDeleteBut] = useState(false);
  // function initializeNote(allNotes){
  //   setNotes(allNotes)
  // }
  function addNote(newNote) {
    // console.log("from app"+newNote.title)
    // setNotes((prevNotes) => {
    //   return [...prevNotes, newNote];
    // });

    axios
      .post("post/", {
        title: newNote.title,
        content: newNote.content,
        withCredentials: true})
      .then((res) => {
        // console.log("App's post butt res "+res.data.status)
        console.log(res.data);
        if (res.data.status === "Failed to save the note bruh!") {
          window.alert("failed to add note bro!");
        } else {
          setNotes((prevNotes) => {
            return [...prevNotes, res.data.noteNew];
          });
          // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30);
          // setGlobTok(res.data.token);
          logInOrRegister("home");
        }
      });
    // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper","ajsdjfasdvf bsdfn ",1)
    // console.log(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"))

    // setLogInBox("home")
  }

  function deleteNote(id) {
    axios
      .post("deletenote/", { note: notes[id] , withCredentials: true})
      .then((res) => {
        if (res.data.status === "Delete Succeeded") {
          setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
              return index !== id;
            });
          });
          // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30);
          // setGlobTok(res.data.token);
          logInOrRegister("home");
        } else {
          // setGlobTok(res.data.token);
          window.alert("Failed to Delete bruh!");
        }
        console.log("App's delete butt res");
        console.log(res.data);
      });
  }
  function setToken() {
    // console.log("from APP " + tokn);
    // var gT = ""
    // gT+=tokn;
    // setGlobTok(gT);
    // console.log("from logP " + gT);

    axios.get("getnotes/", { withCredentials: true }).then((res) => {
      if (res.data.status === "Invalid Token") {
      }
      console.log(res.data);

      // setGlobTok(res.data.token)

      // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", globToken, 30)
      // // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", globToken, 100)
      if (res.data.status === "Found bruh!") {
        // setGlobTok(res.data.token);
        // console.log("from getnotes  " + globToken);
        // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30);
        setNotes(res.data.notes);
        // setLogInBox("home")
        logInOrRegister("home");
      } else if (res.data.status === "no data found") {
        // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30);
        // setGlobTok(res.data.token);
        setNotes(res.data.notes);
        // setLogInBox("home")
        logInOrRegister("home");
      } else {
        window.alert("Failed to get in bruh!");
        logInOrRegister("login");
      }
      // console.log(res.data)
    });
    // logInOrRegister("home")
    // setNotes(tttt.notePosts)
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

  // switch(logIn){
  //   case "login":
  //     return <LogIn onLoggIn={logInOrRegister} onToken={setToken}/>

  //   case "register":
  //     return <Register onLoggIn={logInOrRegister}  onToken={setToken}/>
  //   case "home":
  return (
    <div className="App">
      <Router>
        <Route
          path="/about"
          exact
          component={() => (
            <div>
              <h1>asdasnbdbnasndbasmbvdmb</h1>
            </div>
          )}
        />
        <Route
          path="/"
          exact
          component={() => (
            <div>
              <Header onLogout={logOut} />
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
              <Footer />
            </div>
          )}
        />
        <Route
          path="/confirmation"
          exact
          component={() => (
            <Confirmation onLoggIn={logInOrRegister} onToken={setToken} />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
