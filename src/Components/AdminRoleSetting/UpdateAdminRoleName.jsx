import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function UpdateAdminRoleName({ props }) {
  const { admin } = useAuthContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [roleName, setRoleName] = useState('');

  const updateRoleName = async () => {
    const response = await fetch(`${url}/api/role/update/${props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ roleName }),
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
    await updateRoleName(roleName);
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Label>ROLE NAME</Form.Label>
            <Form.Control
              id="roleName"
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            ></Form.Control>
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
