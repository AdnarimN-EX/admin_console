import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import ViewAllBrgy from './ViewAllBrgy';

export default function AddBrgy() {
  const { admin } = useAuthContext();
  const [city, setCity] = useState([]);
  const [city_id, setCityID] = useState('Select');
  const [barangay, setBarangay] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(city_id === 'Select');
  }, [city_id]);

  console.log(city_id);

  useEffect(() => {
    const dataFetchCity = async () => {
      const response = await fetch(`${url}/api/city/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCity(json);
      }
      if (!response.ok) {
        setError(json.messg);
      }
    };
    dataFetchCity();
  }, [admin.token, barangay]);

  const addBrgy = async () => {
    const response = await fetch(`${url}/api/barangay/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ barangay, city_id }),
    });

    const json = await response.json();
    if (response.ok) {
      alert('Created');
      setBarangay('');
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(barangay, city_id);
    await addBrgy(barangay, city_id);
  };

  return (
    <>
      <Container className="addBrgy">
        <Form id="addBrgy" onSubmit={handelSubmit}>
          <Form.Group>
            <Form.Label>Select City *</Form.Label>
            <Form.Select
              value={city_id}
              onChange={(e) => setCityID(e.target.value)}
              size="sm"
            >
              <option>Select</option>
              {city.map((items, index) => {
                return (
                  <option key={index} value={items._id}>
                    {items.city}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Add New Barangay Name *</Form.Label>
            <Form.Control
              id="addbrgy"
              type="text"
              onChange={(e) => setBarangay(e.target.value)}
              value={barangay}
              required
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" disabled={isButtonDisabled}>
              Add New Barangay
            </Button>
            {<span className="text-danger">{error}</span>}
          </div>
        </Form>
      </Container>
      <Container>
        <ViewAllBrgy></ViewAllBrgy>
      </Container>
    </>
  );
}
