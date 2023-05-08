
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import sale from "../img/sale.png"
import {
  MDBFooter,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

function Buy() {
  const [product, setProduct] = useState({});
  const productId = useParams()

  

  useEffect(() => {
    axios.get(`http://localhost:8081/product/${productId.id}`).then((response) => {
      setProduct(response.data);
      
    });
  }, []);
  console.log(product.photoId)
  
  if (!product.id) return null;

  return (
    <>
    <div style={{marginTop: "2%", display: "flex", justifyContent: "space-between" }}>
  <Button variant="btn-light" href='/' style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "inline-block", border: "none", width: "8%", marginLeft: "12%", float: "left"}}>На главную</Button>
  <Button variant="btn-light" href='/catalog' style={{ backgroundColor: "#F0DAE1", color: "#9A1656", display: "inline-block", border: "none", width: "8%", float: "right", marginRight: "12%"}}>В каталог</Button>
  </div>
    <MDBRow>
    <div id="cards1">
      <MDBCol style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "-3%"}}>
        <img
          variant="left"
          className="buket1"
          src={`http://localhost:8081/photo/${product.photoId}`}
        />
        
        </MDBCol>
        <MDBCol style={{marginLeft: "5%"}}>
        <Card.Body>
          <Card.Title className="bukettitle">{product.name}</Card.Title>
          {product.lastprice ? (
            <div>
              <span className="opisanie">Описание:</span><p className="desc">{product.description}</p>
              <div className="bukettitle" style={{ fontSize: "26px", display: "flex", marginTop: "1%", fontWeight: "bold"}}> Доставка от 1 ч.</div>
              <span className="new">{product.price} Р </span>
              <span className="last">{product.lastprice} Р </span>
              
              <Button variant="light" className="cina1">Купить</Button>
            </div>
          ) : (
            <div>
              <span className="opisanie">Описание:</span><p className="desc">{product.description}</p>
              <div className="bukettitle" style={{ fontSize: "26px", display: "flex", marginTop: "1%", fontWeight: "bold"}}> Доставка от 1 ч.</div>
              <span className="new" >{product.price} Р </span>
            <Button variant="light" className="cina1">Купить</Button>
            </div>
          )}
        </Card.Body>
        </MDBCol>
      </div>
      </MDBRow>
      
  </>
  )
}

export default Buy;
