import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function VerifyBill({ props }) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [billIsVerified, setBillIsVerified] = useState(props.billIsVerified);
  const [billDueDate, setBillDueDate] = useState(props.billDueDate);

  console.log(billDueDate);

  const updateBillVerify = async () => {
    const response = await fetch(
      `${url}/api/admin/update/skilledBill/${props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ billIsVerified, billDueDate }),
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
    await updateBillVerify(billIsVerified, billDueDate);
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Bill Verify
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Valid Until *</Form.Label>
              <Form.Control
                type="date"
                id="valid"
                placeholder="DateRange"
                value={billDueDate}
                onChange={(e) => setBillDueDate(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Verification</Form.Label>
            <Form.Select
              value={billIsVerified}
              onChange={(e) => setBillIsVerified(e.target.value)}
              size="sm"
            >
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
