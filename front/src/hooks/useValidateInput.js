import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useState} from "react";
import AuthService from "../services/Auth.service";
import { Link, useNavigate } from 'react-router-dom';



const FormCode = (props) => {
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()
    console.log(props)
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
                        .required('Обязательное поле!'),
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
                        <p style={{ fontSize: "20px", color: "#9A1656", fontWeight: "bold" }}>Введите код</p>
                        <div>

                            <div>
                                <Field
                                    name={"code"}
                                    className="form-control"
                                    id={"code"}
                                    placeholder="&nbsp;"
                                    type={'text'}
                                />
                                <label>Эл. почта</label>
                                <ErrorMessage name={'code'} component={'div'}/>
                            </div>
                            
                            {errors.length > 0 ? <div>
                                <h4 style={{color: 'red'}}>{errors}</h4>
                            </div> : null}
                        </div>
                        <Link type={'submit'} disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                            isSubmitting = true
                            await handleSubmit(props.email, values.code, props.username, props.password)
                            console.log(values.code)
                            setTimeout(() => resetForm(), 1000)
                        }}>Отправить</Link>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormCode;
