import "../assets/style/Gamedetails.css";
import "../assets/style/Home.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Gamedetails = () => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    const gamesDetails = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-back-kingx.herokuapp.com/games/id?id=${id}`
        );
        setData(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    gamesDetails();
  });
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
          <div>
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
          <div className="">
            <div>
              <div>
                <p> Saved to Collection </p>
              </div>
              <div>
                <p> Add Review </p>
              </div>
            </div>
            <div className="gamedetails-cards-items">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetails;
