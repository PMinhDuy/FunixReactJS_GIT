// function DishDetail(props) {
//     return(
//         <div>
//             {props.dish.map((dish) => {
//                 return (
//                     <>
//                          <h1>Comments</h1>
//                          {dish.comments.map(comment => {
//                              return (
//                                  <div key= {comment.id}>
//                                  <p>{comment.comment}</p>
//                                  <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
//                                  </div>
//                              )
//                          })}
//                     </>


//                 )
//             })}
//         </div>
//     )
// }

// export default DishDetail

import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({ dish }) {
        const Dish = dish.map((dish) => {
            return (
                <>
                    <h1>Comments</h1>
                    <img src={dish.image} alt="dang tai xuong"/>
                </>
            )
        })
        return Dish
}

function RenderComments({ comments }) {
      
    const Comments = comments.map(comment => {
        return (
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
            </div>
        )
    })
    return Comments
}

const DishDetail = (props) => {
    console.log(props.dish)
    console.log(props.comments)
    return(
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
    )
    }

export default DishDetail;