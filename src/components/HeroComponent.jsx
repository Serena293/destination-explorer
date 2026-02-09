import { Container, Button } from "react-bootstrap";
import "../scss/HeroComponent.scss"; 

const HeroComponent = () => {
  return (
    <Container fluid className="hero-container text-center d-flex flex-column justify-content-center align-items-center">
      <h1 className="hero-title mb-3">Find your dream destination</h1>
      <p className="hero-subtitle mb-4">
        Explore amazing places, discover new experiences, and plan your next adventure.
      </p>
      {/* <Button variant="primary" size="lg" className="hero-btn">
        Start Exploring
      </Button> */}
    </Container>
  );
};

export default HeroComponent;
