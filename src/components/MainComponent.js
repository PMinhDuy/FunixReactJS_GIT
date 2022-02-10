import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent ';
import { DISHES } from '../shares/dishes';
import { Routes, Route, Redirect, Link } from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
        />
      );
    }




    return (
      <>
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/menu' element={<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
        </Routes>
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)} />
        <Footer />
      </>


    );
  }
}

export default Main;