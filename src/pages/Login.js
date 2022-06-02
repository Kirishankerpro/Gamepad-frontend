import "../assets/style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ token, setToken, setUsername }) => {
  console.log(token);
  const navigate = useNavigate();
  // states for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error state
  const [error, setError] = useState("");
  // done state
  /*   const [done, setDone] = useState(""); */
  // data state
  /*   const [data, setData] = useState(); */
  // token state

  const redirection = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const validLogin = async () => {
    setError();
    if (email) {
      if (password) {
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
            Cookies.set("userTokenGamepad", response.data.token, {
              expires: 10,
            });
            Cookies.set("userName", response.data.account.username, {
              expires: 10,
            });
            setToken(response.data.token);
            navigate("/");
            window.location.reload(true);
          }
        } catch (error) {
          if (error) {
            setError(error.response.data.errorMessage);
          }
        }
      } else {
        setError("Please complete password");
      }
    } else {
      setError("Please complete email");
    }
  };

  return token ? (
    <div className="login-authenticated">
      <img
        src="https://media1.giphy.com/media/b7lp44pNiRqsU/giphy.gif?cid=ecf05e47icju405n2gn0ze2dm90lij1cbhbojjz9jv4o5k2p&rid=giphy.gif&ct=g"
        alt="loading"
      />
      <p> Oops Already connected ! </p>
      <p> You will be redirected to the home Page with love ❤️</p>
      <div className="heart-loader">
        <div></div>
      </div>
      {redirection()}
    </div>
  ) : (
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
              }}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {error ? (
              <div className="login-error">
                <p> {error} </p>
              </div>
            ) : null}
            <button
              onClick={() => {
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
