import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function Verify(props) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idIsVerified, setIdIsVerified] = useState('');

  const updateIdVerify = async () => {
    const response = await fetch(
      `${url}/api/admin/update/Skilled/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ idIsVerified }),
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
    e.preventDefault(idIsVerified);
    await updateIdVerify(idIsVerified);
  };

  console.log(idIsVerified);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        ID Verify
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Barangay Clearance</Form.Label>
            <Form.Control
              type="text"
              value={props.props.brgyClearance}
            ></Form.Control>
            <Form.Label>NBI Clearance</Form.Label>
            <Form.Control
              type="text"
              value={props.props.nbiClearance}
            ></Form.Control>
            <Form.Label>Verification</Form.Label>
            <Form.Select
              value={idIsVerified}
              onChange={(e) => setIdIsVerified(e.target.value)}
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
          <Button variant="primary" type="submit" onClick={handleChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
