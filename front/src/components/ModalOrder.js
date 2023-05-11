import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';

function ModalOrder(props) {
    // const [password, setPassword] = useState('');
    // const [newpassword, setNewPassword] = useState('');
    // const handleOnChange1 = (event) => {
    //     setPassword(event.target.value)
    // }
    // const handleOnChange2 = (event) => {
    //     setNewPassword(event.target.value)
    // }
    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn())
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsLoggedIn(true)
        }
    }, [])
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
  };
    // const username = user.username; 

    // const updatePass = async () => {
    //     await AuthService.updatePass(username, password, newpassword)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 alert("Пароль успешно изменен");
    //                 AuthService.logout()
    //                 window.location.href = '/auth';
    //             } else {
    //                 setPassword("");
    //                 setNewPassword("");
    //                 alert(response.data.message);

    //             }
    //         })
    //         .catch((err) => {
    //             alert(err.response.data.message)
    //         });
    // }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ color: "#9A1656" }}
            animation
        >
            <Modal.Header style={{ backgroundColor: "#9A1656" }} closeVariant="white" closeButton>
                <Modal.Title id="contained-modal-title-center" style={{ marginLeft: "34%", textAlign: "center", color: "#F0DAE1" }}>Оформление заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#F0DAE1", padding: "6%" }}>
                {isLoggedIn ? (
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ fontSize: "30px", paddingLeft: "5%", paddingTop: "7%" }}>{props.product.name}</Form.Label>
                            <img
                                className="buket1"
                                src={`http://localhost:8081/photo/${props.product.photoId}`}
                            />
                            {/* <Form.Control type="password" placeholder="Введите текущий пароль" value={password} onChange={(event) => handleOnChange1(event)}  /> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ fontSize: "24px", paddingLeft: "5%" }}>Цена: {props.product.price} Р</Form.Label>
                            {/* <Form.Control type="password" placeholder="Введите новый пароль" value={newpassword} onChange={(event) => handleOnChange2(event)} /> */}
                        </Form.Group>
                        <hr style={{ color: "#9A1656", width: "54%", borderWidth: "2px", float: "center", margin: "auto", padding: "2%" }} />
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ fontSize: "20px", paddingLeft: "5%" }}>Выберите способ доставки:</Form.Label>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Form.Check
                                    type="radio"
                                    label="Доставка"
                                    name="delivery"
                                    id="delivery"
                                    value="delivery"
                                    checked={deliveryMethod === "delivery"}
                                    onChange={() => setDeliveryMethod("delivery")}
                                    style={{color: "#9A1656"}}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Самовывоз"
                                    name="delivery"
                                    id="pickup"
                                    value="pickup"
                                    checked={deliveryMethod === "pickup"}
                                    onChange={() => setDeliveryMethod("pickup")}
                                />
                            </div>
                            {/* <Form.Control type="password" placeholder="Введите новый пароль" value={newpassword} onChange={(event) => handleOnChange2(event)} /> */}
                        </Form.Group>
                    </Form>
                ) : (
                    <strong>Войдите или зарегистрируйтесь, чтобы оформлять заказы</strong>
                )}

            </Modal.Body>
            {/* <Button style={{margin: "auto", marginBottom: "3%"}} onClick={updatePass}>Сменить пароль</Button> */}

        </Modal >
    );
}
export default ModalOrder;   
