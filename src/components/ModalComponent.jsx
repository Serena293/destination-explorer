import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ destination, onClose, isSaved, onToggleSave }) => {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton className="d-flex align-items-start">
        <div className="flex-grow-1">
          <Modal.Title>{destination.name}</Modal.Title>
          <img
            src={destination.imageUrl}
            className="w-100 mt-2"
            style={{ maxHeight: "200px", objectFit: "contain" }}
            alt={`${destination.name}, ${destination.country}`}
          />
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <p>
            <strong>Country:</strong> {destination.country}
          </p>
          <p>
            <strong>Region:</strong> {destination.region}
          </p>

          <p>
            {" "}
            <strong>Mood:</strong>{" "}
            {destination.mood.join(", ")}
          </p>
        </div>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{destination.description}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant={isSaved ? "outline-secondary" : "primary"}
          type="button"
          onClick={onToggleSave}
          aria-pressed={isSaved}
        >
          <i
            className={`bi ${
              isSaved ? "bi-bookmark-fill" : "bi-bookmark"
            } me-2`}
            aria-hidden="true"
          />

          {isSaved ? "Remove from shortlist" : "Save to shortlist"}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
