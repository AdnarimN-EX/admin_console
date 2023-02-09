import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function DeleteSkilledWorker({ props }) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);

  const handleDelete = (e) => {
    deleteAdmin();
    handleClose();
  };
  const handleShow = () => setShow(true);

  const deleteAdmin = async () => {
    const response = await fetch(
      `${url}/api/admin/delete/Skilled/${props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({}),
      }
    );
    const json = await response.json();
    if (response.ok) {
      alert(json.error);
      setError('Success');
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        DELETE
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete this Skilled Worker?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            CONFIRM
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <div className="text-center">{error}</div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
