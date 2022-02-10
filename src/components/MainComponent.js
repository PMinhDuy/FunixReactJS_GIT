import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent ';
import { DISHES } from '../shares/dishes';
import { Routes, Route, Redirect, Link } from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shares/comments';
import { PROMOTIONS } from '../shares/promotions';
import { LEADERS } from '../shares/leaders';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({dishWithId}) => {
      console.log(dishWithId);
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === dishWithId)} 
            comments={this.state.comments.filter((comment) => comment.dishId === dishWithId)} />
      );
    };

    return (
      <>
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/menu' element={<Menu dishes={this.state.dishes}  />} />
          {this.state.dishes.map((dish) => {
            return(
              <Route path={`/menu/${dish.id}`} element={<DishWithId dishWithId = {dish.id} />} />
            )
          }) }
          <Route path='/contactus' element={<Contact />} />
        </Routes>
        
      </>


    );
  }
}

export default Main;