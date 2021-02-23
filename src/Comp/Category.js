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
import "./category-card.scss"
export const Category = (props) => {
    return(
        props.isMobile  ?
         <ListGroupItem className="mainListItem" key ={props.id} onClick={()=>props.moveTo()} >
             <Row>
                 <Col xs="6">
                    <p className="left">{props.name}</p>
                    <p></p>
                </Col>

                <Col xs="6" className="col-custom">
                    <img className="image" src={props.data.category_image}/>
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