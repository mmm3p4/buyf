import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';

import { MDBTable, MDBCol, MDBTableHead, MDBTableBody, MDBRow } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modalpass from '../components/ModalPass';

const Profile = () => {
    const [currentUser, setcurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setcurrentUser(user);
        }
        else {
            window.location.href = "/auth";
        }
    }, [])

    const [modalShow, setModalShow] = React.useState(false);




    return (
        <div className='container'>
            {currentUser && (
                <div style={{ marginTop: "5%", color: "#9A1656", textAlign: "center" }}>

                    <h2 style={{ marginBottom: "5%" }}>
                        Профиль: <strong>{currentUser.username}</strong>
                    </h2>
                    <MDBTable style={{margin: "10% auto"}}>
                        <MDBRow style={{ background: "#9A1656", color: "#F0DAE1"}}>
                            <MDBCol>
                                <strong>Мои заказы</strong>
                            </MDBCol>
                            <MDBCol>
                                <strong>Мои данные</strong>
                            </MDBCol>
                            
                        </MDBRow>
                        <MDBRow style={{backgroundColor: "#F0DAE1", color: "#9A1656"}}>
                        <MDBCol>
                                <strong>Пусто</strong>
                            </MDBCol>
                            <MDBCol>
                            <strong>Email:</strong> {currentUser.email}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{backgroundColor: "#F0DAE1", color: "#9A1656"}}>
                            <MDBCol></MDBCol>
                            <MDBCol>
                            <Button variant="outline-light" onClick={() => setModalShow(true)}  style={{ display: "inline-block", marginRight: "9px", border: "1px solid #9A1656", color: "#9A1656" }}>Сменить пароль</Button>
                            </MDBCol>
                        </MDBRow>
                    </MDBTable>
                </div>)}
                <Modalpass
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
        </div>
        
            );
};
            export default Profile;

