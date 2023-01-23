import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function EditSkill(props) {
  const { admin } = useAuthContext();
  const [skill, setSkill] = useState(props.props.skill);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateSkill = async () => {
    const response = await fetch(
      `${url}/api/adminSkill/update/${props.props._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ skill }),
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
    console.log(skill);
    await updateSkill(skill);
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
              <Form.Label>Edit Skill Name</Form.Label>
              <Form.Control
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
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
