import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ destination, onClose, isSaved, onToggleSave }) => {
  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <div>
          <Modal.Title>{destination.name}</Modal.Title>
          <p className="modal-destination-subtitle mb-0">
            {destination.country} · {destination.region}
          </p>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0">
        <img
          src={destination.imageUrl}
          className="modal-destination-image"
          alt={`${destination.name}, ${destination.country}`}
        />

        <div className="modal-destination-content">
          <dl className="modal-destination-facts">
            <div>
              <dt>Country</dt>
              <dd>{destination.country}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{destination.region}</dd>
            </div>
            <div>
              <dt>Currency</dt>
              <dd>{destination.currency}</dd>
            </div>
            <div>
              <dt>Destination type</dt>
              <dd className="text-capitalize">{destination.type}</dd>
            </div>
          </dl>

          <section aria-labelledby={`moods-${destination.id}`}>
            <h3 className="h6" id={`moods-${destination.id}`}>
              Travel moods
            </h3>
            <div className="d-flex flex-wrap gap-2">
              {destination.mood.map((mood) => (
                <span
                  className="badge rounded-pill text-bg-secondary text-capitalize"
                  key={mood}
                >
                  {mood}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-4" aria-labelledby={`about-${destination.id}`}>
            <h3 className="h6" id={`about-${destination.id}`}>
              About {destination.name}
            </h3>
            <p className="mb-0">{destination.description}</p>
          </section>
        </div>
      </Modal.Body>

      <Modal.Footer className="modal-destination-footer">
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
