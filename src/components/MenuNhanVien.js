import React from 'react';
import {
    Container, Row, Label, FormGroup, Form, Input, Col, Button, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { connect } from "react-redux";
import { Control, Errors, LocalForm } from "react-redux-form"

import { actAddStaff, actSearchStaff, actSetStaff } from '../actions/index'


// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));

function MenuNhanvien(props) {
    const SearchInput = useRef(null)
    const [newStaff, setNewStaff] = useState(props.staffs.newStaff)
    const idStaff = useRef(props.staffs.Staffs.length)


    // List components staff
    const Staff_list = props.staffs.Staffs.map((staff) => {
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
    const ShowForm = () => {
        document.getElementById('addStaff').style.display = "block";
        document.getElementById('StaffList').style.opacity = 0.5;
    }

    // Hàm xử lý add
    const handleSubmit = (event) => {
        idStaff.current += 1
        props.addStaff(newStaff)
        alert("Bạn có chắc chắn muốn thêm?")
        document.getElementById('addStaff').style.display = "none";
        document.getElementById('StaffList').style.opacity = 1;
        event.preventDefault();
    }
    console.log("ĐI qua đây")

    // Hàm xử lý khi nhập ô input
    function handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value

        return (setNewStaff({
            ...newStaff,
            id: idStaff.current,
            [name]: value
        }))

    }
    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        const searchInp = SearchInput.current.value
        const result = props.staffs.Staffs.filter((staff) => {
            return staff.name.indexOf(searchInp.toUpperCase()) !== -1;
        })
        props.searchStaff(result)
    }

    
    
    // Component addStaff
    function AddStaffs()  {
        const validate = (name, doB, startDate) => {
            const errors = {
                name: '',
                doB: '',
                startDate: ''
            };
            const reg = "1234567890-";
            let isFalsedoB = false;
            let isFalsestartDate = false;
            for (let i = 0; i < doB.length; i++) {
                if (reg.indexOf(doB.split("")[i]) === -1) {
                    isFalsedoB = true;
     
                }
            }
            for (let i = 0; i < startDate.length; i++) {
                if (reg.indexOf(startDate.split("")[i]) === -1) {
                    isFalsestartDate = true;
            
                }
            }
            if (name.length < 5) {
                errors.name = 'Name should be >= 5 characters';
                
            }
            else if (name.length > 20) {
                errors.name = 'Name should be <= 20 characters';
                
            }
    
    
            if (isFalsedoB === true) {
                errors.doB = 'Year of Birth should be number';
              
            }
            else if (doB.length !== 10) {
                errors.doB = 'Year of Birth should be = 10 characters';
                
            }
    
            if (isFalsestartDate === true) {
                errors.startDate = 'startDate should be number';
                
            }
            else if (startDate.length !== 10) {
                errors.startDate = 'startDate should be = 10 characters';
               
            }
    
            return errors;
        }
        const errors = validate(newStaff.name, newStaff.doB, newStaff.startDate);
        return (
            <Form onSubmit={handleSubmit}>
                <h2>Thêm nhân viên mới</h2>
                <FormGroup row >
                    <Label htmlFor="name" md={2}>Họ và tên</Label>
                    <Col md={10}>
                        <Input type="name" id="name" name="name"
                            placeholder="Name..."
                            value={newStaff.name}
                            onChange={handleInputChange}
                            valid={errors.name === ''}
                            invalid={errors.name !== ''}
                        // onBlur={this.handleBlur("firstname")}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label htmlFor="doB" md={2}>Năm sinh</Label>
                    <Col md={10}>
                        <Input type="doB" id="doB" name="doB"
                            placeholder="1999-11-19"
                            value={newStaff.doB}
                            onChange={handleInputChange}
                            valid={errors.doB === ''}
                            invalid={errors.doB !== ''}
                        // onBlur={this.handleBlur("firstname")}
                        />
                        <FormFeedback>{errors.doB}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row >
                    <Label md={2}>Phòng Ban</Label>
                    <Col md={10}>
                        <Input type="select" name="department"
                            value={newStaff.department}
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
                        <Input type="startDate" id="startDate" name="startDate"
                            placeholder="2020-01-15"
                            value={newStaff.startDate}
                            onChange={handleInputChange}
                            valid={errors.startDate === ''}
                            invalid={errors.startDate !== ''}
                        // onBlur={this.handleBlur("firstname")}
                        />
                        <FormFeedback>{errors.startDate}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row >
                    <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                    <Col md={10}>
                        <Input type="Number" id="salaryScale" name="salaryScale"
                            placeholder="Hệ số lương"
                            value={newStaff.salaryScale}
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
                            value={newStaff.annualLeave}
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
                            value={newStaff.overTime}
                            onChange={handleInputChange}
                        // onBlur={this.handleBlur("firstname")}
                        />
                        {/* <FormFeedback>{errors.firstname}</FormFeedback> */}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{ size: 10, offset: 2 }}>
                        {(errors.name === '' && errors.doB === '' && errors.startDate === '') && <Button type= "submit" id="BtCreate" style={{ marginLeft: 180 }}  color="primary" disabled="" >
                            Tạo mới
                        </Button>}
                    </Col>
                </FormGroup>
            </Form>
        )
    }

    return (
        <React.Fragment>
            <div id="StaffList">
                <h3 style={{ marginLeft: 100 }}>Nhân Viên</h3>
                <button style={{ backgroundColor: "gray", position: 'absolute', top: 80, left: 240 }} onClick={ShowForm}><i className="fa fa-plus-square" style={{ fontSize: 24 }}></i></button>
                <div style={{ position: 'absolute', top: 90, right: 100 }}>
                    <i className="fa fa-search" style={{ fontSize: 24 }}></i>
                    <input type="text" placeholder="Nhập..."
                        ref={SearchInput}
                    />
                    <button type="button" onClick={handleSearch}>Tìm kiếm</button>
                </div>
                <hr style={{ width: "85%", marginLeft: 100 }} />
                <Container style={{ marginTop: 20 }}>
                    <Row xs="1" sm="2" md="6">
                        {Staff_list}
                    </Row>
                </Container>
            </div>
            <div id="addStaff" style={{ width: "50%", position: "absolute", top: "150px", left: "350px", backgroundColor: "gray", display: "none" }}>
                <AddStaffs />
            </div>

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
        searchStaff: (content) => {
            dispatch(actSearchStaff(content));
        },
        setStaff: (name, value) => {
            dispatch(actSetStaff(name, value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNhanvien);

