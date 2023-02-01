import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

export default function ViewOneSkilledCertificate({ props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        View Certificate Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skilled Experience Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="fname"
                  value={props.skilled_id.fname}
                  disabled
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  id="mname"
                  value={props.skilled_id.mname}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              id="last"
              value={props.skilled_id.lname}
              disabled
            ></Form.Control>

            <Form.Label>Category</Form.Label>
            <Form.Control
              id="cat"
              value={props.categorySkill}
              disabled
            ></Form.Control>
            <Form.Label>Title</Form.Label>
            <Form.Control
              id="title"
              value={props.title}
              disabled
            ></Form.Control>

            <Form.Label>Description</Form.Label>
            <Form.Control
              id="desc"
              value={props.desc}
              type="textarea"
              disabled
            ></Form.Control>
            <Container>
              <h6>Character Reference</h6>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Issued On *</Form.Label>
                    <Form.Control
                      type="date"
                      id="issue"
                      placeholder="DateRange"
                      value={props.issuedOn}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Valid Until *</Form.Label>
                    <Form.Control
                      type="date"
                      id="valid"
                      placeholder="DateRange"
                      value={props.validUntil}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                id="last"
                value={props.skilled_id.lname}
                disabled
              ></Form.Control>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                id="last"
                value={props.skilled_id.fname}
                disabled
              ></Form.Control>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                id="last"
                value={props.skilled_id.contact}
                disabled
              ></Form.Control>
            </Container>
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
