import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function EditProvince(props) {
  const { admin } = useAuthContext();
  const [province, setProvince] = useState(props.props.province);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProvince = async () => {
    const response = await fetch(
      `${url}/api/province/update/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ province }),
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
    console.log(province);
    await updateProvince(province);
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Province</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Edit Province Name</Form.Label>
              <Form.Control
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
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
