import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import "./App.css";
import "./index.css";
import HeroComponent from "./components/HeroComponent";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <CustomNavbar />
      <main className="app-container">
        <div className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </Router>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
