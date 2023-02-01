import React from 'react';
import { Container } from 'react-bootstrap';
import AdminAccounInfo from './Sub/AdminAccounInfo';
import AdminChangePassword from './Sub/AdminChangePassword';
import AdminChangeUsername from './Sub/AdminChangeUsername';
import AdminDeleteAccount from './Sub/AdminDeleteAccount';

export default function AccountAdminSetting() {
  return (
    <>
      <Container>
        <div className="skilled_account_page">
          <div className="skilled_info_form">
            <h4>Account Information</h4>
            <AdminAccounInfo />
          </div>
        </div>
        <div className="skilled_password_page">
          <div className="skilled_info_form">
            <h4>Username Change</h4>
            <AdminChangeUsername />
          </div>
        </div>
        <div className="skilled_password_page">
          <div className="skilled_info_form">
            <h4>Password Change</h4>
            <AdminChangePassword />
          </div>
        </div>
        <div className="skilled_password_page">
          <div className="skilled_info_form">
            <h4>Delete</h4>
            <AdminDeleteAccount />
          </div>
        </div>
      </Container>
    </>
  );
}
