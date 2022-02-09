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
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';


function RenderDish({ dish }) {
        const Dish = dish.map((dish) => {
            return (
                <>
                    <h1>Comments</h1>
                    <RenderComments comments={dish.comments}/>
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
    return(
        <RenderDish dish = {props.dish}/>
    )
    }

export default DishDetail;