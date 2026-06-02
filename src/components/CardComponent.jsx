import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


const CardComponent = ({ destination, onSelect}) => {
  return (
    <Card className="mx-3 w-100 h-100">
      <Card.Img
        variant="top"
        className="destination-image-card"
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
