import "../assets/style/Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token }) => {
  const deleteToken = () => {
    Cookies.remove("userTokenGamepad");
  };
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-items">
        <div className="header-logo">
          <Link to="/">
            <i className="fa-brands fa-xbox"></i>
            <h1>Gamepad</h1>
          </Link>
        </div>
        <div className="header-items-buttons">
          {token === null ? (
            <button
              id="collection-home-button"
              onClick={() => {
                alert("You have to login to see collection section");
              }}
            >
              My Collection
            </button>
          ) : (
            <Link to="/collection">
              <button id="collection-home-button"> My collection </button>
            </Link>
          )}
          {token === null ? (
            <NavLink to="/login" activeclassname="active">
              <button id="collection-login-button">Login</button>
            </NavLink>
          ) : (
            <button
              id="collection-login-button"
              onClick={() => {
                deleteToken();
                navigate("/");
                window.location.reload(true);
              }}
            >
              logout
            </button>
          )}
        </div>
        {/* burger */}
        <div className="nav-burger">
          <div className="wrapper">
            <a href="#demo-modal">
              <i className="fa-solid fa-bars"></i>
            </a>
          </div>

          <div id="demo-modal" className="modal">
            <div className="modal__content">
              <h3> Menu </h3>

              <div className="header-items-buttons-mobile">
                <button id="collection-home-button-mobile">
                  My Collection
                </button>

                <Link to="/login">
                  <button id="collection-login-button-mobile">Login</button>
                </Link>
              </div>

              <a href="https://www.google.fr/" className="modal__close">
                <i className="fa-solid fa-xmark"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
