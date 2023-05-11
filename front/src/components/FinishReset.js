import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useEffect, useState} from 'react';
import AuthService from "../services/Auth.service";
import {Label, FormGroup, Button, Input} from 'reactstrap'
import '../index.css'


const FinishReset = (props) => {
    const [errors, setErrors] = useState('')
    const [isWaitingForReseting, setIsWaitingForReseting] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
    const [newPasswordRepeatInvalid, setNewPasswordRepeatInvalid] = useState(false);


    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleNewPasswordRepeatChange = (event) => {
        setNewPasswordRepeat(event.target.value);
    };

    const handleFormSubmit = async (newPassword, newPasswordRepeat) => {
        setNewPasswordInvalid(false);
        setNewPasswordRepeatInvalid(false);

        await AuthService.resetPass(props.props.email, newPassword, newPasswordRepeat).then(() => {
            console.log("Успешно закончено!");
            window.location.href = "/auth"
        }).catch((error) => {
            alert(error.response.data.message);
        });

    }


    return (

        <>
            <FormGroup style={{paddingBottom: "2%"}}>
                <Label for="newPassword" style={{fontSize: "20px", color: "#9A1656", fontWeight: "bold"}}>Новый
                    пароль</Label>
                <Input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    invalid={newPasswordInvalid}
                    style={{width: "40%", margin: "auto"}}
                />
            </FormGroup>
            <FormGroup>
                <Label for="newPasswordRepeat" style={{fontSize: "20px", color: "#9A1656", fontWeight: "bold"}}>Повторите
                    пароль</Label>
                <Input
                    type="password"
                    name="newPasswordRepeat"
                    id="newPasswordRepeat"
                    placeholder="Повторите пароль"
                    value={newPasswordRepeat}
                    onChange={handleNewPasswordRepeatChange}
                    invalid={newPasswordRepeatInvalid}
                    style={{width: "40%", margin: "auto"}}
                />
            </FormGroup>
            <Button variant="btn-light" onClick={(e) => {
                e.preventDefault()
                handleFormSubmit(newPassword, newPasswordRepeat)
            }} style={{
                backgroundColor: "#F0DAE1",
                color: "#9A1656",
                display: "block",
                margin: "0 auto",
                marginBottom: "2%",
                border: "none"
            }}>Восстановить пароль</Button>
        </>
    )
}
export default FinishReset;
