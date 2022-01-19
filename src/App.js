import {useState} from 'react';
import './App.css';
import MenuNhanVien from './components/MenuNhanVien.js';
import MenuPhongBan from './components/MenuPhongBan.js';
import MenuBangLuong from './components/MenuBangLuong';
import MenuChiTietNhanVien from './components/MenuChiTietNhanVien';
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import {
  Routes, Route, Link
} from "react-router-dom";
import {
  Navbar
} from 'reactstrap';


function App(props) {
    const [staffs, setStaffs] = useState(STAFFS)
    const [department, ] = useState(DEPARTMENTS)
    const StaffWidthId = (props) => {
      //ở phần này lấy id và tìm nhân viên theo id sau đó truyền cái nhân viên tìm được rồi truyền qua  MenuChiTietNhanVien
      return (
        <MenuChiTietNhanVien staff={staffs.find((staff) => staff.id === props.staffId)} />
      );
    }

    const handleSearch = () => {
      let search = document.getElementById("search").value
      console.log(search);
      const result = staffs.filter((staff) => {
        return staff.name === search
      } )
      setStaffs(result) 
    }
    console.log(staffs)

    return (
      <div className="app">

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
            <li style={{ position: 'absolute', top: 10, right: 120 }}>
            <i className="fa fa-search" style={{ fontSize: 24}}></i>
            <input type="text" id='search' placeholder="Nhập tên..." />
            </li>
            <li style={{ position: 'absolute', top: 10, right: 30}}>
              <button type="button" onClick={handleSearch}>Tìm kiếm</button>
            </li>
          </ul>
        </Navbar>

        <Routes>
          <Route path="/" element={<MenuNhanVien staffs={staffs} />} />
          <Route path="/phongban" element={<MenuPhongBan department={department} />} />
          <Route path="/bangluong" element={<MenuBangLuong staffs={staffs} />} />
          {staffs.map((staff) => {
            return (
              <Route key={staff.id} path={`/chitietnhanvien/${staff.id}`} element={<StaffWidthId staffId={staff.id} />} />
            )
          })}
        </Routes>

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
      </div>

    )
}


export default App;
