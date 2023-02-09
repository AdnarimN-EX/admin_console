import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function EditAdmin(props) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);

  const [fname, setFname] = useState(props.props.fname);
  const [mname, setMName] = useState(props.props.mname);
  const [lname, setLname] = useState(props.props.lname);
  const [contact, setCon] = useState(props.props.contact);
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateAdmin = async () => {
    const response = await fetch(
      `${url}/api/admin/update/adminInfo/${props.props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ fname, mname, lname, contact }),
      }
    );

    if (response.ok) {
      alert('Update');
    }
    if (!response.ok) {
      alert('Fail');
    }
  };

  const handleChanges = async (e) => {
    e.preventDefault(fname, mname, lname, contact);
    console.log();
    await updateAdmin(fname, mname, lname, contact);
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update Information
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChanges}>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    id="newFname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label> Middle Name (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    id="newMname"
                    value={mname}
                    onChange={(e) => setMName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Form.Group className="mb-2">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  id="newLname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Contact *</Form.Label>
                <Form.Control
                  type="number"
                  id="newContact"
                  value={contact}
                  onChange={(e) => setCon(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
