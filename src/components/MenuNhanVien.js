import React from 'react';
import {
    Container, Row, Label, FormGroup, Form, Input, Col, Button
} from 'reactstrap';
import { Switch, Route, Redirect, withRouter, Link, Routes } from 'react-router-dom'
import { useState, useRef } from 'react'
import { connect } from "react-redux";

import { actAddStaff } from '../actions/index'



const newStaff = {
    id: '',
    name: '',
    doB: '',
    salaryScale: '',
    startDate: '',
    department: '',
    annualLeave: '',
    overTime: '',
    salary: "",
    image: '/assets/images/alberto.png',
}

function MenuNhanvien(props) {
    console.log(props.staffs)
    const [staff, setStaff] = useState(newStaff)
    // const [content, setContent] = useState()
    // const idStaff = useRef(props.staffs.length - 1)


    // List components staff
    const Staff_list = props.staffs.map((staff) => {
        return (
            <Col key={staff.id} className="bg-light border" style={{ padding: 5, textAlign: 'center' }} >
                <Link to={`/chitietnhanvien/${staff.id}`}>
                    <img style={{ width: "100%" }} src={staff.image} alt="hinh anh" />
                </Link>
                <p>{staff.name}</p>
            </Col>
        )
    });


    // Hàm xử lý nhấn nút để hiển thị form
    const AddStaff = () => {
        document.getElementById('addStaff').style.display = "block";
        document.getElementById('StaffList').style.opacity = 0.3;
    }

    // Hàm xử lý add
    const handleSubmit = (event) => {
        // staff.id = idStaff.current + 1
        // // setStaffs([
        // //   ...staffs,
        // //   staff
        // // ])
        const tempStaff = staff
        props.addStaff(tempStaff)
        // console.log(staff)
        alert("Bạn có chắc chắn muốn thêm?")
        document.getElementById('addStaff').style.display = "none";
        document.getElementById('StaffList').style.opacity = 1;
        event.preventDefault();
    }

    // Hàm xử lý khi nhập ô input
    const handleInputChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setStaff({
            ...staff,
            [name]: value
        })

    }

    // Component addStaff
    const AddStaffs = () => {
        return (
            <div id="addStaff" style={{ width: "50%", position: "absolute", top: "150px", left: "350px", backgroundColor: "gray", display: "none" }}>
                <Form >
                    <h2>Thêm nhân viên mới</h2>
                    <FormGroup row >
                        <Label htmlFor="Name" md={2}>Họ và tên</Label>
                        <Col md={10}>
                            <Input type="text" id="name" name="name"
                                placeholder="Name..."
                                value={staff.name}
                                onChange={handleInputChange}
                            // onBlur={this.handleBlur("firstname")}
                            />
                            {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                        </Col>
                    </FormGroup>
                    <FormGroup row >
                        <Label htmlFor="doB" md={2}>Năm sinh</Label>
                        <Col md={10}>
                            <Input type="text" id="doB" name="doB"
                                placeholder="1999-11-19"
                                value={staff.doB}
                                onChange={handleInputChange}
                            // onBlur={this.handleBlur("firstname")}
                            />
                            {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                        </Col>
                    </FormGroup>

                    <FormGroup row >
                        <Label md={2}>Phòng Ban</Label>
                        <Col md={10}>
                            <Input type="select" name="department"
                                value={staff.department}
                                onChange={handleInputChange}
                            >
                                <option>Sale</option>
                                <option>HR</option>
                                <option>Marketing</option>
                                <option>IT</option>
                                <option>Finance</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row >
                        <Label htmlFor="startDate" md={2}>Ngày bắt đầu</Label>
                        <Col md={10}>
                            <Input type="text" id="startDate" name="startDate"
                                placeholder="2020-01-15"
                                value={staff.startDate}
                                onChange={handleInputChange}
                            // onBlur={this.handleBlur("firstname")}
                            />
                            {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                        </Col>
                    </FormGroup>

                    <FormGroup row >
                        <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                        <Col md={10}>
                            <Input type="Number" id="salaryScale" name="salaryScale"
                                placeholder="Hệ số lương"
                                value={staff.salaryScale}
                                onChange={handleInputChange}
                            // onBlur={this.handleBlur("firstname")}
                            />
                            {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                        </Col>
                    </FormGroup>

                    <FormGroup row >
                        <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ</Label>
                        <Col md={10}>
                            <Input type="Number" id="annualLeave" name="annualLeave"
                                placeholder="Số ngày nghỉ"
                                value={staff.annualLeave}
                                onChange={handleInputChange}
                            // onBlur={this.handleBlur("firstname")}
                            />
                            {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                        </Col>
                    </FormGroup>

                    <FormGroup row >
                        <Label htmlFor="overTime" md={2}>Số ngày làm thêm</Label>
                        <Col md={10}>
                            <Input type="Number" id="overTime" name="overTime"
                                placeholder="Số ngày làm thêm"
                                value={staff.overTime}
                                onChange={handleInputChange}
                            // onBlur={this.handleBlur("firstname")}
                            />
                            {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{ size: 10, offset: 2 }}>
                            <Button style={{ marginLeft: 180 }} onClick={handleSubmit} color="primary" >
                                Tạo mới
                            </Button>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div id="StaffList">
                <h3 style={{ marginLeft: 100 }}>Nhân Viên</h3>
                <button style={{ backgroundColor: "yellow", position: 'absolute', top: 90, right: 100 }} onClick={AddStaff}><i className="fa fa-plus-square" style={{ fontSize: 24 }}></i> Thêm nhân viên</button>
                <hr style={{ width: "85%", marginLeft: 100 }} />
                <Container style={{ marginTop: 20 }}>
                    <Row xs="1" sm="2" md="6">
                        {Staff_list}
                    </Row>
                </Container>
            </div>
            <AddStaffs />
        </React.Fragment>

    );

}

const mapStateToProps = (state, ownProps) => {
    // Gán state nhận về từ store 
    // thành props có tên note (props.note)
    return {
        staffs: state.staffs,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addStaff: (content) => {
            dispatch(actAddStaff(content));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNhanvien);

