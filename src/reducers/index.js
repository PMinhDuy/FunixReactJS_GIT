import {combineReducers} from 'redux'
import staffReducers from './staffReducer'
 
export default combineReducers({
    staffs: staffReducers
})