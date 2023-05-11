import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import { useEffect, useState } from 'react';
import AuthService from "../services/Auth.service";
import { Label, FormGroup, Button, Input } from 'reactstrap'
import '../index.css'
import FinishReset from "./FinishReset";



const ResetCode = (props) => {
    const [errors, setErrors] = useState('')
    const [isWaitingForReseting, setIsWaitingForReseting] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
    const [newPasswordRepeatInvalid, setNewPasswordRepeatInvalid] = useState(false);

    const handleSubmit = async (email, resetingCode) => {
        setUserInfo({email})
        await AuthService.resetVerify(email, resetingCode)
            .then(() => {
                    setIsWaitingForReseting(true);
            })
            .catch((error) => {   
                console.log(error.response.data.message);
            });
    }
    

    
      
    return (
        
        <>
            {isWaitingForReseting ?(
                    <FinishReset props={userInfo}/>
            ): (  
            <>
            <Formik
                initialValues={
                    {
                        resetingCode: ''
                    }
                }

                validationSchema={Yup.object({
                    resetingCode: Yup.string()
                    .required(<p style={{ color: "red" }}>Введите код для сброса пароля!</p>),
                })}

                onSubmit={
                    values => console.log(JSON.stringify(values))
                }>
                {({
                      values,
                      isValid,
                      dirty,
                      isSubmitting,
                      resetForm
                  }) => (
                    <Form className='registration-form' style={{ backgroundColor: "#F0DAE1" }}>
                        <p style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Введите код для восстановления пароля,<br /> который пришел на вашу электронную почту</p>
                        <div>

                            <div>
                                <Field
                                    name={"resetingCode"}
                                    className="form-control"
                                    id={"resetingCode"}
                                    placeholder="&nbsp;"
                                    type={'text'}
                                    style={{ width: "40%", margin: "auto", marginTop: "4%" }}
                                />
                                <ErrorMessage name={'resetingCode'} component={'div'}/>
                            </div>
                            
                            {errors.length > 0 ? <div>
                                <p style={{ color: 'red' }}>{errors}</p>
                            </div> : null}
                        </div>
                        <Button type={'submit'}  onClick={async (e) => {
                            e.preventDefault()
                            isSubmitting = true
                            await handleSubmit(props.props.email, values.resetingCode)
                            setTimeout(() => resetForm(), 3000)
                        }}>Отправить</Button>
                    </Form>
                )}
            </Formik>
             
                    </>)}</>
       
)}

export default ResetCode;
