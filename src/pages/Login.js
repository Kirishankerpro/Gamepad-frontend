import "../assets/style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  // states for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error state
  const [error, setError] = useState("");
  // done state
  const [done, setDone] = useState("");
  // data state
  const [data, setData] = useState();
  // token state
  /* const [token, setToken] = useState(); */

  const validLoginFields = () => {
    setError();
    setDone();
    if (email) {
      if (password) {
        setDone("Login request sended");
      } else {
        setError("Please complete password");
      }
    } else {
      setError("Please complete email");
    }
  };

  const validLogin = async () => {
    if (done) {
      try {
        const response = await axios.post(
          "http://localhost:4000/user/login",
          /* "https://gamepad-users.herokuapp.com/user/login", */
          {
            email: email,
            password: password,
          }
        );
        if (response.data.token) {
          Cookies.set("userTokenGamepad", response.data.token, { expires: 10 });
          navigate("/");
        }
        setData(response.data);
        /* setToken(response.data.token); */
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  console.log(data);

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-left-side">
          <div className="login-left-side-logo">
            <i className="fa-brands fa-xbox"></i>
          </div>
          <div className="login-left-side-howitworks">
            <h2>
              <span id="login-left-side-howitworks-span">How it Works</span> ?
            </h2>
          </div>
          <div className="login-left-side-user">
            <i className="fa-solid fa-user"></i>
            <p>
              Log in to your free account to be able to get all features of
              GamePad
            </p>
          </div>
          <div className="login-left-side-favorite">
            <i className="fa-solid fa-bookmark"></i>
            <p>Add a game to your collection </p>
          </div>
          <div className="login-left-side-review">
            <i className="fa-solid fa-star"></i>
            <p>Leave a review for a game</p>
          </div>
        </div>
        <div className="login-right-side">
          <div className="login-right-side-items">
            <h2> Login </h2>

            <input
              type="email"
              placeholder="Email..."
              onChange={(event) => {
                setEmail(event.target.value);
                if (email) {
                  console.log(email);
                }
              }}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setPassword(event.target.value);
                if (password) {
                  console.log(password);
                }
              }}
            />
            {error ? (
              <div className="login-error">
                <p> {error} </p>
              </div>
            ) : null}
            {done ? (
              <div className="login-done">
                <p> {done} </p>
              </div>
            ) : null}
            <button
              onClick={() => {
                validLoginFields();
                validLogin();
              }}
            >
              Connection
            </button>
            <p>
              <Link to="/signup">
                Don't have an account yet ? Click here to signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
