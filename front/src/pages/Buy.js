import React, { useState, useEffect, useRef} from "react";
import { useParams} from "react-router-dom";
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import AuthService from '../services/Auth.service';
import {MDBCol, MDBRow} from 'mdb-react-ui-kit';
import RightButton from "../components/RightButton";
import LeftButton from "../components/LeftButton";
import ModalOrder from "../components/ModalOrder";


function Buy() {
  const [product, setProduct] = useState({});
  const productId = useParams()
  const [hasNext, setHasNext] = useState(true);
  const [modalShow, setModalShow] = useState(false);


  
  const nextProductIdRef = useRef(Number(productId.id) + 1);

  const handleNext = () => {
    window.location.href = `http://localhost:3000/product/${nextProductIdRef.current}`;
    nextProductIdRef.current += 1;
  };
  const checkNextProduct = async () => {
    try {
      const response = await AuthService.getProductById(nextProductIdRef.current);
      if (response.status === 200) {
        setHasNext(true);
      } else if (response.status === 404) {
        setHasNext(false);
      }
    } catch (error) {
      console.error(error);
      setHasNext(false);
    }
  };
  
  useEffect(() => {
    checkNextProduct();
  }, []);
const pastProductIdRef = useRef(Number(productId.id) - 1);

  const handlePast = () => {
  window.location.href = `http://localhost:3000/product/${pastProductIdRef.current}`;
  pastProductIdRef.current -= 1;
};

  


  useEffect(() => {
    axios.get(`http://localhost:8081/product/${productId.id}`).then((response) => {
      setProduct(response.data);
      
    });
  }, []);
  
  if (!product.id) return null;

  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
    {productId.id > 1 && <LeftButton handlePast={handlePast} />}
    {hasNext && <RightButton handleNext={handleNext} />} 
  </div>
    <MDBRow style={{bsGutterX: 0}}>
    <div id="cards1" style={{bsGutterX: 0}}>
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
            <div>
              <span className="opisanie">Описание:</span><p className="desc">{product.description}</p>
              <div className="bukettitle" style={{ fontSize: "26px", display: "flex", marginTop: "1%", fontWeight: "bold"}}> Доставка от 1 ч.</div>
              <span className="new">{product.price} Р </span>
              {product.lastprice ? (
              <span className="last">{product.lastprice} Р </span>
              ): (null)}
              <Button variant="light" className="cina1" onClick={() => setModalShow(true)}>Купить</Button>
            </div>
        </Card.Body>
        </MDBCol>
      </div>
      
      </MDBRow>
      <ModalOrder show={modalShow} onHide={() => setModalShow(false)} product={product}/>
  </>
  )
}

export default Buy;
