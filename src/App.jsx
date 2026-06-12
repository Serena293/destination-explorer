import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import HomePage from "./pages/HomePage";
import "./index.css";

import OurDestinations from "./components/OurDestinations";
import ContactForm from "./components/ContactForm";
import ShortlistPage from "./pages/ShortlistPage";

const BespokeTrip = lazy(() => import("./components/BespokeTrip"));

function App() {
  return (
    <BrowserRouter>
      <main className="app-container">
        <CustomNavbar />
        <div className="main-content">
          <Suspense
            fallback={
              <p className="text-center my-5">Loading trip planner...</p>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/ourdestinations" element={<OurDestinations />} />
              <Route path="/bespoke" element={<BespokeTrip />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="ShortlistPage" element={<ShortlistPage/>}/>
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
