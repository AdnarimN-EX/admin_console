import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useAuthContext } from '../../Hooks/useAuthContext';

import './home.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { admin } = useAuthContext();

  return (
    <Container className="Banner">
      {admin && ( //if may User
        <>
          <>
            <Container className="text-center">
              <Row>
                <Col>
                  <Card>
                    <Card.Header>Skilled Workers</Card.Header>
                    <Card.Body>
                      <Card.Text>View and Verify Skilled Workers</Card.Text>
                      <Button variant="primary" as={Link} to="/viewSkilled">
                        View Information
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Skilled Workers Experience</Card.Header>
                    <Card.Body>
                      <Card.Text>View and Verify Experience</Card.Text>
                      <Button
                        variant="primary"
                        as={Link}
                        to="/viewSkilledExperience"
                      >
                        View Experience
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Skilled Workers Certificate</Card.Header>
                    <Card.Body>
                      <Card.Text>View and Verify Certificate</Card.Text>
                      <Button
                        variant="primary"
                        as={Link}
                        to="/viewSkilledCertificate"
                      >
                        View Certificate
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Skilled Workers Bill</Card.Header>
                    <Card.Body>
                      <Card.Text>View and Verify Bill</Card.Text>
                      <Button variant="primary" as={Link} to="/viewSkilledBill">
                        View Bills
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Row>
                  <Col>
                    <Card>
                      <Card.Header>Clients</Card.Header>
                      <Card.Body>
                        <Card.Text>Check Clients Information</Card.Text>
                        <Button variant="primary" as={Link} to="/viewClient">
                          View Information
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>KASAW-APP Settings</Card.Header>
                    <Card.Body>
                      <Card.Text>Change Options Settings</Card.Text>
                      <Button variant="primary" as={Link} to="/appsetting">
                        Settings
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Add Sub Admin</Card.Header>
                    <Card.Body>
                      <Card.Text>Add New Admins</Card.Text>
                      <Button variant="primary" as={Link} to="/adminCreate">
                        Sign Up
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Admin Info Update</Card.Header>
                    <Card.Body>
                      <Card.Text>Change Admin Information</Card.Text>
                      <Button variant="primary" as={Link} to="/viewAllAdmin">
                        Information Setting
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Admin Role Update</Card.Header>
                    <Card.Body>
                      <Card.Text>Change Role Setting of Admin</Card.Text>
                      <Button variant="primary" as={Link} to="/roleSettings">
                        Role Setting
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        </>
      )}
    </Container>
  );
}
