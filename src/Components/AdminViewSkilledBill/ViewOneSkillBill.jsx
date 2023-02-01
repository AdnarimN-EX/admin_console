import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

export default function ViewOneSkillBill({ props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        View Bill Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skilled Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Photo</Form.Label>
            <Form.Control
              id="photo"
              type="text"
              value={props.billPhoto}
            ></Form.Control>
            <Form.Label>Bill Issue On</Form.Label>
            <Form.Control
              id="issue"
              type="text"
              value={props.billIssuedOn}
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
