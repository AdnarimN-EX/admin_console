import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function ViewOneSkilled(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Info
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skilled Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={props.props.username}
            ></Form.Control>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={props.props.lname}></Form.Control>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={props.props.fname}></Form.Control>
            <Form.Label>Middle Name</Form.Label>
            <Form.Control type="text" value={props.props.mname}></Form.Control>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              value={props.props.contact}
            ></Form.Control>
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
