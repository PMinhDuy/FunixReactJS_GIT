import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";


function MenuPhongBan(props) {

    // List components phòng ban
    const Department_list = props.department.map((dep) => {
        return(
            <Col key={dep.id} className="bg-light border" style={{padding: 5, textAlign: 'center'}} >
                    <h1>{dep.name}</h1>
                    <p>Số lượng nhân viên: {dep.numberOfStaff}</p>
                </Col>
        )
    })
    
    return(
        <React.Fragment>  
            <h5 style={{marginLeft: 100}}>
            <Link to="/">Nhân Viên </Link> / Phòng Ban
            </h5>
        <Container style={{margin: 40, marginLeft: 100}}>
            <Row xs="1" sm="2" md="3">
                {Department_list}
            </Row>
        </Container>
    </React.Fragment>
    )
}

export default MenuPhongBan