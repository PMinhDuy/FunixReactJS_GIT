import { useState } from 'react'
import {
    Container, Row, Label, FormGroup, Form, Input, Col, Button, FormFeedback, ModalBody, ModalFooter, ModalHeader, Modal, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shares/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
    const Dish = dish.map((dish) => {
        return (
            <div key={dish.id}>
                <h1>Comments</h1>
                <img src={baseUrl +"/"+ dish.image} alt="dang tai xuong" />
            </div>
        )
    })
    return Dish
}

function RenderComments({ comments, addComment, dishId }) {

    const Comments = comments.map(comment => {
        return (
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
            </div>
        )
    })
    return (
        <div>
            {Comments}
            <CommentForm dishID={dishId} addComment={addComment} />
        </div>
    )
}

function CommentForm(props) {
    const [modal, setModal] = useState(false)
    const handleSubmit = (value) => {
        console.log(JSON.stringify(value))
        props.addComment(props.dishID, value.rating, value.name, value.comment)
        alert(value)
        setModal(!modal)
    }
    return (
        <div >
            <Button onClick={() => setModal(!modal)}>
                Submit Comment
            </Button>
            <Modal isOpen={modal} >
                <ModalHeader >
                    Thêm nhân viên mới
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(value) => handleSubmit(value)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={10}>
                                <Control.text model=".rating" id="rating" name="rating"
                                    validators={{ required, minLength: minLength(0), maxLength: maxLength(2) }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".rating"
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
                            <Label htmlFor="name" md={2}>Your Name</Label>
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
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"
                                    validators={{ required, minLength: minLength(5), maxLength: maxLength(100) }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 5 characters',
                                        maxLength: 'Must be 100 characters or less'
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

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish[0].id}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default DishDetail;