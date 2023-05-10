import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserList from './UserList';


const Admin = () => {
  const [users, setUsers] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    AuthService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
    return (
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{ margin: "10%", textColor: "danger" }}
      >
        <Tab eventKey="profile" title="Пользователи" style={{ color: "#9A1656" }}>
          <UserList />
        </Tab>
        <Tab eventKey="2" title="2" color="danger" style={{ margin: "10%" }}>
          Tab content for Profile
        </Tab>
        <Tab eventKey="3" title="3" style={{ color: "#9A1565", margin: "10%" }}>
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="4" title="4" style={{ color: "#9A1565", margin: "10%" }}>
          Tab content for Contact
        </Tab>
      </Tabs>
    )
  };
};

export default Admin;



