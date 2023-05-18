import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';

import { MDBTable, MDBCol, MDBTableHead, MDBTableBody, MDBRow } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modalpass from '../components/ModalPass';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [userOrders, setUserOrders] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isEmailActive, setIsEmailActive] = useState(false);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        if (user) {
          setCurrentUser(user);
        }
        AuthService.getOrders(user.id)
          .then((res) => {
            setUserOrders(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        AuthService.isSubscribed(user.email)
          .then((response) => {
            if (response.data.subscribed === true){
                setIsSubscribed(true)
            }
            else {
                setIsSubscribed(false)
            }
          })
          .catch((error) => {
            console.error(error);
            setIsSubscribed(false);
          });
    
        AuthService.isActiveEmail(user.email)
          .then((response) => {
            if (response.status === 200){
            setIsEmailActive(true);
            }
            else {
                setIsEmailActive(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setIsEmailActive(false);
          });
      }, []);

    const [modalShow, setModalShow] = React.useState(false);
    
    const CheckSubscribe = async (email) => {
        try {
          const response = await AuthService.isSubscribed(email);
          if (response.status === 200 && response.data.subscribed === true) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      };
      
    const CheckActivate = async () => {
        await AuthService.isActiveEmail(user.email)
            .then((response) => {
                if (response.status === 200)
                    return true
                else return false
            });
    }


    return (
        <div className='container'>
            {currentUser && (
                <>
                    <div style={{ marginTop: "5%", color: "#9A1656", textAlign: "center" }}>
                        <h2 style={{ marginBottom: "2%" }}>
                            Профиль: <strong>{currentUser.username}</strong>
                        </h2>
                    </div>
                    <MDBTable style={{ margin: "7% auto", fontSize: "20px", width: "70%" }}>
                        <MDBRow style={{ background: "#9A1656", color: "#F0DAE1", textAlign: "center", fontSize: "20px", padding: "1%", borderRight: "2px solid #F0DAE1" }}>
                            <MDBCol>
                                <strong>Мои заказы</strong>
                            </MDBCol>
                            <MDBCol>
                                <strong>Мои данные</strong>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ border: "2px solid #9A1656" }}>
                            <MDBCol style={{ backgroundColor: "#F0DAE1", borderRight: "2px solid #9A1656" }}>
                                {userOrders.length ? (
                                    userOrders.map(order => (
                                        <MDBRow key={order.id} style={{ backgroundColor: "#F0DAE1", color: "#9A1656" }}>
                                            <MDBCol>
                                                <strong>№ заказа: {order.id}</strong>
                                                <br />
                                                {/* <img
                                                    variant="left"
                                                    className="buket1"
                                                    src={`http://localhost:8081/photo/${product.photoId}`}
                                                /> */}
                                                <strong>Статус:</strong> {order.status}
                                                <br />
                                                <strong>Дата оформления:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                                <br />
                                                <strong>Сумма:</strong> {order.price} руб.

                                            </MDBCol>
                                        </MDBRow>
                                    ))
                                ) : (
                                    <MDBRow style={{ backgroundColor: "#F0DAE1", color: "#9A1656" }}>
                                        <MDBCol>
                                            <strong>У вас нет активных заказов</strong>
                                        </MDBCol>
                                    </MDBRow>
                                )}
                            </MDBCol>
                            <MDBCol style={{ backgroundColor: "#F0DAE1" }}>
                                <MDBRow style={{ backgroundColor: "#F0DAE1", color: "#9A1656" }}>
                                    <MDBCol>
                                        <strong>Email:</strong> {currentUser.email}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ backgroundColor: "#F0DAE1", color: "#9A1656" }}>
                                    <MDBCol>
                                        <Button variant="outline-light" onClick={() => setModalShow(true)} style={{ display: "inline-block", marginRight: "9px", border: "1px solid #9A1656", color: "#9A1656" }}>Сменить пароль</Button>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ backgroundColor: "#F0DAE1", color: "#9A1656" }}>
                                    <MDBCol>
                                        <strong>Подписка на рассылку: </strong>
                                        {isSubscribed ? (<p>Подключена</p>) : (<p>Не подключена</p>)} 
                                    </MDBCol>

                                </MDBRow>
                                <MDBRow style={{ backgroundColor: "#F0DAE1", color: "#9A1656" }}>
                                    <MDBCol>
                                        <strong>Статус почты: </strong>
                                        {isEmailActive ? (<p>Активна</p>) : (<p>Не активна</p>)} 

                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBTable>
                    <Modalpass
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </>
            )}
        </div>
    );
};
export default Profile;
