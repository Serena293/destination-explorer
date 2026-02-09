import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import HomePage from "./pages/HomePage";

import "./index.css";
import "./App.css";
import BespokeTrip from "./components/BespokeTrip";
import OurDestinations from "./components/OurDestinations"

function App() {
  return (
    <>
      <CustomNavbar />
      <main className="app-container">
        <div className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/our-destinations" element={<OurDestinations/>}></Route>
            <Route path="/bespoke" element={<BespokeTrip/>}></Route>
          </Routes>
        </Router>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
