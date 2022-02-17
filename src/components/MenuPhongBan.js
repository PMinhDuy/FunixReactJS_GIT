import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";
import { FadeTransform } from 'react-animation-components';

function MenuPhongBan({stateDepartments, stateLoadDepartment}) {
    
    const RenderDepartmentList = () => {
        if (stateLoadDepartment) {
            return (
                <div className="col-12" >
                    <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                    <p>Loading . . .</p>
                </div>
            )
        }
        else {
            return (
                Department_list
            )
        }
    }

    // List components phòng ban
    const Department_list = stateDepartments.map((dep) => {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Col key={dep.id} className="bg-light border" style={{ padding: 5, textAlign: 'center' }} >
                <Link to={`/chitietphongban/${dep.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                    <h1>{dep.name}</h1>
                    <p>Số lượng nhân viên: {dep.numberOfStaff}</p>
                </Link>
            </Col>
            </FadeTransform>
        )
    })


    return (
        <React.Fragment>
            <h5 style={{ marginLeft: 100 }}>
                <Link to="/">Nhân Viên </Link> / Phòng Ban
            </h5>
            <Container style={{ margin: 40, marginLeft: 100 }}>
                <Row xs="1" sm="2" md="3">
                    <RenderDepartmentList />
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default MenuPhongBan;