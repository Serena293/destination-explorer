import { Container, Button, Carousel } from "react-bootstrap";
import "../scss/HeroComponent.scss";
import { Link } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";


const HeroComponent = () => {
  return (
    <>
      {/* <Container
        fluid
        className="hero-container text-center d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="hero-title mb-3">Find your dream destination</h1>
        <p className="hero-subtitle mb-4">
          Explore amazing places, discover new experiences, and plan your next
          adventure.
        </p>
      </Container>{" "} */}
      <CarouselComponent/>

      <div className="d-flex justify-content-center gap-5 bg-transparent py-3">
        <Link to="/ourdestinations">
          <button className="btn btn-link text-dark fw-bold border-bottom border-2">
            Our Destination
          </button>
        </Link>
        <Link to="/bespoke">
          <button className="btn btn-link text-dark fw-bold border-bottom border-2">
            Bespoke trip
          </button>
        </Link>
      </div>
    </>
  );
};

export default HeroComponent;
