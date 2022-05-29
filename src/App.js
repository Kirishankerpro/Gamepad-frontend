import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages and components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Gamedetails from "./pages/Gamedetails";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<Gamedetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
