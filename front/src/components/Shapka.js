import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../index.css';
import { NavLink } from 'react-router-dom';
import AuthService from '../services/Auth.service';
import { observer } from "mobx-react-lite"
import React, { useState, useEffect } from 'react'

function Shapka() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn())
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true)
    }
    }, [])
  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/';
  }
  const currentUser = AuthService.getCurrentUser();
  const handleLinkClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
  return (
    <>
      <Navbar style={{ backgroundColor: "#9A1656" }} variant="dark">
        <Container>
          <p className="shapkalogo">BUYF</p>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/' exact="true">Главная</Nav.Link>
            <Nav.Link as={NavLink} to='/catalog'>Каталог</Nav.Link>
            <Nav.Link as={NavLink} to='/faq'>FAQ</Nav.Link>
            <Nav.Link onClick={handleLinkClick}>О нас</Nav.Link>

          </Nav>
          {isLoggedIn ? (
            <>
              <Button variant="light" href="/profile" style={{ marginRight: "1%" }}>Профиль</Button>
              <Button variant="outline-light" onClick={handleLogout}>Выйти</Button>
            </>
          ) : (
            <>
              <Button variant="light" href='/auth' style={{ marginRight: "1%" }}>Войти</Button>
              <Button variant="outline-light" href='/register'>Зарегистрироваться</Button>
            </>
          )}
          {(currentUser && currentUser.roles.includes("ROLE_ADMIN")) && (
            <Button variant="danger" href='/admin' style={{ marginLeft: "1%" }}>Панель администратора</Button>
          )}



        </Container>
      </Navbar>
    </>
  );
}
export default observer(Shapka)