import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmModal({ title, body, onCancel, onConfirm }) {
  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4>{body}</h4>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
