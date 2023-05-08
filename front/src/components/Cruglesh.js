import React from "react";
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import sale from "../img/sale.png"


function Cruglesh() {

  const [us, setUs] = useState([])
  const { request } = useHttp()
  useEffect(() => {
    request(`http://localhost:8081/products/7`).then((data) => setUs(data.filter((product) => product.amount > 0)));
  }, []);

  return (
    <div className="cardscont">
      {us.map(({ id, name, amount, price, lastprice, photoId }, index) => (
        <Card id="cards" key={index}>
          <Card.Img variant="top" className="buket1" src={`http://localhost:8081/photo/${photoId}`} />
          <Card.Body >
            <Card.Title className="bukettitle">{name}</Card.Title>
            <div style={{ display: "flex" }}>
              <img className="sale" style={{ display: "inline-block" }} src={sale} />
              <Button style={{ display: "inline-block" }} variant="light" className="cina1" href={`/product/${id}`}><span className="new">{price} Р </span><span className="last">{lastprice} Р</span></Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default Cruglesh;
