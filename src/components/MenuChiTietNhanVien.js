import React from 'react';
import dateFormat from "dateformat";
import {
    Link
} from "react-router-dom";
import { FadeTransform } from 'react-animation-components';




function MenuChiTietNhanVien(props) {
    // Component chi tiết nhân viên
    const dep = props.department.find((department) => department.id === props.staff.departmentId)
    const DetailStaff = (() => {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <div style={{ display: 'flex', margin: 20 }}>
                    <img src={props.staff.image === undefined ? "/asset/images/alberto.png" : props.staff.image} alt="hinh anh" style={{ width: '17%' }} />
                    <div className="Infor" style={{ marginLeft: 10 }}>
                        <h3>Họ và tên: {props.staff.name}</h3>
                        <p>Ngày sinh: {dateFormat(props.staff.doB, "dd/mm/yyyy")}</p>
                        <p>Ngày vào công ty: {dateFormat(props.staff.startDate, "dd/mm/yyyy")}</p>
                        <p>Phòng ban: {dep.name} </p>
                        <p>Số ngày nghỉ còn lại: {props.staff.annualLeave}</p>
                        <p>Số ngày đã làm thêm: {props.staff.overTime}</p>
                    </div>
                </div>
            </FadeTransform>

        )
    })
    return (
        <React.Fragment>
            <h5 style={{ marginLeft: 10 }}>
                <Link to="/">Nhân Viên </Link> / {props.staff.name}
            </h5>
            <DetailStaff />
        </React.Fragment>
    )
}


export default MenuChiTietNhanVien; 