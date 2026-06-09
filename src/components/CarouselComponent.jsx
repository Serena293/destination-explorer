import Carousel from "react-bootstrap/Carousel";

function CarouselComponent() {
  return (
    <Carousel>
      <Carousel.Item interval={3500}>
        <img
          className="d-block w-100"
          src="/destinations/puntacana.jpg"
          alt="Punta Cana beach resort coastline"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Beach escapes made simple</h3>
          <p>Find warm-weather destinations without opening endless tabs.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={3500}>
        <img
          className="d-block w-100"
          src="/destinations/newzealand.jpg"
          alt="New Zealand mountain landscape"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Adventure, culture, or calm</h3>
          <p>Filter destinations by the kind of trip you want to take.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={3500}>
        <img
          className="d-block w-100"
          src="/destinations/naples.jpg"
          alt="Naples city street and coastline"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Compare places at a glance</h3>
          <p>Explore rich travel data and narrow down your next destination.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
