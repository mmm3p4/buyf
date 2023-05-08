import React from "react";
import '../index.css';
import Corsinka from "../img/Corsinka.png"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import axios from "axios";
import { useHttp } from "../hooks/http.hook";
import sale from "../img/sale.png"

function Tovar({ id, name, amount, price, lastprice, photoId, catId }) {
  const [deliveryTime, setDeliveryTime] = useState(null);
  useEffect(() => {
    setDeliveryTime(Math.floor(Math.random() * (59 - 30 + 1)) + 30);
  }, []);
  console.log(id)

  return (
    <div>
      <Card id="cards">
        <Card.Img
          variant="top"
          className="buket1"
          src={`http://localhost:8081/photo/${photoId}`}
        />
        <Card.Body>
          <Card.Title className="bukettitle">{name}</Card.Title>
          {lastprice ? (
            <div style={{ display: "flex" }}>
              <img className="sale" style={{display: "inline-block"}} src={sale} />
              <Button
                variant="light"
                className="cina1"
                href={`/product/${id}`}
                style={{display: "inline-block"}}
              >
                <span className="new">{price} Р </span>
                <span className="last">{lastprice} Р </span>
              </Button>
            </div>
          ) : (
            <div style={{display: "flex", alignItems: "center",justifyContent: "center"}}>
            <div className="bukettitle" style={{display: "inline-block"}}>~ {deliveryTime} мин.</div>
            <Button
              variant="light"
              className="cina2"
              href={`/product/${id}`}
              style={{display: "inline-block"}}
            >
              <span className="new" >{price} Р </span>
            </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Tovar;
