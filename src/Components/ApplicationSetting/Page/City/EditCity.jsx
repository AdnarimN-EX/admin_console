import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function EditCity(props) {
  const { admin } = useAuthContext();
  const [city, setCity] = useState(props.props.city);
  const [prov, setProv] = useState(props.props.province_id._id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateCity = async () => {
    const response = await fetch(`${url}/api/city/update/${props.props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ city }),
    });

    if (response.ok) {
      alert('Updated');
    }
    if (!response.ok) {
      alert('Fail');
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(city);
    await updateCity(city);
  };

  console.log(city);
  console.log(prov);
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Edit City Name</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
