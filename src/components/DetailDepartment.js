import { Link } from 'react-router-dom'
import {
    Container, Row, Col
} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';

const DetailDepartment = ({ staffs }) => {
    const DepStaffList = 
            staffs.map((staff) => {
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
                    </Col>
                    </FadeTransform>
                )
            })
    return (
        <Container style={{ marginTop: 20 }}>
            <Row xs="1" sm="2" md="6">
                {DepStaffList}
            </Row>
        </Container>
    )
}

export default DetailDepartment; 