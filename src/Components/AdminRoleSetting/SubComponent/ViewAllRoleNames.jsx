import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import DeleteRoleName from '../DeleteRoleName';
import UpdateAdminRoleName from '../UpdateAdminRoleName';

export default function ViewAllRoleNames({ props }) {
  return (
    <Container className="text-center">
      <h2>Skill Options</h2>

      <Row>
        {props.map((items) => (
          <Col sm={6} md={6} lg={6} className="mb-3">
            <Card className="text-center">
              <Card.Title>{items.roleName}</Card.Title>
              <Card.Body>
                <div className="mr-auto">
                  <UpdateAdminRoleName props={items} />
                  <DeleteRoleName props={items} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
