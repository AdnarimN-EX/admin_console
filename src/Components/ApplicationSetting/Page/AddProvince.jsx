import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap';

import './add.css';

export default function AddProvince() {
  const [newProv, setNewProv] = useState();

  return (
    <>
      <Container className="addprov">
        <Form>
          <Form.Group>
            <Form.Label>Add New Province</Form.Label>
            <Form.Control
              id="addProv"
              type="text"
              onChange={(e) => setNewProv(e.target.value)}
              value={newProv}
            ></Form.Control>
          </Form.Group>
          <div className="btn-center">
            <Button type="submit">Add New </Button>
          </div>
        </Form>
      </Container>
      <Container className="CRUD">
        <div className="text-center">
          <ButtonGroup>
            <Button variant="secondary">View</Button>
            <Button variant="secondary">Update</Button>
            <Button variant="secondary">Delete</Button>
          </ButtonGroup>
        </div>
      </Container>
    </>
  );
}
