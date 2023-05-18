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
import {observer} from "mobx-react-lite"
import { AlertError, AlertSuccess } from './Alert';

const Footer = () => {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    if (user) {
      AuthService.isSubscribed(user.email)
        .then((response) => {
          if (response.status === 200 && response.data.subscribed === true) {
            setIsSubscribe(true);
          } else {
            setIsSubscribe(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);



  const handleSubscribe = async () => {
    try {
      await AuthService.postSubscribed(user.email, true).then((response) => {
        if (response.status === 200) {
        AlertSuccess("Вы успешно подписались на рассылку")
        
        }
        else{
          AlertError("Произошла ошибка при подписке на рассылку")
        }
      })

      
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  }

  return (
    <>
    <MDBFooter className='text-center' color='white' style={{ backgroundColor: "#9A1656", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
      <MDBContainer className='p-1'>
        
        <section>
          <p className='footerlogo'>BUYF</p>
          <form>
            <MDBRow className='d-flex justify-content-center'>
              {user ?
                !isSubscribe ? (
                  <>
                    <MDBCol size="auto">
                      <p className='pt-2'>
                        <strong>Хотите подписаться на рассылку BUYF?  Ваш e-mail:   {user.email}</strong>
                      </p>
                    </MDBCol>
                    <MDBCol size="auto" style={{ display: "flex", marginTop: 0, padding: "4px" }}>
                      <Button variant="outline-light" style={{ display: "inline-block", marginRight: "9px" }} onClick={() => handleSubscribe()}>Подписаться</Button>
                    </MDBCol>
                  </>): (null):(
                <strong>Чтобы получать все новости в нашей рассылке, зарегистрируйтесь и подпишитесь на рассылку!</strong>)}
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
    </>
  )
}
export default observer(Footer);
