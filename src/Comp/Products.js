import React from 'react';
import { Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
    Button, 
    Row, 
    ListGroupItem , Col} from 'reactstrap';
import "./category-card.scss";
import { BiStar, BiHeart} from "react-icons/bi";

export const Products = (props) => {
    return(
        props.isMobile  ?
         <ListGroupItem className="productItem" key ={props.id}  >
             <Row>
             <Col xs="6" className="col-custom">
                    <img className="image" src={props.data.category_image}/>
            </Col>
                 <Col xs="6">
                    <p className="left">{props.name}</p>
                    <p>
                        <BiStar color="#d39e00"/>
                        <BiStar color="#d39e00"/>
                        <BiStar color="#d39e00"/>
                        <BiStar/>
                        <BiStar/>
                    </p>
                    <p className="left">51$</p>
                    <div onClick={()=>props.addToFav(props.data)} className="icon-wraper">
                    <BiHeart color={props.data.fav ? "red" : ""}/>
                    </div>
                </Col>

                

             </Row>
        </ListGroupItem>
         : 
         <Col className="category-card" xs="6" sm="4">
         <Card>
         <CardImg top width="100%" src={props.data.category_image} alt={props.name} />
         <CardBody>
           <CardTitle tag="h5">{props.name}</CardTitle>
    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.name}</CardSubtitle>
           <CardText>
           </CardText>
           <Button onClick={()=>props.moveTo()}>View</Button>
         </CardBody>
       </Card>
       </Col>
    )
}