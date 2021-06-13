import React, { useState } from "react"
import axios from "axios"
import { GoogleLogin } from "react-google-login";
function Register(props) {
  function handleClick() {
    props.onLoggIn("login");
  }
  const [conPassword, setCon] = useState("");
  const [pasHolder, setHolder] = useState("password");
  const [user, setUser] = useState({
    uName: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }
  function handleConChange(event) {
    const { value } = event.target;
    setCon(value);
  }
  function handleSignIn(e) {
    // const user = {
    //   username: this.state.username
    // }

    // console.log(conPassword);
    // console.log(user);
    let registerResponse = {};
    if (conPassword == user.password && user.password.length >= 8) {
      var tttt;
      console.log("registerrrrrrrrr beyatch!");
      
      axios.post("register/", user).then((res) => {
        console.log("registerazdjssakjndkjad    hhh");
        console.log(res.data);
        if (res.data.status === "Check your email please") {
          console.log(res.data.status);
          props.onLoggIn("Confirmation");
        } else {
          console.log(res.data.status);

          console.log(res.data.status);
          window.alert("Wrong Email or Password!\n Try again bro!");
          // props.onToken();
        }
      });
      // if (!(tttt=="user exists already you fuck!")){
      //   props.onToken(tttt)
      // }

      // console.log("register Response "+ JSON.stringify(registerResponse))
    } else {
      if (conPassword != user.password) {
        alert("wrong password!");
      } else if (user.password.length < 8) {
        alert("too short password!");
      }
      // setHolder("Wrong Password")
    }
    e.preventDefault();
    // this.setState({
    //   username: ''
    // })
  }
  async function googleResponse(response) {
    const result = response?.profileObj;
    console.log(response);
    const token = response?.tokenObj.id_token;
    console.log("tk   " + token);
    try {
      axios
        .get("googlesignin/", { params: { token: token } })
        .then(function (res) {
          console.log("ressssssssssssssssss  " + res);
          if (
            !(
              res.data.status === "Wrong email bruh!" ||
              res.data.status === "Wrong password bruh!"
            )
          ) {
            console.log("from login");
            console.log(res.data.token);
            props.onToken();
            //props.onLoggIn("home");
          } else {
            console.log(res.data);
            // props.onNote(res.data)
          }
        });
    } catch (error) {
      console.log(error);
    }
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
                    <input
                      type="text"
                      id="inputName"
                      className="form-control"
                      value={user.uname}
                      onChange={handleChange}
                      name="uName"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-label-group">
                    <label for="inputEmail">Email address</label>
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      value={user.email}
                      onChange={handleChange}
                      name="email"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                  </div>

                  <div className="form-label-group">
                    <label for="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      value={user.password}
                      onChange={handleChange}
                      name="password"
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label for="inputConfirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      name="conPassword"
                      value={conPassword}
                      onChange={handleConChange}
                      className="form-control"
                      required
                    />
                  </div>

                  {/* <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                  </div> */}
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <hr className="my-4" />
                </form>
                <GoogleLogin
                  clientId="517942336474-lrnvutun4bbneubub8pln5f1st8u04om.apps.googleusercontent.com"
                  clientId="517942336474-lrnvutun4bbneubub8pln5f1st8u04om.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="btn btn-lg btn-google btn-block"
                    >
                      <i className="fab fa-google mr-2"></i> Sign up with Google
                    </button>
                  )}
                  onSuccess={googleResponse}
                  onFailure={googleResponse}
                />
                {/* <button className="btn btn-lg btn-google btn-block text-uppercase">
                    <i className="fab fa-google mr-2"></i> Sign in with Google
                  </button> */}
                <button className="btn btn-lg btn-facebook btn-block text-uppercase">
                  <i className="fab fa-facebook-f mr-2"></i> Sign in with
                  Facebook
                </button>
                <br />
                <p>
                  already have an account?{" "}
                  <button onClick={handleClick} class="registerBtton">
                    Sign In
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
export default Register;