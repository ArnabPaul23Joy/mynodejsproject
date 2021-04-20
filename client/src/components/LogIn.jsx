import React, { useState, useEffect } from "react"
import axios from "axios"
function LogIn(props){
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "Invalid Token";
  }
  useEffect(() =>{
    
    console.log("hey!!!!!")
    // console.log(getCookie("keeeppperrr"))
    console.log(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"))
    const globToken=getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper")
    // setGlobTok(getCookie("keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeper"))
      axios.post('loginWithToken/', {token: globToken})
        .then(res => {
          // if(res.data.status==="Invalid Token"){
          if (!(res.data==="Invalid Token")){
            props.onToken(res.data)
            //props.onLoggIn("home");
          }
          else{
            console.log(res.data)
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
  },[])
  function handleClick() {
    props.onLoggIn("register");
  }
  // const [tttt, setTTTT] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value
      };
    });
  }
  function handleSignIn(e){

    // const user = {
    //   username: this.state.username
    // }
    console.log("sign in button")

    // console.log(user);
    // if (user.password.length<8){
    //   alert("too short password!")
    // }
    // var tttt
    axios.post('login/', user)
      .then(res => {
        // console.log("login    hhh"+res.data)
        if (!(res.data==="Wrong email bruh!"||res.data==="Wrong password bruh!")){
            props.onToken(res.data)
            //props.onLoggIn("home");
        }
        else{
          console.log(res.data)
          // props.onNote(res.data)
        }
      });
      // console.log("login   "+tttt)
      // if (!(tttt==="Wrong email bruh!"||tttt==="Wrong password bruh!")){
      //   console.log(tttt)
      // }
      // else{
      //     props.onToken(tttt)
      // }
    
    
      e.preventDefault();

    // this.setState({
    //   username: ''
    // })
  }
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={handleSignIn}>
                  <div className="form-label-group">
                    <label for="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" name="email" value={user.email} className="form-control" onChange={handleChange} placeholder="Email address" required autofocus />
                  </div>

                  <div className="form-label-group passwordField">
                    <label for="inputPassword">Password</label>
                    <input type="password" id="inputPassword" name="password" value={user.password} className="form-control" onChange={handleChange} placeholder="Password" required />
                  </div><br/>

                  {/* <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                  </div> */}
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                  <hr className="my-4"/>
                  {/* onClick={handleGoogleSignIn} */}
                  <button className="btn btn-lg btn-google btn-block text-uppercase"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                  {/* onClick={handleFacebookSignIn} */}
                  <button className="btn btn-lg btn-facebook btn-block text-uppercase"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                  <br/>
                  <p>Do not have an account? <button data-testid="switch-to-login" onClick={handleClick}class="registerBtton">Sign Up</button></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}
export default LogIn;