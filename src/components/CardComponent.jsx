import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";



const CardComponent = ({ destination, onSelect, isSaved, onToggleSave}) => {

  return (
    <Card className="mx-3 w-100 h-100">
      <Card.Img
        variant="top"
        className="destination-image-card"
        src={destination.imageUrl}
      />
      <button
  className="save-destination-button"
  type="button"
  onClick={onToggleSave}
  aria-pressed={isSaved}
  aria-label={
    isSaved
      ? `Remove ${destination.name} from shortlist`
      : `Save ${destination.name} to shortlist`
  }
>
  <i
    className={`bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}`}
    aria-hidden="true"
  />
</button>
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
