// import từ thư viện

import {
  Navbar, Label, FormGroup, Form, Input, Col, Button
} from 'reactstrap';
import { Route, Link, Routes } from 'react-router-dom'
import { connect } from "react-redux";


// import từ file nội bộ
import './App.css';
import MenuNhanVien from './components/MenuNhanVien.js';
import MenuPhongBan from './components/MenuPhongBan.js';
import MenuBangLuong from './components/MenuBangLuong';
import MenuChiTietNhanVien from './components/MenuChiTietNhanVien';
import { DEPARTMENTS } from './shared/staffs';





// Component App
function App(props) {

  const department = DEPARTMENTS

  // Component tìm id được chọn
  const StaffWidthId = (prop) => {
    return (
      <MenuChiTietNhanVien staff={props.staffs.Staffs.find((staff) => staff.id === prop.staffId)} />
    );
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
            <Link style={{ color: "white", textDecoration: "none", }} to="/"><i className="fa fa-group" style={{ fontSize: 24 }}></i>  Nhân Viên </Link>
          </li>
          <li>
            <Link style={{ color: "white", textDecoration: "none" }} to="/phongban"><i className="fa fa-drivers-license" style={{ fontSize: 24 }}></i>  Phòng Ban </Link>
          </li>
          <li>
            <Link style={{ color: "white", textDecoration: "none" }} to="/bangluong"><i className="fa fa-money" style={{ fontSize: 24 }}></i>  Bảng Lương </Link>
          </li>
          <li >
            
          </li>

        </ul>
      </Navbar>
    )
  }

  // Component content 
  const Content = () => {
    return (
        <Routes>
          <Route path="/" element={<MenuNhanVien  />} />
          <Route path="/phongban" element={<MenuPhongBan department={department} />} />
          <Route path="/bangluong" element={<MenuBangLuong staffs={props.staffs.Staffs} />} />
          {props.staffs.Staffs.map((staff) => {
            return (
              <Route key={staff.id} path={`/chitietnhanvien/${staff.id}`} element={<StaffWidthId staffId={staff.id} />} />
            )
          })}
        </Routes>
    )
  }

  // Component footer
  const Footer = () => {
    return (
      <div className="footer" >
        <div className="footer_text">
          <h2>Our Address</h2>
          <p>121, Clear Water Bay Road</p>
          <p>Clear Water Bay, Kowloon</p>
          <p>HONG KONG</p>
          <p><i className="fa fa-phone">:  </i>+852 1234 5678</p>
          <p><i className="fa fa-drivers-license">:  </i>+852 8765 4321</p>
          <i className="fa fa-envelope">:  </i><a href="/" >confusion@food.net</a>
        </div>
        <div className="footer_slogan">
          <p>@Copyright 2018 Ristorante Con Fusion</p>
        </div>
        <div className="footer_contact">
          <i className="fa fa-address-book" style={{ fontSize: 48, color: "red" }}></i>
          <i className="fa fa-address-book" style={{ fontSize: 48, color: "blue" }}></i>
          <i className="fa fa-address-book" style={{ fontSize: 48, color: "Green" }}></i>
          <i className="fa fa-address-book" style={{ fontSize: 48, color: "Yellow" }}></i>
          <i className="fa fa-address-book" style={{ fontSize: 48, color: "Black" }}></i>
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

// Lấy state từ store bằng mapStateToProps
// Lúc này state nhận được sẽ gán vào props
const mapStateToProps = (state, ownProps) => {
  // Gán state nhận về từ store 
  // thành props có tên note (props.note)
  return {
    staffs: state.staffs,
  };
};


export default connect(mapStateToProps, null)(App);



