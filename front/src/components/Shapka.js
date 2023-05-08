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


// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from 'yup'
// import { useState } from "react";
// import AuthService from "../services/Auth.service";
// import { Link, useNavigate } from 'react-router-dom';
// import { Label, Button, Input } from 'reactstrap'

// const FormCode = (email) => {
//     const [errors, setErrors] = useState('')
//     const handleSubmit = async (email, code) => {
//         try {
//             ///метод для отправки на сервер
//             await AuthService.postActivationCode(email, code);
//         } catch (e) {
//             ///вывод ошибки
//             setErrors(e.response.data.message);
//             ///
//         }
//     }

//     return (
//         <>
//             <Formik
//                 initialValues={
//                     {
//                         code: ''
//                     }
//                 }

//                 validationSchema={Yup.object({
//                     code: Yup.string()
//                         .required(<p style={{ color: "red" }}>Введите код активации!</p>),
//                 })}

//                 onSubmit={
//                     values => console.log(JSON.stringify(values))
//                 }>
//                 {({
//                     values,
//                     isValid,
//                     dirty,
//                     isSubmitting,
//                     resetForm
//                 }) => (
//                     <Form className='registration-form' style={{ backgroundColor: "#F0DAE1" }}>
//                         <p style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Введите код активации,<br /> который пришел на вашу электронную почту</p>
//                         <div>
//                             <div>
//                                 <Field
//                                     name={"code"}
//                                     className="form-control"
//                                     id={"code"}
//                                     placeholder="&nbsp;"
//                                     type={'text'}
//                                     style={{ width: "40%", margin: "auto", marginTop: "4%" }}
//                                 />
//                                 <ErrorMessage name={'code'} component={'div'} />
//                             </div>

//                             {errors.length > 0 && <div>
//                                 <p style={{ color: 'red' }}>{errors}</p>
//                             </div>}
//                         </div>
//                         <Link variant="text-light" to={"/"} size="4" type={'submit'} disabled={!(isValid && dirty) || isSubmitting} style={{ backgroundColor: "#9A1656", textDecoration: "none", color: "#F0DAE1", display: "block", margin: "0 auto", marginTop: "4%", padding: "2%", width: "fit-content", borderRadius: "25%" }} onClick={async () => {
//                             isSubmitting = true
//                             await handleSubmit(email.email, values.code)
//                             setTimeout(() => resetForm(), 1000)
//                         }}>Отправить</Link>
//                     </Form>
//                 )}
//             </Formik>
//         </>
//     )
// }

// export default FormCode;
