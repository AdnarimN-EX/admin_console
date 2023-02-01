import React, { useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';

import AddAdminRole from './AddAdminRole';
import AddAdminRoleName from './AddAdminRoleName';
import ViewAllAdminRoles from './ViewAllAdminRoles';

export default function AdminRoleAccessSetting() {
  const [showAddRole, setShowAddRole] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [showAddRoleName, setShowAddRoleName] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function addRoles() {
    setShowAddRole(true);
    setShowRoles(false);
    setShowAddRoleName(false);
    setShowDelete(false);
  }
  function viewRoles() {
    setShowAddRole(false);
    setShowRoles(true);
    setShowAddRoleName(false);
    setShowDelete(false);
  }
  function AddRoleAndAcc() {
    setShowAddRole(false);
    setShowRoles(false);
    setShowAddRoleName(true);
  }
  return (
    <>
      <Container className="btn-group">
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup aria-label="First group" className="text-center">
            <Button variant="primary" onClick={AddRoleAndAcc}>
              Add Role and Access Name
            </Button>
            <Button variant="primary" onClick={addRoles}>
              Add Role
            </Button>
            <Button variant="primary" onClick={viewRoles}>
              View Roles
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
      <Container>
        {showAddRole && <AddAdminRole />}
        {showRoles && <ViewAllAdminRoles />}
        {showAddRoleName && <AddAdminRoleName />}
      </Container>
    </>
  );
}
