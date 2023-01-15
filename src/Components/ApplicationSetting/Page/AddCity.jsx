import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

export default function AddCity() {
  const [newCity, setNewCity] = useState();
  const [prov, setProv] = useState();

  function changeProv(e) {
    setProv(e.target.value);
  }

  return (
    <Container className="addcity">
      <Form>
        <Form.Group>
          <Form.Label>SELECT PROVINCE *</Form.Label>
          <Form.Select id="prov" size="md">
            <option>Open This To Select Prov</option>
            <option value="SFP">SFP</option>
            <option value="Angeles">Angeles</option>
            <option value="BACOLOR">BACOLOR</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Add New City Name *</Form.Label>
          <Form.Control
            id="addcity"
            type="text"
            onChange={(e) => setNewCity(e.target.value)}
            value={newCity}
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
