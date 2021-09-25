import React, { useState, useEffect } from "react"
import axios from "axios"
import { GoogleLogin } from "react-google-login";
function LogIn(props){
  
  function handleClick() {
    props.onLoggIn("register");
  }

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

    // console.log("sign in button")
    axios.post('login/', user)
      .then(res => {
        if (!(res.data.status==="Wrong email bruh!"||res.data.status==="Wrong password bruh!")){
          // console.log("from login")
          // console.log(res.data.token)
            props.onToken()
        }
        else{
          // console.log(res.data)
        }
      });
      e.preventDefault();
  }
  async function googleResponse(response){
    if(response){
        
      const result = response.profileObj;

      // console.log(response);
      const token = response.tokenObj.id_token;
      // console.log("tk   " + token);
      try {
        axios
          .get("googlesignin/", { params: { token: token } })
          .then(function (res) {
            // console.log("ressssssssssssssssss  " + res);
            if (
              !(
                res.data.status === "Wrong email bruh!" ||
                res.data.status === "Wrong password bruh!"
              )
            ) {
              // console.log("from login");
              // console.log(res.data.token);
              props.onToken();
            } else {
              // console.log(res.data);
            }
          });
      } catch (error) {
        // console.log(error);
      }
    }
  };
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
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      value={user.email}
                      className="form-control"
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                      autofocus
                    />
                  </div>
                  <div className="form-label-group passwordField">
                    <label for="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      name="password"
                      value={user.password}
                      className="form-control"
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <br />
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <hr className="my-4" />
                </form>
                <GoogleLogin
                  clientId="517942336474-lrnvutun4bbneubub8pln5f1st8u04om.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="btn btn-lg btn-google btn-block"
                    >
                      <i className="fab fa-google mr-2"></i> Sign in with Google
                    </button>
                  )}
                  onSuccess={googleResponse}
                  onFailure={googleResponse}
                  cookiePolicy={"single_host_origin"}
                />
                <br />
                <p>
                  Do not have an account?{" "}
                  <button
                    data-testid="switch-to-login"
                    onClick={handleClick}
                    class="registerBtton"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogIn;