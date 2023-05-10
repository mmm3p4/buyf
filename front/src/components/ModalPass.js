import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';

function Modalpass(props) {
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const handleOnChange1 = (event) => {
        setPassword(event.target.value)
    }
    const handleOnChange2 = (event) => {
        setNewPassword(event.target.value)
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.username; 

    const updatePass = async () => {
        await AuthService.updatePass(username, password, newpassword)
            .then((response) => {
                if (response.status === 200) {
                    alert("Пароль успешно изменен");
                    AuthService.logout()
                    window.location.href = '/auth';
                } else {
                    setPassword("");
                    setNewPassword("");
                    alert(response.data.message);

                }
            })
            .catch((err) => {
                alert(err.response.data.message)
            });
    }


    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-center" style={{margin: "auto", textAlign: "center"}}>Изменение пароля</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Текущий пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите текущий пароль" value={password} onChange={(event) => handleOnChange1(event)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите новый пароль" value={newpassword} onChange={(event) => handleOnChange2(event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
                <Button style={{margin: "auto", marginBottom: "3%"}} onClick={updatePass}>Сменить пароль</Button>

        </Modal >
    </>
  );
}
export default Modalpass;   
