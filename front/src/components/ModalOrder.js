import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';
import { AlertError, AlertSuccess } from './Alert';

function ModalOrder(props) {
    const [name, setName] = useState('');
    const [isView, setIsView] = useState(false);
    const[show, setShow] = useState(true);

    const handleOnChange = (event) => {
        setName(event.target.value)
    }


    
    const [selectedTown, setSelectedTown] = useState('option1'); // значение по умолчанию

    const handleSelectChangeTown = (event) => {
        const selectedTown = event.target.value;
        setSelectedTown(selectedTown);
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn())
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsLoggedIn(true)
        }
    }, [])
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");

    const filteredAddresses = {
        option1: [], // Пустой массив, если город не выбран
        Москва: ['улица Пушкина, дом 15', 'улица Мира, дом 43', 'улица Каланчёвская, дом 134'],
        Владимир: ['улица Казарменная, дом 55', 'проспект Строителей, дом 13Г'],
        Краснодар: ['проспект Ленина, дом 75/2'],
        Казань: ['улица Советская, дом 14'],
        Уфа: ['улица Думская, дом 1'],
    };
    const addresses = filteredAddresses[selectedTown];
    const [selectedAddress, setSelectedAddress] = useState(addresses[0] || 'option1');
    const [inputedAddress, setInputedAddress] = useState('');

    const handleSelectChangeAddress = (event) => {
        setSelectedAddress(event.target.value);
    };
    const handleInputChangeAddress = (event) => {
        setInputedAddress(event.target.value);
    };

    useEffect(() => {
        if (name && selectedTown && (selectedAddress  || inputedAddress)) {
            if (selectedTown === 'option1' || selectedAddress === 'option1' || inputedAddress === '') {
                setIsView(false);
            }
            else {
                setIsView(true);
            }
        } else {
            setIsView(false);
        }
    }, [name, selectedTown, selectedAddress, inputedAddress, deliveryMethod]);
    


    const createOrder = async (deliveryMethod, selectedTown, selectedAddress, name, inputedAddress) => {
        let address, delivery
        if (deliveryMethod === "pickup") {
            address = selectedAddress;
            delivery = "Самовывоз"
        } else {
            address = inputedAddress;
            delivery = "Доставка"
        }
        console.log(selectedAddress)
        await AuthService.createOrder(user.id, props.product.id, name, address, selectedTown, delivery)
            .then((response) => {
                if (response.status === 200) {
                    AlertSuccess("Заказ оформлен");
                    setShow(false);
                    
                } else {
                    AlertError(response.data.message);

                }
            })
            .catch((err) => {
                console.log(err)
            });
    }


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
            <Modal.Body style={{ backgroundColor: "#F0DAE1", padding: "4%" }}>
                {isLoggedIn ? (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: "30px", paddingLeft: "5%", paddingTop: "3%" }}>{props.product.name}</Form.Label>
                            <img
                                className="buket1"
                                src={`http://localhost:8081/photo/${props.product.photoId}`}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: "24px", paddingLeft: "5%" }}>Цена: {props.product.price} Р</Form.Label>
                        </Form.Group>
                        <hr style={{ color: "#9A1656", width: "54%", borderWidth: "2px", float: "center", margin: "auto", padding: "2%" }} />
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: "20px", paddingLeft: "5%" }}>Выберите способ доставки:</Form.Label>
                            <div style={{ display: "flex", flexDirection: "row", paddingLeft: "5%", paddingTop: "2%", paddingBottom: "2%" }}>

                                <Form.Check
                                    type="radio"
                                    label="Самовывоз"
                                    name="delivery"
                                    id="pickup"
                                    value="pickup"
                                    checked={deliveryMethod === "pickup"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                    style={{ color: "#9A1656", display: "inline-block" }}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Доставка"
                                    name="delivery"
                                    id="delivery"
                                    value="delivery"
                                    checked={deliveryMethod === "delivery"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                    style={{ color: "#9A1656", display: "inline-block", marginLeft: "7%" }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ marginRight: "7%" }}>
                                <strong style={{ fontSize: "20px" }}>Имя и фамилия получателя</strong>
                                <Form.Control type="name" style={{ width: "50%", marginTop: "2%", marginBottom: "2%" }} placeholder="Введите имя и фамилию" value={name} onChange={(event) => handleOnChange(event)} />
                            </div>
                            {deliveryMethod === "pickup" ? (
                                <div>
                                    <strong style={{ fontSize: "20px" }}>Пункт выдачи</strong>
                                    <div style={{ display: "flex", marginTop: "2%" }}>
                                        <p style={{ fontSize: "19px", display: "inline-block" }}>Город</p>
                                        <p style={{ fontSize: "19px", display: "inline-block", marginLeft: "37%" }}>Адрес</p>
                                    </div>
                                    <div style={{ display: "flex", marginRight: "20%" }}>
                                        <Form.Select style={{ marginRight: "10%" }} defaultValue="option1" value={selectedTown} onChange={(event) => handleSelectChangeTown(event)}>
                                            <option value="option1">Не указано</option>
                                            <option value="Москва">Москва</option>
                                            <option value="Владимир">Владимир</option>
                                            <option value="Краснодар">Краснодар</option>
                                            <option value="Казань">Казань</option>
                                            <option value="Уфа">Уфа</option>
                                        </Form.Select>

                                        <Form.Select style={{ width: "100%" }} defaultValue="option1" value={selectedAddress} onChange={(event) => handleSelectChangeAddress(event)}>
                                            <option value="option1">Не указано</option>
                                            {addresses.map((address) => (
                                                <option key={address} value={address}>{address}</option>
                                            ))}
                                        </Form.Select>

                                    </div>
                                </div>) : (
                                <div>
                                    <strong style={{ fontSize: "20px" }}>Адрес для доставки</strong>
                                    <div style={{ display: "flex", marginTop: "2%" }}>
                                        <p style={{ fontSize: "19px", display: "inline-block" }}>Город</p>
                                        <p style={{ fontSize: "19px", display: "inline-block", marginLeft: "32%" }}>Адрес</p>
                                    </div>
                                    <div style={{ display: "flex", marginRight: "20%" }}>
                                        <Form.Select style={{ marginRight: "10%" }} defaultValue="option1" value={selectedTown} onChange={(event) => handleSelectChangeTown(event)}>
                                            <option value="option1">Не указано</option>
                                            <option value="Москва">Москва</option>
                                            <option value="Владимир">Владимир</option>
                                            <option value="Краснодар">Краснодар</option>
                                            <option value="Казань">Казань</option>
                                            <option value="Уфа">Уфа</option>
                                        </Form.Select>

                                        <Form.Control type="address" value={inputedAddress} onChange={(event) => handleInputChangeAddress(event)} style={{ width: "150%" }} placeholder="Введите адрес" />


                                    </div>
                                </div>

                            )}
                        </Form.Group>
                        <Button style={{ marginLeft: "43%", backgroundColor: "#9A1656", border: "none", marginTop: "1%" }} onClick={() => {createOrder(deliveryMethod, selectedTown, selectedAddress, name, inputedAddress); setShow(false)}} >Заказать</Button>
                    </Form>
                ) : (
                    <strong>Войдите или зарегистрируйтесь, чтобы оформлять заказы</strong>
                )}

            </Modal.Body>
        </Modal >
    );
}
export default ModalOrder;   
