import "../assets/style/Collection.css";
import { useNavigate } from "react-router-dom";

const Collection = ({ token, username }) => {
  const navigate = useNavigate();
  const redirection = () => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  return (
    <div className="collection">
      {token ? (
        <div className="collection-items">
          <h3> Welcome to your Collection {username}</h3>
          <div className="collection-items-collections"></div>
        </div>
      ) : (
        <div className="collection-non-authenticated">
          <div className="heart-loader">
            <div></div>
          </div>
          <p> You have to login to see this page </p>
          <p> You will be redirected to the home page </p>
          {redirection()}
        </div>
      )}
    </div>
  );
};

export default Collection;
