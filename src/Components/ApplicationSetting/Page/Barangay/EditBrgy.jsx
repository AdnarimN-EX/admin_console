import React, { useState } from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function EditBrgy(props) {
  const { admin } = useAuthContext();
  const [barangay, setBarangay] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateBrgy = async () => {
    const response = await fetch(
      `${url}/api/barangay/update/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ barangay }),
      }
    );

    if (response.ok) {
      alert('Updated');
    }
    if (!response.ok) {
      alert('Fail');
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(barangay);
    await updateBrgy(barangay);
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Edit Brgy Name</Form.Label>
              <Form.Control
                type="text"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Container className="text-center">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
