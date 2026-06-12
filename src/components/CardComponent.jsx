import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardComponent = ({
  destination,
  onSelect,
  isSaved,
  onToggleSave,
}) => {
  return (
    <Card className="destination-card h-100">
      <div className="destination-image-wrapper">
        <Card.Img
          variant="top"
          className="destination-image-card"
          src={destination.imageUrl}
          alt={`${destination.name}, ${destination.country}`}
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
      </div>

      <Card.Body>
        <div>
          <p className="destination-card-location mb-1">
            {destination.country} · {destination.region}
          </p>
          <Card.Title as="h2" className="h4">
            {destination.name}
          </Card.Title>
          <Card.Text>{destination.description}</Card.Text>
        </div>
        <Button
          variant="primary"
          className="destination-details-button"
          onClick={() => onSelect(destination)}
        >
          View details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
