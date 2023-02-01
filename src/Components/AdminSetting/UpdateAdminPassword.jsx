import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function UpdateAdminPassword(props) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newpass, setNewPass] = useState('');

  const updatePassword = async () => {
    const response = await fetch(
      `${url}/api/admin/update/adminPass/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ newpass }),
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
    e.preventDefault(newpass);
    console.log(newpass);
    await updatePassword(newpass);
  };
  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Update Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChanges}>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              id="newPass"
              type="password"
              value={newpass}
              onChange={(e) => setNewPass(e.target.value)}
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
