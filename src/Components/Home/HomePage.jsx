import React from 'react';
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';
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
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                      <Button variant="primary">View</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Clients</Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                      <Button variant="primary">View</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Card>
                  <Card.Header>KASAW-APP Settings</Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <Button variant="primary" as={Link} to="/appsetting">
                      Application Settings
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </>
        </>
      )}
    </Container>
  );
}
