import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function AddAdminRole(props) {
  const { admin } = useAuthContext();
  const [role, setRole] = useState([]);
  const [cap, setCap] = useState([]);
  const [role_id, setSelectedRole] = useState('');
  const [capability_id, setSelectedCap] = useState('');
  const [adminInfo_id, setadminInfo_id] = useState(props.props._id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //role
  useEffect(() => {
    const dataFetchRole = async () => {
      const response = await fetch(`${url}/api/role/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setRole(json);
      } else {
        console.log('Eror');
      }
    };
    dataFetchRole();
  }, []);

  //capabi
  useEffect(() => {
    const dataFetchCap = async () => {
      const response = await fetch(`${url}/api/capability/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCap(json);
      } else {
        console.log('Eror');
      }
    };
    dataFetchCap();
  }, []);

  //to add city
  const addRoleCap = async () => {
    const response = await fetch(`${url}/api/roleCapability/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ role_id, capability_id, adminInfo_id }),
    });

    if (response.ok) {
      alert('Created');
    }
    if (!response.ok) {
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(
      'CAP: ' + capability_id + 'ROLE: ' + role_id + 'id' + adminInfo_id
    );
    await addRoleCap(role_id, capability_id, props.props._id);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Admin Role
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label>SELECT ROLE NAME *</Form.Label>
              <Form.Select
                id="role"
                value={role_id}
                onChange={(e) => setSelectedRole(e.target.value)}
                size="sm"
              >
                <option>Select Here</option>;
                {role.map((items, index) => {
                  return (
                    <>
                      <option key={index} value={items._id}>
                        {items.roleName}
                      </option>
                    </>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>SELECT CAPABILITY *</Form.Label>
              <Form.Select
                id="cap"
                value={capability_id}
                onChange={(e) => setSelectedCap(e.target.value)}
                size="sm"
              >
                <option>Select Here</option>;
                {cap.map((items, index) => {
                  return (
                    <>
                      <option key={index} value={items._id}>
                        {items.capabilityName}
                      </option>
                    </>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="adminId"
                type="text"
                value={props.props._id}
                hidden
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handelSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
