import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

export default function AddBrgy() {
  const [newBrgy, setNewBrgy] = useState();
  const [city, setCity] = useState();

  function changeCity(e) {
    setCity(e.target.value);
  }

  return (
    <Container className="addBrgy">
      <Form>
        <Form.Group>
          <Form.Label>SELECT CITY *</Form.Label>
          <Form.Select id="city" size="md">
            <option>Open This To Select City</option>
            <option value="SFP">SFP</option>
            <option value="Angeles">Angeles</option>
            <option value="BACOLOR">BACOLOR</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Add New Barangay Name *</Form.Label>
          <Form.Control
            id="addbrgy"
            type="text"
            onChange={(e) => setNewBrgy(e.target.value)}
            value={newBrgy}
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
