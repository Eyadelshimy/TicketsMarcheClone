import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

import { getRoleIcon } from "../utils/roleIcons";
import { useState } from "react";

export default function EditUserRoleModal({
  name,
  show,
  handleClose,
  onRoleChange,
  onConfirm,
}) {
  const [role, setRole] = useState(null);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update User Role</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <Col className="text-center">
              <Row className="d-flex justify-content-center mb-4">
                <h3>User: {name}</h3>
              </Row>
              <Row className="d-flex justify-content-center mb-3">
                <DropdownButton
                  title={role || "Select Role"}
                  onSelect={(e) => {
                    onRoleChange(e);
                    setRole(e);
                  }}
                >
                  <Dropdown.Item eventKey={"User"}>
                    <div className="d-flex align-items-center gap-2">
                      {getRoleIcon("user")}
                      <span>User</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={"Organizer"}>
                    <div className="d-flex align-items-center gap-2">
                      {getRoleIcon("organizer")}
                      <span>Organizer</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={"Admin"}>
                    <div className="d-flex align-items-center gap-2">
                      {getRoleIcon("admin")}
                      <span>Admin</span>
                    </div>
                  </Dropdown.Item>
                </DropdownButton>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
