import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function DeleteRoleName({ props }) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [error, setError] = useState('');

  const handleDelete = (e) => {
    deleteAdminRoleName();
  };
  const handleShow = () => setShow(true);

  const deleteAdminRoleName = async () => {
    const response = await fetch(`${url}/api/role/delete/${props._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({}),
    });
    const json = await response.json();

    if (response.ok) {
      alert('Delete');
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        DELETE
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete this Admin Role?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            CONFIRM
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {<span className="text-danger">{error}</span>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
