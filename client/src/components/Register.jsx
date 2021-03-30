import React, { useState } from "react"
import axios from "axios"
function Register(props){
  function handleClick() {
    props.onLoggIn("login");
  }
  const [conPassword, setCon] = useState("")
  const [pasHolder, setHolder] = useState("password")
  const [user, setUser] = useState({
    uname: "",
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
  function handleConChange(event){
    const {value } = event.target;
    setCon(value)
  }
  function handleSignIn(e){

    // const user = {
    //   username: this.state.username
    // }

    console.log(conPassword);
    console.log(user);
    let registerResponse={}
    if(conPassword==user.password){   
      
      console.log("registerrrrrrrrr beyatch!")
      axios.post('register', user)
        .then(res => registerResponse=res.data);
        console.log("register Response "+ registerResponse)
    }
    else{
        setHolder("Wrong Password")
    }
    e.preventDefault();
    // this.setState({
    //   username: ''
    // })
  }
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin" onSubmit={handleSignIn}>
                  <div className="form-label-group">
                    <label for="inputName">Name</label>
                    <input type="text" id="inputName" className="form-control" value={user.uname} onChange={handleChange} name="uName" placeholder="Full Name"/>
                  </div>
                  <div className="form-label-group">
                    <label for="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" value={user.email} onChange={handleChange} name="email" placeholder="Email address" required autofocus />
                  </div>

                  <div className="form-label-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" id="inputPassword" className="form-control" value={user.password} onChange={handleChange} name="password" placeholder={pasHolder} required />
                  </div>
                  
                  <div className="form-label-group">
                    <label for="inputConfirmPassword">Confirm Password</label>
                    <input type="password" id="inputConfirmPassword" name="conPassword" value={conPassword} onChange={handleConChange} className="form-control" placeholder={pasHolder} required />
                  </div>

                  {/* <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                  </div> */}
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up</button>
                  <hr className="my-4"/>
                  <button className="btn btn-lg btn-google btn-block text-uppercase"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                  <button className="btn btn-lg btn-facebook btn-block text-uppercase"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                  <br/>
                  <p>already have an account? <button onClick={handleClick} class="registerBtton">Sign In</button></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}
export default Register;