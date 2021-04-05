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
  const [logIn, setLogInBox] = useState("reload");
  if(logIn==="reload"){
      axios.post('getnotes/', {token: globToken})
        .then(res => {
          // if(res.data.status==="Invalid Token"){

          // }
          setGlobTok(res.data.token)
          if(res.data.status==="Found bruh!"){
            setNotes(res.data.notes)
            setLogInBox("home")
          }
          else if(res.data.status==="no data found"){
            setLogInBox("home")
          }
          else{
            setLogInBox("login")
          }
          console.log(res.data)
        });
  }
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
          // console.log("App's post butt res "+res.data.status)
          console.log(res.data)
          if(res.data.status==="Failed to save the note bruh!"){
            window.alert("failed to add note bro!")
          }
          else{
            setNotes((prevNotes) => {
              return [...prevNotes, res.data.noteNew];
            });
            setLogInBox("home")
          }
        
        
        });
          
          // setLogInBox("home")
    
      
    
  }

  function deleteNote(id) {
    
    axios.post('deletenote/', {token: globToken, note: notes[id]})
      .then(res => {
        if(res.data.status==="Delete Succeeded"){
          setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
              return index !== id;
            });
          });
          setGlobTok(res.data.token)
          setLogInBox("home")
        }
        else{
          setGlobTok(res.data.token)
          window.alert("Failed to Delete bruh!")
        }
        console.log("App's delete butt res")
        console.log(res.data)});
  }
  function setToken(token){
      console.log("from APP "+token)
      setGlobTok(token)
      axios.post('getnotes/', {token: token})
        .then(res => {
          // if(res.data.status==="Invalid Token"){

          // }
          setGlobTok(res.data.token)
          if(res.data.status==="Found bruh!"){
            setNotes(res.data.notes)
            setLogInBox("home")
          }
          else if(res.data.status==="no data found"){
            setLogInBox("home")
          }
          else{
            window.alert("Failed to get in bruh!")
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
