import {Component} from 'react';
import './App.css';
import StaffList from './components/StaffListComponent';
import { STAFFS, DEPARTMENTS } from './shared/staffs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      department: DEPARTMENTS
    };
  }
  render() {
    return (
        <StaffList staffs={this.state.staffs} department={this.state.department} />
      
    )
  }
}

  
export default App;
