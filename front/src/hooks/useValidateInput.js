import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useState} from "react";
import AuthService from "../services/Auth.service";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";



const FormCode = (props) => {
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (email, code, username, password) => {
        try {
            await AuthService.postActivationCode(email, code)
            .then(async () => {
                console.log(username, password)
                await AuthService.login(username, password);
                navigate("/")
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
                        <Button disabled={!(isValid && dirty) || isSubmitting} style={{ backgroundColor: "#9A1656", textDecoration: "none", color: "#F0DAE1", display: "block", margin: "0 auto", marginTop: "4%", padding: "2%", width: "fit-content", borderRadius: "25%" }} onClick={async () => {
                            isSubmitting = true
                            await handleSubmit(props.email, values.code, props.username, props.password)
                            setTimeout(() => resetForm(), 1000)
                        }}>Отправить</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormCode;
