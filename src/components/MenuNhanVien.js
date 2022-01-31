import React from 'react';
import {
    Container, Row, Label, FormGroup, Form, Input, Col, Button, FormFeedback, ModalBody, ModalFooter, ModalHeader, Modal
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { connect } from "react-redux";
import { Control, LocalForm, Errors } from 'react-redux-form';


import { actAddStaff, actSearchStaff } from '../actions/index'




function MenuNhanvien(props) {
    const SearchInput = useRef(null)
    const [modal, setModal] = useState(false)
 

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


    // Hàm xử lý add
    const handleSubmit = (value) => {

        console.log(JSON.stringify(value))
        // }
        props.addStaff(value)
        alert("Bạn có chắc chắn muốn thêm?")
        setModal(!modal)
    }
    console.log("ĐI qua đây")

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        const searchInp = SearchInput.current.value
        const input_Upper = searchInp.toUpperCase()
        const result = props.staffs.filter((staff) => {
            return staff.name.toUpperCase().indexOf(input_Upper) !== -1
        })
        props.searchStaff(result)
        console.log(input_Upper)
        console.log(result)
    }


    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
 

    return (
        <React.Fragment>
            <div id="StaffList">
                <h3 style={{ marginLeft: 100 }}>Nhân Viên</h3>
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
            <div>
                <Button
                    style={{ position: 'absolute', top: 80, left: 240 }}
                    onClick={() => setModal(!modal)}
                >
                    <i className="fa fa-plus-square" style={{ fontSize: 24 }}></i>
                </Button>
                <Modal
                    isOpen={modal}
                // toggle={() => setModal(!modal)}
                >
                    <ModalHeader toggle={() => setModal(!modal)}>
                        Thêm nhân viên mới
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => handleSubmit(value)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Họ và tên</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name..."
                                        className="form-control"
                                        validators={{ required, minLength: minLength(5), maxLength: maxLength(15) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 5 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="image" md={2}>Avatar</Label>
                                <Col md={10}>
                                    <Control.text model=".image" id="image" name="image"
                                        className="form-control"
                                        value= "/assets/images/alberto.png"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={2}>Năm sinh</Label>
                                <Col md={10}>
                                    <Control.text model=".doB" id="doB" name="doB"
                                        placeholder="1999-11-19"
                                        validators={{ required, minLength: minLength(0), maxLength: maxLength(10) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 10 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2}>Phòng Ban</Label>
                                <Col md={10}>
                                    <Control.select model=".department" name="department"
                                        className="form-control"
                                    >
                                        <option>Chọn...</option>
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={2}>Ngày bắt đầu</Label>
                                <Col md={10}>
                                    <Control.text model=".startDate" id="startDate" name="startDate"
                                        placeholder="2020-01-15"
                                        validators={{ required, minLength: minLength(0), maxLength: maxLength(10) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 10 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                                <Col md={10}>
                                    <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                        placeholder="Hệ số lương"
                                        validators={{ required, minLength: minLength(0), maxLength: maxLength(2) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 2 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ</Label>
                                <Col md={10}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                        placeholder="Số ngày nghỉ"
                                        validators={{ required, minLength: minLength(0), maxLength: maxLength(2) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".annualLeave"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 2 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="overTime" md={2}>Số ngày làm thêm</Label>
                                <Col md={10}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                        placeholder="Số ngày làm thêm"
                                        validators={{ required, minLength: minLength(0), maxLength: maxLength(2) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".overTime"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 2 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Tạo mới
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNhanvien);
