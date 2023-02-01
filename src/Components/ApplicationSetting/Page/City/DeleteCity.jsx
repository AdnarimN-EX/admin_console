import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function DeleteCity(props) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleDelete = (e) => {
    deleteCity();
    handleClose();
  };
  const handleShow = () => setShow(true);

  const deleteCity = async () => {
    const response = await fetch(`${url}/api/city/delete/${props.props._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      alert('Deleted');
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
        <Modal.Body>Delete this City?</Modal.Body>
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
