import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function UpdateUsername(props) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, SetUsername] = useState('');

  const updatePassword = async () => {
    const response = await fetch(
      `${url}/api/admin/update/adminUserName/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ username }),
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
    e.preventDefault(username);
    console.log(username);
    await updatePassword(username);
  };
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Update Username
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChanges}>
            <Form.Label>New Username</Form.Label>
            <Form.Control
              id="newUsername"
              type="text"
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            ></Form.Control>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
