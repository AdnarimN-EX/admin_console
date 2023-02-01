import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function ViewOneSkilledAddress(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        View Address
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skilled Info Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              value={props.props.address.houseNo}
            ></Form.Control>
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              value={props.props.address.street}
            ></Form.Control>
            <Form.Label>Barangay</Form.Label>
            <Form.Control
              type="text"
              value={props.props.address.barangay}
            ></Form.Control>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={props.props.address.city}
            ></Form.Control>
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              value={props.props.address.prov}
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
