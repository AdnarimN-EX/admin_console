import React, { useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import './app.css';
import AddBrgy from './Page/AddBrgy';
import AddCity from './Page/AddCity';
import AddProvince from './Page/AddProvince';
import AddSkill from './Page/AddSkill';

export default function ApplicationSetting() {
  const [opt, setOpt] = useState();

  const [showSkills, setShowSkills] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showBrgy, setShowBrgy] = useState(false);

  function showAddSkill() {
    setShowSkills(true);
    setShowPro(false);
    setShowCity(false);
    setShowBrgy(false);
  }
  function showAddCity() {
    setShowSkills(false);
    setShowPro(false);
    setShowCity(true);
    setShowBrgy(false);
  }
  function showAddPro() {
    setShowSkills(false);
    setShowPro(true);
    setShowCity(false);
    setShowBrgy(false);
  }
  function showAddBrgy() {
    setShowSkills(false);
    setShowPro(false);
    setShowCity(false);
    setShowBrgy(true);
  }
  return (
    <>
      <Container className="btn-group">
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup aria-label="First group" className="text-center">
            <Button onClick={showAddSkill}>Add Skill</Button>
            <Button onClick={showAddPro}>Add Province</Button>
            <Button onClick={showAddCity}>Add City</Button>
            <Button onClick={showAddBrgy}>Add Barangay</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
      <Container>
        {showSkills && <AddSkill />}
        {showPro && <AddProvince />}
        {showCity && <AddCity />}
        {showBrgy && <AddBrgy />}
      </Container>
    </>
  );
}
