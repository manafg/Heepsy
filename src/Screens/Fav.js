import React, { Component, useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom'
import Client from '../Client/Api'
import { Products } from '../Comp/Products';
import { ListGroup, Container, Row, Col } from 'reactstrap';
import { useViewport } from '../CustomHooks/WnidowHook'
import { reducer, initState } from '../Reducer/Favriote'
import { BiCartAlt, BiHeart } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export default function Fav() {
    debugger
    const { width } = useViewport()
    const [state, dispatch] = useReducer(reducer, initState);
    let route = useHistory();

    let { id } = useParams();
    let [products, setProducts] = useState([])
    let [size, setSize] = useState(false)



    return (
        <>
            <Container >

                {width > 500 ?
                    <Row>
                        {state.length && state.map((ele, index) => <Products  data={ele} isMobile={width < 500} key={ele.id} name={ele.name} />)}
                    </Row> :
                    <ListGroup>
                        {state.length && state.map((ele, index) => <Products data={ele} isMobile={width < 500} key={ele.id} name={ele.name} />)}
                    </ListGroup>
                }
            </Container>
            <div className="footer">
                <Row>
                    <Col xs="6" >
                        <div onClick={() => { route.push(`/`); }} className="icon-wraper">
                            <BiCartAlt className="icon" />
                        </div>
                    </Col>
                    <Col xs="6"  >
                        <div className="icon-wraper">
                            <BiHeart className="icon" />
                        </div>
                    </Col>
                </Row>
            </div>
        </>)
}