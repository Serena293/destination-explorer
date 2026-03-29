import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import HomePage from "./pages/HomePage";


import "./index.css";
import "./App.css";
import BespokeTrip from "./components/BespokeTrip";
import OurDestinations from "./components/OurDestinations"
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <>
      <CustomNavbar />
      <main className="app-container">
        <div className="main-content">
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/ourdestinations" element={<OurDestinations/>}></Route>
            <Route path="/bespoke" element={<BespokeTrip/>}></Route>
            <Route path="/contact" element={<ContactForm/>}> </Route>
          </Routes>
        </Router>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
