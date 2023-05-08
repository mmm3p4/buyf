import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';

const UserList = () => {
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
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )};
};

export default UserList;