import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";



function MenuNhanvien(props) {

    const Staff_list = props.staffs.map((staff) => {
        return (
            <Col key={staff.id} className="bg-light border" style={{ padding: 5, textAlign: 'center' }} > 
                {/* phần này ko truyền được id <Link to="/chitietnhanvien" state = {staff.id}> */}
                <Link to={`/chitietnhanvien/${staff.id}`}>   
                    <img style={{ width: "100%" }} src={staff.image} alt="hinh anh" />
                </Link>
                <p>{staff.name}</p>
            </Col>
        )
    });

    return (
        <React.Fragment>
            <div>
                <h3 style={{marginLeft: 100}}>Nhân Viên</h3>
                <hr style={{width: "85%", marginLeft:100}} />
            <Container style={{ marginTop: 20 }}>
                <Row xs="1" sm="2" md="6">
                    {Staff_list}
                </Row>
            </Container> 
            </div>    
        </React.Fragment>

    );

}

export default MenuNhanvien;