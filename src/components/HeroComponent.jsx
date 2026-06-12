import "../scss/HeroComponent.scss";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-content">
        <h1 id="home-hero-title">Destination Explorer</h1>
        <p>
          Find a trip that matches how you want to travel, then save your
          favourites or build a personalised trip brief.
        </p>

        <div className="home-hero-actions">
          <Link
            to="/ourdestinations"
            className="btn btn-primary"
          >
            Explore destinations
          </Link>
          <Link
            to="/bespoke"
            className="btn btn-light"
          >
            Build your trip
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
