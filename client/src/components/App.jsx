import React, { useState } from "react";
import axios from "axios"
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LogIn from "./LogIn"
import Register from "./Register";
import { set } from "mongoose";

function App() {

  
  

  const [globToken, setGlobTok] = useState("InvalidToken")
  const [logIn, setLogInBox] = useState("login");
  function setCookie(cname, globToken, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + globToken + ";" + expires + ";path=/";
  }
  
  function logInOrRegister(logValue){
    setLogInBox(logValue)
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
            logInOrRegister("home")
            setGlobTok(res.data.token)
          }
        
        
        });
        // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper","ajsdjfasdvf bsdfn ",1)
        // console.log(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"))
          
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
                logInOrRegister("home")
                setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30) 
        }
        else{
          setGlobTok(res.data.token)
                window.alert("Failed to Delete bruh!")
        }
        console.log("App's delete butt res")
        console.log(res.data)});
  }
  function setToken(tokn){
      console.log("from APP "+tokn)
      var gT=tokn
      // setGlobTok(token)
      console.log("from logP "+gT)
        axios.get('getnotes/', {params:{token: gT}})
        .then(res => {
          // if(res.data.status==="Invalid Token"){

          // }
          
          
          setGlobTok(res.data.token)
          console.log("from getnotes  "+ globToken)

          // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", globToken, 30)
          // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", globToken, 100)
          if(res.data.status==="Found bruh!"){
            setNotes(res.data.notes)
            // setLogInBox("home")
          setGlobTok(res.data.token)
                logInOrRegister("home")
                setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30) 
          }
          else if(res.data.status==="no data found"){
            // setLogInBox("home")
          setGlobTok(res.data.token)
                logInOrRegister("home")
                setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", res.data.token, 30) 
          }
          else{
            window.alert("Failed to get in bruh!")
          }
          console.log(res.data)
        });
        // logInOrRegister("home")
        // setNotes(tttt.notePosts)
      }
  function logOut(){
    
      axios.post('logout/', {token: globToken})
        .then(res => {
          if(res.data.status==="Invalid Token"){
              window.alert("failed to logout!")
          }
          else{
              setGlobTok(res.data.token)
              // setCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper", globToken, 100)
              
              logInOrRegister("login")
          }
          
          // if(res.data.status==="Found bruh!"){
          //   setNotes(res.data.notes)
          //   setLogInBox("home")
          // }
          // else if(res.data.status==="no data found"){
          //   setLogInBox("home")
          // }
          // else{
          //   window.alert("Failed to get in bruh!")
          // }
          // console.log(res.data)
        });

  }
  
        // switch(logIn){
        //   case "login":
        //     return <LogIn onLoggIn={logInOrRegister} onToken={setToken}/>
          
        //   case "register":
        //     return <Register onLoggIn={logInOrRegister}  onToken={setToken}/>
        //   case "home":
  return (
    <div>
      <Header onLogout={logOut} />
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
