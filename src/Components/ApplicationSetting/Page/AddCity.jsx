import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

export default function AddCity() {
  const { admin } = useAuthContext();
  const [province, setCurProv] = useState([]);
  const [save, setSave] = useState([]);
  const [city, setCity] = useState();
  const [cityName, setCityName] = useState([]);
  const [province_id, setProvince_id] = useState('');

  //get Provinces
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
      const response = await fetch(`${url}/api/city/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCityName(json);
      }
      if (!response.ok) {
      }
    };
    dataFetchCurrentCities();
  }, [admin.token]);

  //to add city
  const addCity = async () => {
    const response = await fetch(`${url}/api/city/post `, {
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

  const handelCons = async (e) => {
    e.preventDefault();
    console.log('City: ' + city + 'Province_uid: ' + province_id);
  };

  return (
    <Container className="addcity">
      <Form id="addCity" onSubmit={handelSubmit}>
        <Form.Group>
          <Form.Label>SELECT PROVINCE *</Form.Label>
          <Form.Select
            value={province_id}
            onChange={(e) => setProvince_id(e.target.value)}
            size="sm"
          >
            <option>Select Here</option>;
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
        <Button onClick={handelCons}>console log</Button>
      </Form>
    </Container>
  );
}
