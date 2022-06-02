import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// pages and components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Gamedetails from "./pages/Gamedetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Collection from "./pages/Collection";

function App() {
  // state cookie
  const [token, setToken] = useState(Cookies.get("userTokenGamepad") || null);
  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userTokenGamepad", token, { expires: 10 });
    } else {
      Cookies.remove("userTokenGamepad");
    }
    setToken(token);
  };

  return (
    <div className="app">
      <Router>
        <Header token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<Gamedetails />} />
          <Route path="/login" element={<Login setuser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          {token ? <Route path="/collection" element={<Collection />} /> : null}
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
