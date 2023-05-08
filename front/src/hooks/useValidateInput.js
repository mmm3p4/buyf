import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useState} from "react";
import AuthService from "../services/Auth.service";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";



const FormCode = (props) => {
    const [errors, setErrors] = useState('')
    const handleSubmit = async (email, code, username, password) => {
        try {
            await AuthService.postActivationCode(email, code)
            .then(async () => {
                await AuthService.login(username, password).then(() => window.location.href = '/');
            });
        } catch (e) {
            setErrors(e.response.data.message);
        }
    }
      
    return (
        <>
            <Formik
                initialValues={
                    {
                        code: ''
                    }
                }

                validationSchema={Yup.object({
                    code: Yup.string()
                    .required(<p style={{ color: "red" }}>Введите код активации!</p>),
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
                        <p style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Введите код активации,<br /> который пришел на вашу электронную почту</p>
                        <div>

                            <div>
                                <Field
                                    name={"code"}
                                    className="form-control"
                                    id={"code"}
                                    placeholder="&nbsp;"
                                    type={'text'}
                                    style={{ width: "40%", margin: "auto", marginTop: "4%" }}
                                />
                                <ErrorMessage name={'code'} component={'div'}/>
                            </div>
                            
                            {errors.length > 0 ? <div>
                                <p style={{ color: 'red' }}>{errors}</p>
                            </div> : null}
                        </div>
                        <button type={'submit'} disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                            isSubmitting = true
                            await handleSubmit(props.props.email, values.code, props.props.username, props.props.password)
                            setTimeout(() => resetForm(), 1000)
                        }}>Отправить</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormCode;
