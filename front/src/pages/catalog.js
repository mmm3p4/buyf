import React, { useState, useEffect } from "react";
import UnderShapka2 from "../components/UnderShapka2";
import Category from "../components/Category";
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import '../index';
import { Container, TabPane } from "reactstrap";
import Tovar from "../components/Tovar";
import axios from "axios";
import { useHttp } from "../hooks/http.hook";
import Spinner from "react-bootstrap/Spinner";

function Catalog() {
    const [catId, setCatId] = useState(0)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  const {request} = useHttp()
  useEffect(() => {
    setLoading(true);
    if (catId === 0) {
        request(`http://localhost:8081/products`)
        .then((response) => {
          setFilteredProducts(response.filter((product) => product.amount > 0));
          setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    } else {
        request(`http://localhost:8081/products/${catId}`)
      .then((response) => {
        setFilteredProducts(response.filter((product) => product.amount > 0));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

    });
}
      
}, [catId]);

  
    return (
        <div id="catcat">
            <UnderShapka2 />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Container style={{margin : "5%"}}>
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column" style={{position: "sticky", top: "5%"}}>
                                <Nav.Item>
                                    <Nav.Link eventKey="first" onClick={() => {setCatId(0); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Все</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" onClick={() => {setCatId(7); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Выгодные предложения</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third" onClick={() => {setCatId(1); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Розы</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth" onClick={() => {setCatId(2); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Хризантемы</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fiveth" onClick={() => {setCatId(3); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Лилии</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sixth" onClick={() => {setCatId(4); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Тюльпаны</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="seventh" onClick={() => {setCatId(5); setLoading(true)}} style={{ color: "#91A1656", marginBottom: 5 }}>Композиции</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="eighth" onClick={() => {setCatId(6); setLoading(true)}} style={{ color: "#91A1656"}}>Игрушки</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                        {loading && ( 
                            <div className="text-center mt-3">
                                <Spinner animation="border" style={{color: "#9A1656"}}/>
                            </div>
                            )}
                            <div className="tovarscont">
                                {filteredProducts.map((product, index) => {
                                    return <div className="tovar"><Tovar  key={index}
                                    id={product.id}
                                    name={product.name}
                                    amount={product.amount}
                                    price={product.price}
                                    lastprice={product.lastprice}
                                    photoId={product.photoId}
                                    catId={catId}/></div>   
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Tab.Container>
        </div>
    );
}

export default Catalog;