import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ViewOneAdmin(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(props.props.lname);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Info</Modal.Title>
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
