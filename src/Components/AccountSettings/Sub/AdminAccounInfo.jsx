import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

export default function AdminAccounInfo() {
  const { admin } = useAuthContext();
  const [fname, setFname] = useState();
  const [mname, setMname] = useState();
  const [lname, setLname] = useState();
  const [contact, setContact] = useState();

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/admin/get/oneAdminInfo`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setFname(json.fname);
        setMname(json.mname);
        setLname(json.lname);
        setContact(json.contact);
      } else {
        console.log('notSkill');
      }
    };
    dataFetchAdmin();
  }, [admin.token]);

  const updateInfo = async () => {
    const response = await fetch(`${url}/api/admin/update/oneAdminInfo`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ fname, mname, lname, contact }),
    });
    if (response.ok) {
      alert('Info Updated');
    } else {
      alert('Info Not Updated');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateInfo(fname, mname, lname, contact);
  };
  return (
    <div className="info_detail">
      <Form id="skilled_info_change" onSubmit={handleSubmit}>
        <Container className="skilled-info-update">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  id="fname_user"
                  size="sm"
                  type="text"
                  defaultValue={fname}
                  onChange={(e) => setFname(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  id="mname_user"
                  size="sm"
                  type="text"
                  defaultValue={mname}
                  onChange={(e) => setMname(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                id="lname_user"
                size="sm"
                type="text"
                defaultValue={lname}
                onChange={(e) => setLname(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Contact Number *</Form.Label>
            <Form.Control
              id="contactNo"
              size="sm"
              type="number"
              defaultValue={contact}
              onChange={(e) => setContact(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Update Profile</Button>
          </div>
        </Container>
      </Form>
    </div>
  );
}
