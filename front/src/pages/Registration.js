import React, { useState } from 'react'
import { Label, Form, FormGroup, Button, Input } from 'reactstrap'
import AuthService from '../services/Auth.service';
import '../index.css'
import Pattern_Dark2 from '../img/Pattern_Dark2.png';
import FormCode from '../hooks/useValidateInput';
import { AlertError } from '../components/Alert';
const Registration = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [subscribed, setSubcribed] = useState(false);
    const [username, setName] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [nameInvalid, setNameInvalid] = useState(false);
    const [isWaitingForActivationCode, setIsWaitingForActivationCode] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const onRegistration = async () => {
        setEmailInvalid(false);
        setPasswordInvalid(false);
        setNameInvalid(false);

        if (!password || !email || !username) {
            if (!password) setPasswordInvalid(true);
            if (!email) setEmailInvalid(true);
            if (!username) setNameInvalid(true);
            AlertError("Заполните все поля!");
            
        }
        else {

        await AuthService.register(username, email, password, subscribed)
            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    setUserInfo({ username, email, password, subscribed })

                    setIsWaitingForActivationCode(true)
                } else {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setSubcribed(false);
                    setIsWaitingForActivationCode(false)

                }
            })
            .catch((err) => {
                AlertError(err.response.data.message)
            })};
    };


    const handleOnChange = (event) => {
        setName(event.target.value)
    }
    const handleOnChange1 = (event) => {
        setEmail(event.target.value)
    }
    const handleOnChange2 = (event) => {
        setPassword(event.target.value)
    }
    const handleOnChange3 = (event) => {
        setSubcribed(event.target.value)
    }

    return (
        <div style={{ backgroundImage: `url(${Pattern_Dark2})`, height: "100%", position: "fixed", top: 0, left: 0, width: "100%" }}>
            <div style={{ marginTop: "5%" }}>
                {isWaitingForActivationCode ? (
                    <>
                        <p className='footerlogo' style={{ color: "#F0DAE1", margin: 0 }}>BUYF</p>
                        <FormCode props={userInfo} />
                    </>
                ) : (
                    <>
                        <Button variant="btn-light" href='/' style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "block", border: "none", width: "8%", marginLeft: "19%" }}>Назад</Button>
                        <p className='footerlogo' style={{ color: "#F0DAE1", margin: 0 }}>BUYF</p>

                        <Form className="registration-form" style={{ backgroundColor: "#F0DAE1" }}>
                            <FormGroup style={{ paddingBottom: "2%" }}>
                                <p className='footerlogo' style={{ color: "#9A1656", marginBottom: "7%", textDecoration: "none", fontSize: "30px", fontWeight: "bold" }}>РЕГИСТРАЦИЯ</p>
                                <Label style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>
                                    Имя пользователя
                                </Label>
                                <Input
                                    placeholder="Введите имя пользователя"
                                    type='text'
                                    value={username}
                                    onChange={(event) => handleOnChange(event)}
                                    invalid={nameInvalid}
                                    style={{ width: "40%", margin: "auto" }}
                                />
                            </FormGroup >
                            <FormGroup style={{ textAlign: "center", paddingBottom: "2%" }}>
                                <Label style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>
                                    Почта
                                </Label>
                                <Input
                                    placeholder="Введите почту"
                                    type='email'
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    title="Пожалуйста, введите правильный email-адрес"
                                    value={email}
                                    onChange={(event) => handleOnChange1(event)}
                                    invalid={emailInvalid}
                                    style={{ width: "40%", margin: "auto" }}
                                />
                            </FormGroup >
                            <FormGroup style={{ textAlign: "center" }}>
                                <Label for="examplePassword" style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>
                                    Пароль
                                </Label>
                                <Input
                                    placeholder="Введите пароль"
                                    type='password'
                                    value={password}
                                    onChange={(event) => handleOnChange2(event)}
                                    invalid={passwordInvalid}
                                    style={{ width: "40%", margin: "auto" }}
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" value={subscribed} onChange={(event) => handleOnChange3(event)} />
                                    Я подписываюсь на рассылку
                                </Label>
                            </FormGroup>
                        </Form>
                        <Button variant="btn-light" onClick={onRegistration} style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "block", margin: "0 auto", marginBottom: "2%", border: "none" }}>Зарегистрироваться</Button>
                    </>)}
            </div>
        </div >
    )
}
export default Registration
