import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";


function MenuBangLuong(props) {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    const Salary_list = props.staffs.map((sta) => {
        return(
            <Col key={sta.id} className="bg-light border" style={{padding: 5, textAlign: 'center'}} >
                    <h1>{sta.name}</h1>
                    <p>Mã nhân viên: {sta.id}</p>
                    <p>Hệ số lương: {sta.salaryScale}</p>
                    <p>Số giờ làm thêm: {sta.overTime}</p>
                    <p style={{backgroundColor: "gray"}}>Lương: {(sta.salaryScale * basicSalary) + (sta.overTime * overTimeSalary)}</p>
                </Col>
        )
    })
    return(
        <React.Fragment>   
            <h5 style={{marginLeft: 100}}>
            <Link to="/">Nhân Viên </Link> / Bảng Lương
            </h5>
        <Container style={{marginTop: 20}}>
            <Row xs="1" sm="2" md="3">
                {Salary_list}
            </Row>
        </Container>
    </React.Fragment>
    )
}

export default MenuBangLuong