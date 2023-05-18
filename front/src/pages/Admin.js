import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserList from './UserList';
import '../index.css'


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
      <>
      <h1 style={{textAlign: "center", marginTop: "5%", color: "#9A1656"}}>Панель администратора</h1>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{ margin: "5%" }}
      >
        <Tab eventKey="profile" className="custom-tab" title="Пользователи" style={{ color: "#9A1656 !important;" }}>
          <UserList />
        </Tab>
        <Tab eventKey="2" title="Товары" color="danger" style={{ margin: "10%" }}>
          Tab content for Profile
        </Tab>
        <Tab eventKey="3" title="Заказы" style={{ color: "#9A1565", margin: "10%" }}>
          Tab content for Loooonger Tab
        </Tab>
    
      </Tabs>
    </>)
  };
};

export default Admin;



