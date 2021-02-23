import React, { useEffect, useState, useReducer } from 'react';
import Client from '../Client/Api'
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { reducer, initState } from '../Reducer/Favriote'
import { ListGroup, Container, Row, Col } from 'reactstrap';
import { Category } from '../Comp/Category';
import { useViewport } from '../CustomHooks/WnidowHook'
import "./Home.scss"
import { BiCartAlt, BiHeart } from "react-icons/bi";
import { Products } from '../Comp/Products'

export default function Home() {

    let route = useHistory();
    const { width } = useViewport()

    const [searchInput, setSearchInput] = useState('');
    const [reload, setReload] = useState(false);
    const [categories, setCategory] = useState([]);
    const [products, setProducts] = useState([])
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        if (reload) {
            Client.get(`products?text=${searchInput}`).then(res => { setProducts(res.data) })
        }
    }, [reload]);

    const callApi = () => { setReload(true) };
    const [debouncedCallApi] = useState(() => _.debounce(callApi, 1000));

    function handleChange(e) {
        setReload(false)
        setSearchInput(e.target.value)
        debouncedCallApi();
    }

    useEffect(() => {
        Client.get(`categories`).then(res => setCategory(res.data))
    }, [])

    function handleClick(id) {
        route.push(`${id}`);
    }
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

    return (
        <>
            <Container className="cont" style={{ height: '1000px' }}>

                <input className="searchInput" placeholder="Search" onChange={handleChange} />
                <div>

                    {searchInput.length ?
                        <>
                            {width > 500 ?
                                <Row>
                                    {products.length && products.map((ele, index) => <Products addToFav={fav} data={ele} isMobile={width < 500} key={ele.id} name={ele.name} moveTo={() => handleClick(ele.category_key)} />)}
                                </Row> :
                                <ListGroup>
                                    {products.length && products.map((ele, index) => <Products addToFav={fav} data={ele} isMobile={width < 500} key={ele.id} name={ele.name} moveTo={() => handleClick(ele.category_key)} />)}
                                </ListGroup>
                            }
                        </>
                        :
                        <>
                            {width > 500 ?
                                <Row>
                                    {categories.length && categories.map((ele, index) => <Category data={ele} isMobile={width < 500} key={ele.id} name={ele.name} moveTo={() => handleClick(ele.category_key)} />)}
                                </Row> :
                                <ListGroup>
                                    {categories.length && categories.map((ele, index) => <Category data={ele} isMobile={width < 500} key={ele.id} name={ele.name} moveTo={() => handleClick(ele.category_key)} />)}
                                </ListGroup>
                            }
                        </>
                    }
                </div>

            </Container>
            <div className="footer">
                <Row>
                    <Col xs="6" >
                        <div className="icon-wraper">
                            <BiCartAlt className="icon" />
                        </div>
                    </Col>
                    <Col xs="6" >
                        <div className="icon-wraper" onClick={() => { route.push(`/Fav/favriote`); }} >
                            <BiHeart className="icon" />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}