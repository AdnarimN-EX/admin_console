import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';
import { useLogOut } from '../../../Hooks/useLogOut';

export default function AdminDeleteAccount() {
  const { admin, dispatch } = useAuthContext();
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const { logout } = useLogOut();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAccountAdmin = async () => {
    const response = await fetch(`${url}/api/admin/delete/oneAdminInfo`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({}),
    });
    const json = await response.json();
    if (response.ok) {
      alert('Password Updated');
    } else {
      setError(json.error);
    }
  };

  const handleDelete = () => {
    deleteAccountAdmin();
  };

  return (
    <>
      <div className="text-center">
        <Button variant="danger" onClick={handleShow}>
          Account Deletion
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete this Account</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            I Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
