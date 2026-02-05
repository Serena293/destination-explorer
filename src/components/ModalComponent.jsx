import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ destination, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{destination.name}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <p><strong>Country:</strong> {destination.country}</p>
          <p><strong>Region:</strong> {destination.region}</p>
          <p><strong>Mood:</strong> {destination.mood}</p>
        </div>
        <p><strong>Description:</strong></p>
        <p>{destination.description}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;