import "../assets/style/Gamedetails.css";
import "../assets/style/Home.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// ScrollUpButton
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const Gamedetails = () => {
  const [isLoading, setisLoading] = useState(true);
  const [similarGames, setSimilarGames] = useState();

  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const gamesDetails = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-back-kingx.herokuapp.com/games/id?id=${id}`
        );
        setData(response.data);
        if (response.data.slug) {
          try {
            const responseSimilar = await axios.get(
              `https://gamepad-back-kingx.herokuapp.com/games/similar?otherSlug=${response.data.slug}`
            );
            setSimilarGames(responseSimilar.data);
            setisLoading(false);
          } catch (error) {
            console.log(error.message);
          }
        }
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    gamesDetails();
  }, [id]);

  // cleaning html tags
  let result = "";
  if (data) {
    const regex = /(<([^>]+)>)/gi;
    result = data.description_raw.replace(regex, "");
  }

  return isLoading ? (
    <div className="loading">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2> Please wait the page is loading </h2>
    </div>
  ) : (
    <div className="gamedetails">
      <div className="gamedetails-items">
        <div className="gamedetails-cards-title">
          <h2>{data.name}</h2>
        </div>
        <div className="gamedetails-cards">
          <div className="gamedetails-cards-left-side">
            <div className="gamedetails-cards-image">
              <a href={data.background_image} target="_blank" rel="noreferrer">
                <img
                  src={data.background_image}
                  alt={data.name}
                  title={data.name}
                ></img>
              </a>
            </div>
          </div>
          <div className="gamedetails-cards-right-side">
            <div className="gamedetails-cards-right-side-save-review">
              <div className="gamedetails-cards-right-side-save-review-collection">
                <p>
                  Saved to <span>Collection</span>
                  <i className="fa-solid fa-bookmark"></i>
                </p>
              </div>
              <div className="gamedetails-cards-right-side-save-review-review">
                <p>
                  Add a Review <i className="fa-solid fa-comment-dots"></i>
                </p>
              </div>
            </div>
            <div className="gamedetails-cards-right-side-right-items">
              <div className="gamedetails-cards-items-left-side">
                <div className="gamedetails-cards-items-left-side-platforms">
                  <h4> Plateforms </h4>
                  <div className="gamedetails-cards-items-left-side-platforms-items">
                    {data.platforms.map((item, index) => {
                      return (
                        <span key={index}> {item.platform.name + ","} </span>
                      );
                    })}
                  </div>
                </div>
                <div className="gamedetails-cards-items-left-side-released-date">
                  <h4> Released Date </h4>
                  <p> {data.released}</p>
                </div>
                <div className="gamedetails-cards-items-left-side-publisher">
                  <h4> Publisher/s </h4>
                  {data.publishers.map((item, index) => {
                    return <p key={index}> {item.name}</p>;
                  })}
                </div>
              </div>
              <div className="gamedetails-cards-right-side-right-items-all">
                <div className="gamedetails-cards-right-side-right-items-all-genre">
                  <h4> Genre </h4>
                  <div className="gamedetails-cards-right-side-right-items-all-genre-p">
                    {data.genres.map((item, index) => {
                      return <span key={index}> {item.name + ", "}</span>;
                    })}
                  </div>
                </div>
                <div className="gamedetails-cards-right-side-right-items-developpers">
                  <h4> Developper/s</h4>
                  {data.developers.map((item, index) => {
                    return <span key={index}> {item.name + ", "}</span>;
                  })}
                </div>
                <div className="gamedetails-cards-right-side-right-items-stores">
                  <h4> Store/s</h4>
                  {data.stores.map((item, index) => {
                    return <span key={index}> {item.store.name + ", "}</span>;
                  })}
                </div>
              </div>
            </div>
            <div className="gamedetails-cards-right-side-right-items-description">
              <h4> About </h4>
              <p> {result} </p>
            </div>
          </div>
        </div>
        <div className="gamedetails-games-match">
          {similarGames.count > 0 ? (
            <div className="gamedetails-games-match-items">
              <h2>
                <span>Games like </span>
                {data.name}
              </h2>
              <ScrollUpButton
                style={{
                  background: "#ff4656",
                  borderRadius: 50,
                  width: 30,
                  height: 30,
                  zIndex: 20,
                }}
              />
              <div className="gamedetails-similar-games">
                {similarGames.results.map((item, index) => {
                  return (
                    <div className="gamedetails-similar-games-images">
                      <Link to={`/games/${similarGames.results[index].id}`}>
                        <img
                          src={item.background_image}
                          alt={item.name}
                          title={item.name}
                        />
                        <div className="gamedetails-similar-games-title">
                          <p> {item.name}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <div className="gamedetails-games-review">
          <div className="gamedetails-games-review-title">
            <h2> Review/s </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetails;
