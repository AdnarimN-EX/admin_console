import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function EditBrgy({ props }) {
  const { admin } = useAuthContext();
  const [error, setError] = useState();
  const [barangay, setBarangay] = useState(props.barangay);
  const [city_id, setCity_Id] = useState(props.city_id._id);
  const [cityList, setCityList] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateBrgy = async () => {
    const response = await fetch(`${url}/api/barangay/update/${props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ barangay, city_id }),
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
    await updateBrgy(barangay, city_id);
  };

  useEffect(() => {
    const dataFetchCity = async () => {
      const response = await fetch(`${url}/api/city/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCityList(json);
        setError('');
      } else {
        setError(json.messg);
      }
    };
    dataFetchCity();
  }, [admin.token]);
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
              <Form.Label>Edit Brgy Name</Form.Label>
              <Form.Control
                type="text"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                autoFocus
              />
              <Form.Label>Edit City Name</Form.Label>
              <Form.Select
                id="city"
                value={city_id}
                onChange={(e) => setCity_Id(e.target.value)}
              >
                {cityList.map((items, index) => {
                  return (
                    <option key={index} value={items._id}>
                      {items.city}
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
