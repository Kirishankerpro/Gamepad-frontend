import "../assets/style/Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h2 id="error-forbidden"> Forbidden you can't use this page </h2>
      <div className="heart-loader">
        <div></div>
      </div>

      <h2 id="error-link">
        But we love you so we give you a link to return to our home page
      </h2>
      <div className="error-return-arrow">
        <i className="fa-solid fa-arrow-down-long" id="arrow"></i>
      </div>
      <div className="error-return-link">
        <i className="fa-solid fa-arrow-right-long"></i>
        <Link to="/">
          <h2> return home </h2>
        </Link>
        <i className="fa-solid fa-arrow-left-long"></i>
      </div>
      <div className="error-return-arrow">
        <i className="fa-solid fa-arrow-up-long" id="arrow"></i>
      </div>
    </div>
  );
};

export default Error;
