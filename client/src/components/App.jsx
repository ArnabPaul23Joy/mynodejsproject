import React, { useState } from "react";
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LogIn from "./LogIn"
import Register from "./Register";
function App() {
  const [globToken, setGlobTok] = useState("Invalid Token")
  const [logIn, setLogInBox] = useState("login");
  function logInOrRegister(logValue){
    setLogInBox(logValue)
  }


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
      axios.post('post/', {token: globToken, title: newNote.title, content: newNote.content})
        .then(res => {
          console.log("App's post butt res "+res.data)
          if(res.data.status==="Failed to save the note bruh!"){
            window.alert("failed to add post bro!")
          }
          else{
            setNotes((prevNotes) => {
              return [...prevNotes, newNote];
            });
            setLogInBox("home")
          }
        
        
        });
          
          // setLogInBox("home")
    
      
    
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios.post('deletenote/', {token: globToken, note: notes[id]})
      .then(res => console.log("App's delete butt res "+res.data));
  }
  function setToken(token){
      console.log("from APP "+token)
      setGlobTok(token)
      axios.post('getnotes/', {token: token})
        .then(res => {
          if(res.data.status==="Found bruh!"){
            setNotes(res.data.notes)
            setLogInBox("home")
          }
          console.log(res.data)
        });
        // logInOrRegister("home")
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
                title={noteItem.postTitle}
                content={noteItem.postContent}
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
