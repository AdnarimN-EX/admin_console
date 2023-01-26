import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import DeleteSkill from '../Skills/DeleteSkill';
import EditCity from './EditCity';

export default function AddCity() {
  const { admin } = useAuthContext();
  const [province, setCurProv] = useState([]);
  const [save, setSave] = useState([]);
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState([]);
  const [province_id, setProvince_id] = useState('');

  //get Provinces For Dropdown
  useEffect(() => {
    const dataFetchProvince = async () => {
      const response = await fetch(`${url}/api/province/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setSave(json);
      }
      if (!response.ok) {
      }
    };
    dataFetchProvince();
  }, [admin.token]);

  //to get all cities
  useEffect(() => {
    const dataFetchCurrentCities = async () => {
      const response = await fetch(
        `${url}/api/city/getAll/provCity/${province_id}`,
        {
          headers: {
            authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setCityName(json);
        console.log(json);
      }
      if (!response.ok) {
      }
    };
    dataFetchCurrentCities();
  }, [admin.token, province_id]);

  //to add city
  const addCity = async () => {
    const response = await fetch(`${url}/api/city/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ city, province_id }),
    });

    if (response.ok) {
      alert('Created');
    }
    if (!response.ok) {
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log('City: ' + city + 'Province_uid: ' + province_id);
    await addCity(city, province);
  };

  return (
    <>
      <Container className="addcity">
        <Container className="text-center">
          <Form id="addCity" onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label>SELECT PROVINCE *</Form.Label>
              <Form.Select
                value={province_id}
                onChange={(e) => setProvince_id(e.target.value)}
                size="sm"
              >
                <option>Sample</option>
                {save.map((items, index) => {
                  return (
                    <>
                      <option key={index} value={items._id}>
                        {items.province}
                      </option>
                    </>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Add New City Name *</Form.Label>
              <Form.Control
                id="addcity"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              ></Form.Control>
            </Form.Group>
            <div className="btn-center">
              <Button type="submit">Add New City</Button>
            </div>
          </Form>
        </Container>
      </Container>
      <Container className="text-center">
        <h2>List of Cities</h2>
        <Row>
          {cityName.map((items, index) => (
            <Col sm={6} md={6} lg={6} className="mb-3">
              <Card className="text-center">
                <Card.Title>{items.city}</Card.Title>
                <Card.Body>
                  <p>Province: {items.province_id.province}</p>
                  <div className="mr-auto">
                    <EditCity props={items}></EditCity>
                    <DeleteSkill props={items}></DeleteSkill>
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
