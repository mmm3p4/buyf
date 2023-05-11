import React, { useState } from 'react'
import { Label, Form, FormGroup, Button, Input } from 'reactstrap'
import AuthService from '../services/Auth.service';
import '../index.css'
import Pattern_Dark2 from '../img/Pattern_Dark2.png';
import { Link } from "react-router-dom";
import ResetCode from '../components/ResetCode';


const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [isWaitingForResetingCode, setIsWaitingForResetingCode] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handleFormSubmit1 = async (event) => {
        setEmailInvalid(false);
    
        await AuthService.postResetingCode(email).then(() => {
            console.log("Успешно отправить код");
            setUserInfo({email})
            setIsWaitingForResetingCode(true)
        }).catch((error) => {
            alert(error.response.data.message);
        });

    }
    return (
        <div style={{ backgroundImage: `url(${Pattern_Dark2})`, height: "100%", position: "fixed", top: 0, left: 0, width: "100%" }}>
            <div style={{ marginTop: "5%" }}>
            <Button variant="btn-light" href='/' style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "block", border: "none", width: "10%", marginLeft:"19%"}}> &#129044; На главную</Button>
                <p className='footerlogo' style={{ color: "#F0DAE1", margin: 0 }}>BUYF</p>
                
                <Form onSubmit={handleFormSubmit1} className="registration-form"  style={{ backgroundColor: "#F0DAE1", width: "38%" }}>
                {isWaitingForResetingCode ? (
                    <>
                        <p className='footerlogo' style={{ color: "#F0DAE1", margin: 0 }}>BUYF</p>
                        <ResetCode props={userInfo} />
                    </>
                ) : (
                    <>
                <FormGroup style={{paddingBottom: "2%"}}>
                    <p className='footerlogo' style={{ color: "#9A1656",marginBottom: "7%", textDecoration: "none", fontSize: "30px", fontWeight: "bold" }}>ВОССТАНОВЛЕНИЕ ПАРОЛЯ</p>
                        <Label for="email" style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Почта</Label>
                        <Input
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Введите адрес почты"
                            value={email}
                            onChange={handleEmailChange}
                            invalid={emailInvalid}
                            style={{ width: "40%", margin: "auto" }}
                        />
                    </FormGroup>
                    <Button variant="btn-light" onClick={handleFormSubmit1} style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "block", margin: "0 auto", marginBottom: "2%", border: "none" }}>Далее</Button>
                    </>)}
                </Form>
                </div>
        </div>
    );
    }
export default ResetPass
