import "../assets/style/Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [file, setfile] = useState(null);

  console.log(file);
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
            <input type="text" placeholder="Username..." />
            <input type="text" placeholder="Email..." />
            <div className="signup-right-side-items-confirmpassword">
              <input type="text" placeholder="Password..." />
              <input type="text" placeholder="Confirm Password..." />
            </div>

            <div className="file-input">
              <input
                type="file"
                id="file"
                className="file"
                onChange={(event) => {
                  setfile(event.target.files[0]);
                }}
              />
              <label htmlFor="file">Add a photo</label>
              {file ? <p> {file.name} </p> : null}
            </div>

            <button> Register </button>
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
