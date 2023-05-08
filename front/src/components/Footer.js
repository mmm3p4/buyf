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

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' style={{ backgroundColor: "#9A1656", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
      <MDBContainer className='p-1'>
        <section>
          <p className='footerlogo'>BUYF</p>
          <form>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-1'>
                  <strong>Введите e-mail</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' className='mb-3 text-center' placeholder='Подписка на рассылку' style={{ textAlign: "center" }} />
              </MDBCol>

              <MDBCol size="auto">
              <Button variant="outline-light">Подписаться</Button>
              </MDBCol>
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
  );
}