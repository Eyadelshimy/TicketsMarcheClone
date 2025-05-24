import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function EventDescriptionModal({
  show,
  handleClose,
  image,
  title,
  description,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Card>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default EventDescriptionModal;
