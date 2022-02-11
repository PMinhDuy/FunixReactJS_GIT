import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent ';
import { Routes, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { addComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});


class Main extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({ dishWithId }) => {
      console.log(dishWithId);
      return (
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === dishWithId)}
          comments={this.props.comments.filter((comment) => comment.dishId === dishWithId)}
          addComment={this.props.addComment}
           />
      );
    };

    return (
      <>
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
          {this.props.dishes.map((dish) => {
            return (
              <Route path={`/menu/${dish.id}`} element={<DishWithId dishWithId={dish.id} />} />
            )
          })}
          <Route path='/contactus' element={<Contact />} />
        </Routes>
        <Footer />
      </>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);