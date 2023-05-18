import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/Auth.service';
import Table from 'react-bootstrap/Table';
import '../index.css'
import { Button } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import { BsFillTrashFill } from "react-icons/bs";
const UserList = () => {
  const navigate = useNavigate()
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
  const handleRefreshRole = async (userId) => {
    try {
      await AuthService.refreshRole(userId, 1).then(() => {
        window.location.href = "/admin"
      })
    } catch (e) {
      console.log(e);
    }
  };
  // const dropuser = async (userId) => {
  //   try {
  //     await AuthService.refreshRole(userId, 1).then(() => {
  //       window.location.href = "/admin"
  //     })
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
  return (
    <div style={{margin: "auto", width: "45%", color: "#9A1656"}}>
      <h3 style={{textAlign: "center", marginBottom: "6%", marginTop: "4%"}}>Список пользователей</h3>
      <Table striped bordered hover style={{border: "2px solid #9A1656", textAlign: "center", backgroundColor: "#F0DAE1", marginBottom: "8%"}}>
        <thead>
          <tr style={{color: "#9A1656", fontSize: "18px"}}>
            <th>Логин</th>
            <th>Email</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.roles
                  .map((role) => " " + role.name)}
                  {!user.roles.find((role) => role.name === "admin") && (
                  <Button  onClick={() => handleRefreshRole(user.id)} style={{ display: "inline-block", float: "right", marginRight: "1%", marginRight: "10%", border: "none",color: "#F0DAE1", fontSize: "14px" }}>Изменить на администратора</Button>)}
              </td>
              {/* <td> <BsFillTrashFill size={20} onClick={dropUser} /></td> */}
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  )};
};

export default observer(UserList);


