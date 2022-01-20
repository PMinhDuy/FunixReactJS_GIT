import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    };
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }
    render() {
        return (
            <div style={{ marginLeft: 300 }}>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                    </NavItem>
                </Nav>
            </div>

        )
    }
}  

export default Header 