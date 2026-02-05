import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardComponent = ({ destination, onSelect}) => {
  return (
    <Card style={{ width: "18rem" }} className="mx-3">
      <Card.Img
        variant="top"
        className="destination-image"
        src={destination.imageUrl}
      />
      <Card.Body>
        <div>
          <Card.Title>{destination.name}</Card.Title>
          <Card.Text>{destination.description}</Card.Text>
        </div>
        <Button variant="primary" onClick={() => onSelect(destination)} >Details</Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
