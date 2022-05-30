import "../assets/style/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login-box">
        <div className="login-left-side">
          <div className="login-left-side-logo">
            <i className="fa-brands fa-xbox"></i>
          </div>
          <div className="login-left-side-howitworks">
            <h2>
              <span id="login-left-side-howitworks-span">How it Works</span> ?{" "}
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
            <i class="fa-solid fa-star"></i>
            <p>Leave a review for a game</p>
          </div>
        </div>
        <div className="login-right-side">
          <div className="login-right-side-items">
            <h2> Login </h2>
            <input type="text" placeholder="Email..." />
            <input type="text" placeholder="Password..." />
            <button>Connection </button>
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
