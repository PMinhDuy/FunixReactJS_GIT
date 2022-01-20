import React, { Component } from 'react';
import './App.css';
import ContactComponent from './components/ContactComponent'
// import HeaderComponent from './components/HeaderComponent'


class App extends Component {

  render() {
    return (
      <div>
        <ContactComponent />
        {/* <HeaderComponent /> */}
      </div>
    )
  }
}


export default App;
