import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import DeleteSkill from '../Skills/DeleteSkill';
import EditSkill from '../Skills/EditSkill';
import DeleteBrgy from './DeleteBrgy';
import EditBrgy from './EditBrgy';

export default function AddBrgy() {
  const { admin } = useAuthContext();
  const [city, setCity] = useState([]);
  const [city_id, setCityID] = useState('');
  const [barangay, setBarangay] = useState('');
  const [barangayList, setBarangayList] = useState([]);
  const [error, setError] = useState('');

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
  }, [admin.token]);

  useEffect(() => {
    const dataFetchBrgyList = async () => {
      const response = await fetch(
        `${url}/api/barangay/getAll/cityBarangay/${city_id}`,
        {
          headers: {
            authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setBarangayList(json);
      }
      if (!response.ok) {
        setError(json.messg);
      }
    };
    dataFetchBrgyList();
  }, [admin.token, city_id, barangay]);

  const addBrgy = async () => {
    const response = await fetch(`${url}/api/barangay/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ barangay, city_id }),
    });

    if (response.ok) {
      alert('Created');
      setBarangay('');
    }
    if (!response.ok) {
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(barangay, city_id);
    await addBrgy(barangay, city_id);
  };

  console.log(barangayList);

  return (
    <>
      <Container className="addBrgy">
        <Form id="addBrgy" onSubmit={handelSubmit}>
          <Form.Group>
            <Form.Label>SELECT CITY *</Form.Label>
            <Form.Select
              value={city_id}
              onChange={(e) => setCityID(e.target.value)}
              size="sm"
            >
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
            <Button type="submit">Add New Barangay</Button>
          </div>
        </Form>
      </Container>
      <Container className="text-center">
        <h2>List of Barangay</h2>
        {<h2 className="danger">{error}</h2>}
        <Row>
          {barangayList.map((items, index) => (
            <Col sm={6} md={6} lg={6} className="mb-3">
              <Card className="text-center">
                <Card.Title>{items.barangay}</Card.Title>
                <Card.Body>
                  <p>City: {items.city_id.city}</p>
                  <div className="mr-auto">
                    <EditBrgy props={items}></EditBrgy>
                    <DeleteBrgy props={items}></DeleteBrgy>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
