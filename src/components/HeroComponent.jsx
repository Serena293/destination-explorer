import "../scss/HeroComponent.scss";
import { Link } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";

const HeroComponent = () => {
  return (
    <>
      <CarouselComponent />

      <div className="d-flex justify-content-center gap-5 bg-transparent py-3">
        <Link
          to="/ourdestinations"
          className="btn btn-link text-dark fw-bold border-bottom border-2"
        >
          Our Destinations
        </Link>
        <Link
          to="/bespoke"
          className="btn btn-link text-dark fw-bold border-bottom border-2"
        >
          Bespoke Trip
        </Link>
      </div>
    </>
  );
};

export default HeroComponent;
