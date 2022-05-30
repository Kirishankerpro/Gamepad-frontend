import "../assets/style/Home.css";
import "../assets/style/Loading.css";
import Pass from "../assets/img/pass.jpeg";

// ScrollUpButton
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

// components

import Pages from "../components/Pages";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  //#region States
  const [allPlatform, setAllPlatform] = useState(false);

  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [search, setSearch] = useState("");

  // states for filters
  const [playStation, setPlayStation] = useState(false);
  const [xbox, setXbox] = useState(false);
  const [pc, setPc] = useState(false);

  const [platform, setPlatform] = useState("");
  const [platformChoose, setPlatformChoose] = useState(null);
  const [platFormName, setplatFormName] = useState(null);

  //pageNumber state
  const [pageNumber, setPageNumber] = useState(1);
  //#endregion states

  //#region function validatebutton
  const filterValidButton = () => {
    setPlatform(null);
    if (pc === true) {
      setPlatform(1);
      console.log(platform);
    } else if (xbox === true) {
      setPlatform(2);
      console.log(platform);
    } else if (playStation === true) {
      setPlatform(3);
      console.log(platform);
    } else if (allPlatform === true) {
      setPlatform("");
      console.log(platform);
    }
  };
  //#endregion function validateButton

  //#region function setPlatformNameFunction
  const setPlatformNameFunction = () => {
    if (platformChoose) {
      console.log(platformChoose);
      setplatFormName(platformChoose);
    }
  };
  //#endregion setPlatformNameFunction

  //#region fetchData Axios
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-back-kingx.herokuapp.com/games?search=${search}&pageNumber=${pageNumber}&platformNumber=${platform}`
        );
        setdata(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [search, platform, pageNumber]);
  //#endregion fetchData

  //#region counterResults
  const counterResults = (data) => {
    const tab = [];
    let results = "";
    let existTest = "";
    for (let i = 0; i < data.length; i++) {
      /* console.log(data.results[i]); */
      for (let j = 0; j < data[i].parent_platforms.length; j++) {
        results = data[i].parent_platforms[j].platform.name;

        existTest = tab.indexOf(results);

        // verify if results exist in tab
        if (existTest === -1) {
          tab.push(results);
        }
      }
    }
    return tab;
  };
  //#endregion counterresults

  return isLoading ? (
    //#region Loading
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
    //#endregion Loading
    <div className="home">
      <div className="gamepad">
        <div className="gamepad-and-logo">
          <i className="fa-brands fa-xbox"></i>
          <h1>Gamepad</h1>
        </div>
        <div className="gamepad-and-logo-searchbox">
          <div className="gamepad-and-logo-searchbox-boxes">
            <div className="gamepad-and-logo-searchbox-boxes-input">
              <input
                type="text"
                placeholder="Search for a game..."
                onChange={(event) => {
                  setSearch(event.target.value);
                  /* console.log(search); */
                }}
              />
            </div>
            <div className="gamepad-and-logo-searchbox-boxes-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className="gamepad-and-logo-games">
          {search ? (
            <div className="search-results">
              <h2>
                Search results for "
                <span id="search-results-underline">{search}</span>"
              </h2>
            </div>
          ) : null}
          <p>
            Search {data.count} games
            {platFormName ? <span> for {platFormName}</span> : null}
          </p>
        </div>
      </div>
      <div className="games">
        <div className="games-title">
          {search ? null : <h2> Most Relevance Games </h2>}
        </div>
        {search !== "" ? (
          <div className="games-filter">
            <div className="games-filter-plateform">
              <label htmlFor="select-platforms"> Choose a platform : </label>
              <select
                className="platforms"
                id="platforms"
                onChange={(event) => {
                  setAllPlatform(false);
                  setPlayStation(false);
                  setPc(false);
                  setXbox(false);
                  if (event.target.value === "all") {
                    setAllPlatform(true);
                    setPlatformChoose("all platforms");
                  } else if (event.target.value === "playstation") {
                    setPlayStation(true);
                    setPlatformChoose("Playstation");
                  } else if (event.target.value === "xbox") {
                    setXbox(true);
                    setPlatformChoose("Xbox");
                  } else if (event.target.value === "pc") {
                    setPc(true);
                    setPlatformChoose("Pc");
                  }
                }}
              >
                <option value="choose-platform-option">
                  {" "}
                  Choose an option...
                </option>
                <option value="all"> All platforms </option>
                <option value="playstation"> playstation </option>
                <option value="xbox"> Xbox </option>
                <option value="pc"> PC </option>
              </select>
              <label htmlFor="select-platforms"> type : </label>
              <select
                className="type"
                id="type"
                onChange={() => {
                  console.log("type");
                }}
              >
                <option value="select-console-option">
                  Choose your console...
                </option>
                {counterResults(data.results) ? (
                  counterResults(data.results).map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })
                ) : (
                  <option> nothing </option>
                )}
              </select>
            </div>

            <div className="games-filter-valid-button">
              <label htmlFor="select-platforms"> Sort by : </label>
              <select className="type" id="type" onClick={(event) => {}}>
                <option value="Default"> Choose an option... </option>
                <option value="Default"> All </option>
                <option value="Default"> Date </option>
                <option value="Default"> Size </option>
              </select>
              <button
                onClick={() => {
                  /* console.log("from valid parameters buttons"); */
                  filterValidButton();
                  setPlatformNameFunction();
                }}
              >
                Valid Filters
              </button>
            </div>
          </div>
        ) : null}

        <div className="cards">
          {data.results.map((game, index) => {
            return (
              <div className="card-items" key={index}>
                <Link to={`games/${data.results[index].id}`}>
                  <div className="cards-image">
                    <img
                      src={game.background_image ? game.background_image : Pass}
                      alt={game.name}
                      title={game.name}
                    />
                    <div className="cards-title">
                      <h2> {game.name}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <ScrollUpButton
          style={{
            background: "#ff4656",
            borderRadius: 50,
            width: 30,
            height: 30,
            zIndex: 20,
          }}
        />
        <Pages
          setPageNumber={setPageNumber}
          data={data}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default Home;
