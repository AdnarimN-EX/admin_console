import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

export default function AddBrgy() {
  const { admin } = useAuthContext();
  const [city, setCity] = useState([]);
  const [city_id, setCityID] = useState();
  const [barangay, setBarangay] = useState();

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
      }
    };
    dataFetchCity();
  }, [admin.token, admin]);

  function changeCity(e) {
    setCity(e.target.value);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log();
    //await addCity(city, province);
  };

  return (
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
        <div className="btn-center">
          <Button type="submit">Add New Barangay</Button>
        </div>
      </Form>
    </Container>
  );
}
