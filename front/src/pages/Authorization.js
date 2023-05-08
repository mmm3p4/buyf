import React, { useState } from 'react'
import { Label, Form, FormGroup, Button, Input } from 'reactstrap'
import AuthService from '../services/Auth.service';
import '../index.css'
import Pattern_Dark2 from '../img/Pattern_Dark2.png';


const Authorization = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setUsernameInvalid(false);
        setPasswordInvalid(false);

        if (!username || !password) {
            if (!username) setUsernameInvalid(true);
            if (!password) setPasswordInvalid(true);
            return;
        }

        await AuthService.login(username, password).then(() => {
            window.location.href = '/';
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    return (
        <div style={{ backgroundImage: `url(${Pattern_Dark2})`, height: "100%", position: "fixed", top: 0, left: 0, width: "100%" }}>
            <div style={{ marginTop: "5%" }}>
            <Button variant="btn-light" href='/' style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "block", border: "none", width: "8%", marginLeft:"19%"}}>Назад</Button>
                <p className='footerlogo' style={{ color: "#F0DAE1", margin: 0 }}>BUYF</p>
                <Form onSubmit={handleFormSubmit} className="registration-form"  style={{ backgroundColor: "#F0DAE1", width: "38%" }}>
                    <FormGroup style={{paddingBottom: "2%"}}>
                    <p className='footerlogo' style={{ color: "#9A1656",marginBottom: "7%", textDecoration: "none", fontSize: "30px", fontWeight: "bold" }}>АВТОРИЗАЦИЯ</p>
                        <Label for="name" style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Имя</Label>
                        <Input
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Введите имя пользователя"
                            value={username}
                            onChange={handleUsernameChange}
                            invalid={usernameInvalid}
                            style={{ width: "40%", margin: "auto" }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password"  style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Пароль</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={handlePasswordChange}
                            invalid={passwordInvalid}
                            style={{ width: "40%", margin: "auto" }}
                        />
                    </FormGroup>
                </Form>
                <Button variant="btn-light" onClick={handleFormSubmit} style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "block", margin: "0 auto", marginBottom: "2%", border: "none" }}>Войти</Button>
            </div>
        </div>
    );
};
export default Authorization