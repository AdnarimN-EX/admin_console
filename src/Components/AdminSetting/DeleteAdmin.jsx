import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function DeleteAdmin(props) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleDelete = (e) => {
    deleteAdmin();
    handleClose();
  };
  const handleShow = () => setShow(true);

  const deleteAdmin = async () => {
    const response = await fetch(
      `${url}/api/admin/delete/adminInfo/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (response.ok) {
      alert('Delete');
    }
    if (!response.ok) {
      alert('Fail');
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
        <Modal.Body>Delete this Admin?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            CONFIRM
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
