import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function EditCity({ props }) {
  const { admin } = useAuthContext();
  const [city, setCity] = useState(props.city);
  const [provSel, setProvSel] = useState([]);
  const [province_id, setProv] = useState(props.province_id._id);
  const [error, setError] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateCity = async () => {
    const response = await fetch(`${url}/api/city/update/${props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ city, province_id }),
    });

    const json = await response.json();

    if (response.ok) {
      alert('Updated');
    }
    if (!response.ok) {
      alert('Fail');
      setError(json.message);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await updateCity(city, province_id);
  };

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/province/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setProvSel(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [admin.token]);

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
            <Form.Group className="mb-3">
              <Form.Label>Province</Form.Label>
              <Form.Select
                id="provID"
                value={province_id}
                onChange={(e) => setProv(e.target.value)}
              >
                {provSel.map((items, index) => {
                  return (
                    <option key={index} value={items._id}>
                      {items.province}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Container className="text-center">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <div>{<span className="text-danger">{error}</span>}</div>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
