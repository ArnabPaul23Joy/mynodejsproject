import React, { useState } from "react";
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LogIn from "./LogIn"
import Register from "./Register";
function App() {
  var token
  const [logIn, setLogInBox] = useState("login");
  function logInOrRegister(logValue){
    setLogInBox(logValue)
  }


  const [notes, setNotes] = useState([]);
  
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
      axios.post('post/', {token: token, note: newNote})
        .then(res => console.log("Note added successfully bruh! "+res.data));
    
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  function setToken(token){
      console.log("from APP "+token)
      axios.post('getnotes/', {token: token})
        .then(res => {
          console.log(res.data)
          setLogInBox("home")
        });
        // setNotes(tttt.notePosts)
      } 
  
        // switch(logIn){
        //   case "login":
        //     return <LogIn onLoggIn={logInOrRegister} onToken={setToken}/>
          
        //   case "register":
        //     return <Register onLoggIn={logInOrRegister}  onToken={setToken}/>
        //   case "home":
  return (
    <div>
      <Header />
      {
        logIn==="login"?
        (<LogIn onLoggIn={logInOrRegister} onToken={setToken}/>) : (<></>)
      }

      {
        logIn==="register"?
        (<Register onLoggIn={logInOrRegister}  onToken={setToken}/>):(<></>)
      }
      {
        logIn==="home"?
        (<div>
          <CreateArea onAdd={addNote} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        </div>):(<></>)
      }
      {/* <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })} */}
      <Footer />
    </div>
  );
}

export default App;
