import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent ';
import { Routes, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({

  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())

});


class Main extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }



  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({ dishWithId }) => {
      console.log(dishWithId);
      return (
        <DishDetail
          dish={this.props.dishes.dishes.filter((dish) => dish.id === dishWithId)}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === dishWithId)}
          commentsErrMess={this.props.comments.errMess}
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
          {this.props.dishes.dishes.map((dish) => {
            return (
              <Route path={`/menu/${dish.id}`} element={<DishWithId dishWithId={dish.id} />} />
            )
          })}
          <Route path='/contactus' element={<Contact />} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
        </Routes>
        <Footer />
      </>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);