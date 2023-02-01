import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function UpdateAdminRole({ props }) {
  const { admin } = useAuthContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [role, setRole] = useState([]);
  const [cap, setCap] = useState([]);

  const [role_id, setRoleid] = useState('');

  const [capability_id, setCopability] = useState('');

  const [adminInfo_id, setAdminInfo_Id] = useState(props.adminInfo_id._id);

  const [error, setError] = useState('');

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

  const updateAdminRole = async () => {
    const response = await fetch(
      `${url}/api/roleCapability/update/${props._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ role_id, capability_id, adminInfo_id }),
      }
    );
    const json = await response.json();

    if (response.ok) {
      alert('Update');
    }
    if (!response.ok) {
      setError(json.error);
      setRoleid('');
      setCopability('');
    }
  };

  const handleChanges = async (e) => {
    e.preventDefault(role_id, capability_id);
    console.log();
    await updateAdminRole(role_id, capability_id);
  };

  console.log(adminInfo_id);
  console.log(error);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChanges}>
            <Form.Label>Select Role</Form.Label>
            <Form.Select
              id="role"
              value={role_id}
              onChange={(e) => setRoleid(e.target.value)}
            >
              <option>Select</option>
              {role.map((items, index) => {
                return (
                  <option key={index} value={items._id}>
                    {items.roleName}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Label>Select Capability</Form.Label>
            <Form.Select
              id="capability"
              value={capability_id}
              onChange={(e) => setCopability(e.target.value)}
            >
              <option>Select</option>
              {cap.map((items, index) => {
                return (
                  <option key={index} value={items._id}>
                    {items.capabilityName}
                  </option>
                );
              })}
            </Form.Select>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {<span className="text-danger">{error}</span>}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
