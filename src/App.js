// import từ thư viện

import {
  Navbar, Label, FormGroup, Form, Input, Col, Button
} from 'reactstrap';
import { Route, Link, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { actfetchDepartments, actfetchSalary, actfetchStaffs, actAddStaff, actSearchStaff, actDeleteStaff, actEditStaff } from './reducers/ActionCreators'

// import từ file nội bộ
import './App.css';
import MenuNhanVien from './components/MenuNhanVien.js';
import MenuPhongBan from './components/MenuPhongBan.js';
import MenuBangLuong from './components/MenuBangLuong';
import MenuChiTietNhanVien from './components/MenuChiTietNhanVien';
import DetailDepartment from "./components/DetailDepartment"


function App(props) {
  const stateStaffs = useSelector((state) => state.staffs.staffs)
  const stateDepartments = useSelector((state) => state.departments.departments)
  const stateSalary = useSelector((state) => state.salary.salary)
  const stateLoadStaff = useSelector((state) => state.staffs.isLoading)
  const stateLoadDepartment = useSelector((state) => state.departments.isLoading)
  const stateLoadSalary = useSelector((state) => state.salary.isLoading)
  const dispatch = useDispatch()
  const dispatchAddStaff = (content) => dispatch(actAddStaff(content))
  const dispatchSearchStaff = (content) => dispatch(actSearchStaff(content))
  const dispatchDeleteStaff = (id) => dispatch(actDeleteStaff(id))
  const dispatchUpdateStaff = (id, value) => dispatch(actEditStaff(id, value))

  
  useEffect(() => {
    dispatch(actfetchStaffs())
  }, [])
  useEffect(() => {
    dispatch(actfetchDepartments())
  }, [])
  useEffect(() => {
    dispatch(actfetchSalary())
  }, [])
  
  // Component tìm id được chọn
  const StaffWidthId = (prop) => {
    return (
      <MenuChiTietNhanVien staff={stateStaffs.find((staff) => staff.id === prop.staffId)} department={stateDepartments} />
    );
  }

  const DepartmentWidthId = ({ departmentId }) => {
    return (
      <DetailDepartment staffs={stateStaffs.filter((staff) => staff.departmentId === departmentId)} />
    )
  }

  // Component banner
  const Banner = () => {
    return (
      <Navbar className="bg-primary navbar " style={{ width: "100%", height: 80 }}>
        <ul>
          <li>
            <i className="fa fa-user-circle-o" style={{ fontSize: 48, color: "Yellow" }}></i>
          </li>
          <li>
            <Link style={{ color: "white", textDecoration: "none", }} to="/" ><i className="fa fa-group" style={{ fontSize: 24 }}></i>  Nhân Viên </Link>
          </li>
          <li>
            <Link style={{ color: "white", textDecoration: "none" }} to="/phongban" ><i className="fa fa-drivers-license" style={{ fontSize: 24 }}></i>  Phòng Ban </Link>
          </li>
          <li>
            <Link style={{ color: "white", textDecoration: "none" }} to="/bangluong" ><i className="fa fa-money" style={{ fontSize: 24 }}></i>  Bảng Lương </Link>
          </li>
          <li >

          </li>

        </ul>
      </Navbar>
    )
  }
console.log("Toi dang test")
  // Component content 
  const Content = () => {
    return (
      <Routes>
        <Route path="/" element={<MenuNhanVien stateStaffs={stateStaffs} stateLoadStaff={stateLoadStaff} dispatchAddStaff={dispatchAddStaff} dispatchSearchStaff={dispatchSearchStaff} dispatchDeleteStaff={dispatchDeleteStaff} dispatchUpdateStaff={dispatchUpdateStaff} />} />
        <Route path="/phongban" element={<MenuPhongBan stateDepartments={stateDepartments} stateLoadDepartment={stateLoadDepartment} />} />
        <Route path="/bangluong" element={<MenuBangLuong stateSalary={stateSalary} stateLoadSalary={stateLoadSalary} />} />
        {stateStaffs.map((staff) => {
          return (
            <Route key={staff.id} path={`/chitietnhanvien/${staff.id}`} element={<StaffWidthId staffId={staff.id} />} />
          )
        })}
        {stateDepartments.map((department) => {
          return (
            <Route key={department.id} path={`/chitietphongban/${department.id}`} element={<DepartmentWidthId departmentId={department.id} />} />
          )
        })}
        
      </Routes>
    )
  }

  // Component footer
  const Footer = () => {
    return (
      <div className="footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-7 col-sm-5">
              <h5>Our Address</h5>
              <address>
                121, Clear Water Bay Road<br />
                Clear Water Bay, Kowloon<br />
                HONG KONG<br />
                <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
                <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
                <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">
                  confusion@food.net</a>
              </address>
            </div>
            <div className="col-12 col-sm-4 align-self-center">
              <div className="text-center" >
                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <p>© Copyright 2018 Ristorante Con Fusion</p>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="app">
      <Banner />

      <Content />


      <Footer />
    </div>
  )

}


export default App;



