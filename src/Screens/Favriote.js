import React, { Component, useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom'
import Client from '../Client/Api'
import { Products } from '../Comp/Products';
import { ListGroup, Container, Row, Col } from 'reactstrap';
import { useViewport } from '../CustomHooks/WnidowHook'
import { reducer, initState } from '../Reducer/Favriote'
import { BiCartAlt, BiHeart } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export default function Favriote() {

    let route = useHistory();

    const { width } = useViewport()
    const [state, dispatch] = useReducer(reducer, initState);
    let { id } = useParams();
    let [products, setProducts] = useState([])
    let [size, setSize] = useState(false)

    function fav(ele) {
        let data = ele;
        let pro = products.map((pro) => {
            if (pro.id == data.id) {
                pro.fav = true
            }
            return pro
        })
        setProducts(pro)
        dispatch({ type: `${state.includes(ele) ? "RemoveFromFavriote" : "AddToFavriote"}`, payload: ele })
    }

    useEffect(() => {
        Client.get(`products?category=${id}`).then((res) => setProducts(res.data))
    }, [])

    useEffect(() => {
        if (size)
            Client.get(`products?size=${size}&category=${id}`).then((res) => { setProducts(res.data) })
    }, [size])

    function onSelectSize(e) {
        setSize(e.target.value)
    }

    return (
        <>
            <Container >
                <div onChange={(e) => onSelectSize(e)}>
                    <input type="radio" value="L" name="Size" /> Large
            <input type="radio" value="M" name="Size" /> Medium
            <input type="radio" value="S" name="Size" /> Small
        </div>
                {width > 500 ?
                    <Row>
                        {products.length && products.map((ele, index) => <Products addToFav={fav} data={ele} isMobile={width < 500} key={ele.id} name={ele.name} />)}
                    </Row> :
                    <ListGroup>
                        {products.length && products.map((ele, index) => <Products addToFav={fav} data={ele} isMobile={width < 500} key={ele.id} name={ele.name} />)}
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
                    <Col onClick={() => { route.push(`/Fav/favriote`); }} xs="6" >
                        <div className="icon-wraper">
                            <BiHeart className="icon" />
                        </div>
                    </Col>
                </Row>
            </div>
        </>)
}