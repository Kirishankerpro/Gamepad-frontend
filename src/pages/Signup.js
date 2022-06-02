import "../assets/style/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  // input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setfile] = useState(null);
  // error state
  const [error, setError] = useState("");
  // done State
  /*   const [done, setDone] = useState(""); */
  // state reponse signup
  /*   const [data, setData] = useState();
  // state token
  const [token, setToken] = useState(""); */

  const validSignUpFields = async () => {
    /* setDone(); */
    setError();
    if (username && email && password && confirmPassword) {
      if (file) {
        if (password === confirmPassword) {
          if (password.length > 5) {
            try {
              const response = await axios.post(
                "http://localhost:4000/user/signup",
                {
                  username: username,
                  email: email,
                  password: password,
                }
              );
              if (response.data.token) {
                navigate("/login");
              }
              /* setDone("sucess"); */
            } catch (error) {
              if (error) {
                setError(error.response.data.errorMessage);
              }
            }
          } else {
            setError("Your password should be longer than 5 letters");
          }
        } else {
          setError("Your passwords are no matching");
        }
      } else {
        setError("Please choose an image");
      }
    } else {
      setError("Please complete all fields");
    }
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <div className="signup-left-side">
          <div className="signup-left-side-logo">
            <i className="fa-brands fa-xbox"></i>
          </div>
          <div className="signup-left-side-howitworks">
            <h2>
              <span id="signup-left-side-howitworks-span">How it Works</span> ?{" "}
            </h2>
          </div>
          <div className="signup-left-side-user">
            <i className="fa-solid fa-user"></i>
            <p>
              Log in to your free account to be able to get all features of
              GamePad
            </p>
          </div>
          <div className="signup-left-side-favorite">
            <i className="fa-solid fa-bookmark"></i>
            <p>Add a game to your collection </p>
          </div>
          <div className="signup-left-side-review">
            <i className="fa-solid fa-star"></i>
            <p>Leave a review for a game</p>
          </div>
        </div>
        <div className="signup-right-side">
          <div className="signup-right-side-items">
            <h2> Signup </h2>
            <input
              type="text"
              placeholder="Username..."
              onChange={(event) => {
                setUsername(event.target.value);
                /*                 if (username) {
                  console.log(username);
                } */
              }}
            />
            <input
              type="Email"
              placeholder="Email..."
              onChange={(event) => {
                setEmail(event.target.value);
                /*                 if (email) {
                  console.log(email);
                } */
              }}
            />
            <div className="signup-right-side-items-confirmpassword">
              <input
                type="password"
                placeholder="Password..."
                onChange={(event) => {
                  setPassword(event.target.value);
                  /*                   if (password) {
                    console.log(password);
                  } */
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password..."
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  /*                   if (confirmPassword) {
                    console.log(confirmPassword);
                  } */
                }}
              />
            </div>

            <div className="file-input">
              <input
                type="file"
                id="file"
                className="file"
                onChange={(event) => {
                  setfile(event.target.files[0]);
                  /*                   if (file) {
                    console.log(file);
                  } */
                }}
              />
              <label htmlFor="file">Add a photo</label>
              {file ? <p> {file.name} </p> : null}
            </div>

            {error ? (
              <div className="signup-error">
                <p> {error} </p>
              </div>
            ) : null}

            <button onClick={validSignUpFields}>Register</button>
            <p>
              <Link to="/login">
                You already have an account ? Click here to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
