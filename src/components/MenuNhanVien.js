import React from 'react';
import {
    Container, Row, Label, FormGroup, Form, Input, Col, Button, FormFeedback, ModalBody, ModalFooter, ModalHeader, Modal
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { connect } from "react-redux";
// import { Control, Errors, LocalForm } from "react-redux-form"

import { actAddStaff, actSearchStaff } from '../actions/index'


// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));

function MenuNhanvien(props) {
    const SearchInput = useRef(null)
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [doB, setDoB] = useState('')
    const [salaryScale, setSalaryScale] = useState('')
    const [startDate, setStartDate] = useState('')
    const [department, setDepartment] = useState('')
    const [annualLeave, setAnnualLeave] = useState('')
    const [overTime, setOverTime] = useState('')



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
    const handleSubmit = () => {
        const newStaff = {
            id: props.staffs.length + 1,
            name: name,
            doB: doB,
            salaryScale: salaryScale,
            startDate: startDate,
            department: department,
            annualLeave: annualLeave,
            overTime: overTime,
            image: '/assets/images/alberto.png',
        }
        props.addStaff(newStaff)
        alert("Bạn có chắc chắn muốn thêm?")
        setModal(!modal)
    }
    console.log("ĐI qua đây")

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        const searchInp = SearchInput.current.value
        const input_Upper = searchInp.toUpperCase()
        // const regex = new RegExp(searchInp);
        // console.log(searchInp.test("Duy"))

        const result = props.staffs.filter((staff) => {
            return staff.name.toUpperCase().indexOf(input_Upper) !== -1
        })
        props.searchStaff(result)
        console.log(input_Upper)
        console.log(result)
    }


    const validate = (name, doB, startDate, salaryScale, annualLeave, overTime) => {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            salaryScale: '',
            annualLeave: '',
            overTime: ''
        };
        if (name.length < 5) {
            errors.name = 'Name should be >= 5 characters';

        }
        else if (name.length > 20) {
            errors.name = 'Name should be <= 20 characters';

        }


        if (doB.length === 0) {
            errors.doB = 'Year of Birth should be > 0 characters';

        }

        if (startDate.length === 0) {
            errors.startDate = 'Year of Birth should be > 0 characters';

        }

        if (salaryScale.length === 0) {
            errors.salaryScale = 'salaryScale should be > 0 characters';

        }
        if (annualLeave.length === 0) {
            errors.annualLeave = 'annualLeave should be > 0 characters';

        }
        if (overTime.length === 0) {
            errors.overTime = 'overTime should be > 0 characters';

        }


        return errors;
    }

    const errors = validate(name, doB, startDate, salaryScale, annualLeave, overTime);

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
                        <FormGroup row >
                            <Label htmlFor="name" md={2}>Họ và tên</Label>
                            <Col md={10}>
                                <Input type="name" id="name" name="name"
                                    placeholder="Name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                <Input type="date" id="doB" name="doB"
                                    placeholder="1999-11-19"
                                    value={doB}
                                    onChange={(e) => setDoB(e.target.value)}
                                    valid={errors.doB === ''}
                                    invalid={errors.doB !== ''}
                                />
                                <FormFeedback>{errors.doB}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label md={2}>Phòng Ban</Label>
                            <Col md={10}>
                                <Input type="select" name="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option>Chọn...</option>
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
                                <Input type="date" id="startDate" name="startDate"
                                    placeholder="2020-01-15"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    valid={errors.startDate === ''}
                                    invalid={errors.startDate !== ''}
                                />
                                <FormFeedback>{errors.startDate}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                            <Col md={10}>
                                <Input type="Number" id="salaryScale" name="salaryScale"
                                    placeholder="Hệ số lương"
                                    value={salaryScale}
                                    onChange={(e) => setSalaryScale(e.target.value)}
                                    valid={errors.salaryScale === ''}
                                    invalid={errors.salaryScale !== ''}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row >
                            <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ</Label>
                            <Col md={10}>
                                <Input type="Number" id="annualLeave" name="annualLeave"
                                    placeholder="Số ngày nghỉ"
                                    value={annualLeave}
                                    onChange={(e) => setAnnualLeave(e.target.value)}
                                    valid={errors.annualLeave === ''}
                                    invalid={errors.annualLeave !== ''}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row >
                            <Label htmlFor="overTime" md={2}>Số ngày làm thêm</Label>
                            <Col md={10}>
                                <Input type="Number" id="overTime" name="overTime"
                                    placeholder="Số ngày làm thêm"
                                    value={overTime}
                                    onChange={(e) => setOverTime(e.target.value)}
                                    valid={errors.overTime === ''}
                                    invalid={errors.overTime !== ''}
                                />
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={handleSubmit}
                            disabled={!(errors.name === '' && errors.doB === '' && errors.startDate === '' && errors.salaryScale === ''  && errors.annualLeave === '' && errors.overTime === '')}
                        >
                            Tạo mới
                        </Button>
                        {' '}
                        <Button onClick={() => setModal(!modal)}>
                            Hủy
                        </Button>
                    </ModalFooter>
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
