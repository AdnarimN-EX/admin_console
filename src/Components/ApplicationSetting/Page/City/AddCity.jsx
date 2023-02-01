import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

export default function AddCity() {
  const { admin } = useAuthContext();
  const [save, setSave] = useState([]);
  const [city, setCity] = useState('');
  const [province_id, setProvince_id] = useState('Select');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState('');

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
        setError(json.messg);
      }
    };
    dataFetchProvince();
  }, [admin.token]);

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
    const json = await response.json();

    if (response.ok) {
      alert('Created');
      setError('');
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await addCity(city);
  };

  useEffect(() => {
    setIsButtonDisabled(province_id === 'Select');
  }, [province_id]);

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
                <option>Select</option>
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
              <Button type="submit" disabled={isButtonDisabled}>
                Add New City
              </Button>
            </div>
            {<span className="text-danger">{error}</span>}
          </Form>
        </Container>
      </Container>
    </>
  );
}
