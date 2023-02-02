import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

function VerifyEXP({ props }) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [expIsVerified, setExpIsVerified] = useState(props.expIsVerified);

  const updateExpVerify = async () => {
    const response = await fetch(
      `${url}/api/admin/update/SkilledExp/${props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ expIsVerified }),
      }
    );

    if (response.ok) {
      alert('Update');
    }
    if (!response.ok) {
      alert('Fail');
    }
  };

  const handleChanges = async (e) => {
    e.preventDefault();
    await updateExpVerify(expIsVerified);
  };

  console.log(expIsVerified);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Experience Verify
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    id="fname"
                    value={props.refFname}
                    disabled
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    id="mname"
                    value={props.refMname}
                    disabled
                  ></Form.Control>
                </Col>
              </Row>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                id="last"
                value={props.refLname}
                disabled
              ></Form.Control>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                id="last"
                value={props.refContactNo}
                disabled
              ></Form.Control>
            </Container>
            <Form.Label>Verification</Form.Label>
            <Form.Select
              value={expIsVerified}
              onChange={(e) => setExpIsVerified(e.target.value)}
              size="sm"
            >
              <option value="null">Open this select menu</option>
              <option value="0">Not Verified</option>
              <option value="1">Verified</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VerifyEXP;
