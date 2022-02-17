import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";
import { FadeTransform } from 'react-animation-components';

function MenuBangLuong({ stateSalary, stateLoadSalary }) {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;

    const RenderSalaryList = () => {
        if (stateLoadSalary) {
            return (
                <div className="col-12" >
                    <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                    <p>Loading . . .</p>
                </div>
            )
        }
        else {
            return (
                Salary_list
            )
        }
    }

    // List Component bảng lương
    const Salary_list = stateSalary.map((sal) => {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Col key={sal.id} className="bg-light border" style={{ padding: 5, textAlign: 'center' }} >
                    <h1>{sal.name}</h1>
                    <p>Mã nhân viên: {sal.id}</p>
                    <p>Hệ số lương: {sal.salaryScale}</p>
                    <p>Số giờ làm thêm: {sal.overTime}</p>
                    <p style={{ backgroundColor: "gray" }}>Lương: {(sal.salaryScale * basicSalary) + (sal.overTime * overTimeSalary)}</p>
                </Col>
            </FadeTransform>
        )
    })

    return (
        <React.Fragment>
            <h5 style={{ marginLeft: 100 }}>
                <Link to="/">Nhân Viên </Link> / Bảng Lương
            </h5>
            <Container style={{ marginTop: 20 }}>
                <Row xs="1" sm="2" md="3">
                    <RenderSalaryList />
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default MenuBangLuong