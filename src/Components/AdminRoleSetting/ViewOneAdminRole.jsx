import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function ViewOneAdminRole(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        View Role and Capbility
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              value={props.props.adminInfo_id.username}
              disabled
            ></Form.Control>
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              id="role"
              value={props.props.role_id.roleName}
              disabled
            ></Form.Control>
            <Form.Label>Capability Name</Form.Label>
            <Form.Control
              id="capa"
              value={props.props.capability_id.capabilityName}
              disabled
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
