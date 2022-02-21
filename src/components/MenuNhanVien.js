import React from 'react';
import {
    Container, Row, Label, Col, Button, ModalBody, ModalHeader, Modal
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform } from 'react-animation-components';




function MenuNhanvien({ stateStaffs, stateLoadStaff, dispatchAddStaff, dispatchSearchStaff, dispatchDeleteStaff, dispatchUpdateStaff }) {
    const SearchInput = useRef(null)
    const [modal, setModal] = useState(false)
    const [formEdit, setFormEdit] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)


    const handleUpdate = (value) => {
        console.log(value)
        dispatchUpdateStaff(idUpdate, JSON.stringify(value))
        setFormEdit(!formEdit)
    }

    const handleUpdateForm = (id) => {
        setIdUpdate(id)
        setFormEdit(!formEdit)
    }

    const FormEdit = () => {
        return (
            <div>
                <Modal
                    isOpen={formEdit}
                >
                    <ModalHeader toggle={() => setFormEdit(!formEdit)}>
                        Sửa thông tin nhân viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => handleUpdate(value)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Họ và tên</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name..."
                                        // value={name}
                                        // onChange={(event) => { setName(event.target.value) }}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={2}>Năm sinh</Label>
                                <Col md={10}>
                                    <Control.text model=".doB" id="doB" name="doB"
                                        type="date"
                                        placeholder="1999-11-19"
                                    // value={doB}
                                    // onChange={(event) => { setDoB(event.target.value) }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2}>Phòng Ban</Label>
                                <Col md={10}>
                                    <Control.select model=".departmentId" name="departmentId"
                                        className="form-control"
                                    // value={departmentId}
                                    // onChange={(event) => { setDepartmentId(event.target.value) }}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="Dept01" >Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={2}>Ngày bắt đầu</Label>
                                <Col md={10}>
                                    <Control.text model=".startDate" id="startDate" name="startDate"
                                        type="date"
                                        placeholder="2020-01-15"
                                    // value={startDate}
                                    // onChange={(event) => { setStartDate(event.target.value) }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                                <Col md={10}>
                                    <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                        placeholder="Hệ số lương"
                                    // value={salaryScale}
                                    // onChange={(event) => { setSalaryScale(event.target.value) }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ</Label>
                                <Col md={10}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                        placeholder="Số ngày nghỉ"
                                    // value={annualLeave}
                                    // onChange={(event) => { setAnnualLeave(event.target.value) }}

                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={2}>Số ngày làm thêm</Label>
                                <Col md={10}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                        placeholder="Số ngày làm thêm"
                                    // value={overTime}
                                    // onChange={(event) => { setOverTime(event.target.value) }}

                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    // List components staff
    const Staff_list = stateStaffs.map((staff) => {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Col key={staff.id} className="bg-light border" style={{ padding: 5, textAlign: 'center' }} >
                    <Link to={`/chitietnhanvien/${staff.id}`}>
                        <img style={{ width: "100%" }} src={staff.image === undefined ? "/asset/images/alberto.png" : staff.image} alt="hinh anh" />
                    </Link>
                    <p>{staff.name}</p>
                    <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleUpdateForm(staff.id)} >Update</button>
                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => { dispatchDeleteStaff(staff.id) }} >Delete</button>
                </Col>
            </FadeTransform>
        )
    });

    const RenderStaffList = () => {
        if (stateLoadStaff) {
            return (
                <div className="col-12" >
                    <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                    <p>Loading . . .</p>
                </div>
            )
        }
        else {
            return (
                Staff_list
            )
        }
    }

    // Hàm xử lý add
    const handleSubmit = (value) => {
        console.log(value)
        // }
        dispatchAddStaff(value)
        alert("Bạn có chắc chắn muốn thêm?")
        setModal(!modal)
    }

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        const searchInp = SearchInput.current.value
        const input_Upper = searchInp.toUpperCase()
        const result = stateStaffs.filter((staff) => {
            return staff.name.toUpperCase().indexOf(input_Upper) !== -1
        })
        dispatchSearchStaff(result)
        console.log(input_Upper)
        console.log(result)
    }


    const required = (val) => val && val.length;
    const isNumber = (val) => !isNaN(Number(val));
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const Form = () => {
        return (
            <div>

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
                                <Label htmlFor="doB" md={2}>Năm sinh</Label>
                                <Col md={10}>
                                    <Control.text model=".doB" id="doB" name="doB"
                                        type="date"
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
                                    <Control.select model=".departmentId" name="departmentId"
                                        className="form-control"
                                        validators={{ required }}
                                    >
                                        <option value="">Chọn...</option>
                                        <option value="Dept01" >Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".departmentId"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={2}>Ngày bắt đầu</Label>
                                <Col md={10}>
                                    <Control.text model=".startDate" id="startDate" name="startDate"
                                        type="date"
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
                                        validators={{ required, isNumber, minLength: minLength(0), maxLength: maxLength(2) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 2 characters or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ</Label>
                                <Col md={10}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                        placeholder="Số ngày nghỉ"
                                        validators={{ required, isNumber, minLength: minLength(0), maxLength: maxLength(2) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".annualLeave"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 2 characters or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="overTime" md={2}>Số ngày làm thêm</Label>
                                <Col md={10}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                        placeholder="Số ngày làm thêm"
                                        validators={{ required, isNumber, minLength: minLength(0), maxLength: maxLength(2) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".overTime"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 0 characters',
                                            maxLength: 'Must be 2 characters or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Tạo mới
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }

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
                        <RenderStaffList />
                    </Row>
                </Container>
            </div>
            <Button
                style={{ position: 'absolute', top: 80, left: 240 }}
                onClick={() => setModal(!modal)}
            >
                <i className="fa fa-plus-square" style={{ fontSize: 24 }}></i>
            </Button>
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Form />
            </FadeTransform>
            <FormEdit />
        </React.Fragment>
    );
}

export default MenuNhanvien;







