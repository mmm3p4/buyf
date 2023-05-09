import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import '../index.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import AuthService from '../services/Auth.service';
import validator from 'validator';

export default function Footer() {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [showBlock, setShowBlock] = useState(localStorage.getItem('showBlock') !== 'false');
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      AuthService.isSubscribed(user.email)
        .then((response) => {
          setIsSubscribe(response.data.isSubscribed);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowBlock(localStorage.getItem('showBlock') !== 'false');
  }, []);

  const handleHideBlock = () => {
    localStorage.setItem('showBlock', 'false');
    setShowBlock(false);
  }

  const handleSubscribe = async () => {
      try {
        await AuthService.postSubscribed(user.email, true);
        console.log("Subscription successful!");
      } catch (error) {
        console.error("Error subscribing:", error);
      }
      setShowBlock(false);
      localStorage.setItem("showBlock", "false");
    }



  useEffect(() => {
    const showBlockFromLocalStorage = localStorage.getItem("showBlock");
    setShowBlock(showBlockFromLocalStorage !== "false");
  }, []);
  return (
    <MDBFooter className='text-center' color='white' style={{ backgroundColor: "#9A1656", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
      <MDBContainer className='p-1'>
        <section>
          <p className='footerlogo'>BUYF</p>
          <form>
            <MDBRow className='d-flex justify-content-center'>
              {user && !isSubscribe && showBlock ? (
                <>
                <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Хотите подписаться на рассылку BUYF?  Ваш e-mail:   {user.email}</strong>
                </p>
                </MDBCol>
              {/* <MDBCol md='5' start>
                <MDBInput contrast type='email' value={email} onChange={handleEmailChange} className='mb-3 text-center' placeholder='Подписка на рассылку' style={{ textAlign: "center" }} />
              </MDBCol> */}
              <MDBCol size="auto" style={{display: "flex", marginTop: 0, padding: "4px"}}>
              <Button variant="outline-light" style={{display: "inline-block", marginRight: "9px"}} onClick={handleSubscribe}>Подписаться</Button> 
              <Button variant="light" style={{display: "inline-block"}} onClick={() => {
                        setShowBlock(false);
                        localStorage.setItem("showBlock", "false");
                      }}>Больше не показывать</Button>
              </MDBCol>
              </>
              ): (null)}
            </MDBRow>
          </form>
        </section>

        <section className='mb-3'>
          <h4 className="mt-4 mb-4" style={{ fontWeight: "bold" }}>НАШИ КОНТАКТЫ:</h4>
        </section>

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-3 mb-md-0'>
              <h5 className='text-uppercase mb-2'>Адрес</h5>
              <p className='mb-3' style={{ fontSize: "17px", color: "rgba(240, 218, 225, 0.9)" }}>
                г. Москва, ул. Пушкина, д. 23, офис 224
              </p>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-3 mb-md-0'>
              <h5 className='text-uppercase mb-2'>Почта</h5>
              <p className='mb-3' style={{ fontSize: "17px", color: "rgba(240, 218, 225, 0.9)" }}>
                buyfservice@mail.ru
              </p>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-3 mb-md-0'>
              <h5 className='text-uppercase mb-2'>INSTAGRAM</h5>
              <p className='mb-3' style={{ fontSize: "17px", color: "rgba(240, 218, 225, 0.9)" }}>
                @buyfservice
              </p>

            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-3 mb-md-0'>
              <h5 className='text-uppercase mb-2'>PINTEREST</h5>
              <p className='mb-3' style={{ fontSize: "17px", color: "rgba(240, 218, 225, 0.9)" }}>
                buyfservice
              </p>

            </MDBCol>

          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-2' style={{ backgroundColor: "#9A1656" }}>
        <p className="text-light" style={{ marginBottom: 0 }}>&copy; 2021–2023  BUYF Company, Inc. &middot; <a href="/catalog" className="text-light" style={{ textDecoration: "none" }}>  Каталог  </a>&middot; <a href="/faq" className="text-light" style={{ textDecoration: "none" }}>  FAQ  </a></p>
      </div>
    </MDBFooter>
  )
}
