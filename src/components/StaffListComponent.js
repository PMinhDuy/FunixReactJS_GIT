import React, { Component } from 'react';
import {
    Card, Container, Row, Col, NavbarBrand
} from 'reactstrap';

import dateFormat from "dateformat";

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: "Bấm vào tên nhân viên để xem thông tin"
        }
    }

    changeDetail(staff) {
        console.log(staff.name)
        console.log(dateFormat(staff.doB, "dd/mm/yyyy"))
        this.setState({
            details:
                <Card >
                    <h3>Họ và tên: {staff.name}</h3>
                    <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                    <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                    <p>Phòng ban: {staff.department.name}</p>
                    <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                    <p>Số ngày đã làm thêm: {staff.overTime}</p>
                </Card>
        }
        )
    }

    render() {
        const staff_list = this.props.staffs.map((staff) => {
            return (
                <Col className="bg-light border" style={{padding: 5}} onClick={() => { this.changeDetail(staff) }}>
                    {staff.name}
                </Col>
            );
        });

        return (
            <React.Fragment>
                <NavbarBrand className="bg-secondary  navbar ">
                    Ứng dụng quản lý nhân sự v1.0
                </NavbarBrand>
                <Container style={{marginTop: 20}}>
                    <Row xs="1" sm="2" md="3">
                        {staff_list}
                    </Row>
                    <div className=" border" style={{textAlign: 'center'}}>{this.state.details}</div>
                </Container>
            </React.Fragment>

        );
    }
}
export default StaffList;