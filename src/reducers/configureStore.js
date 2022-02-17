import {combineReducers} from 'redux'
import staffReducers from './staffsReducer'
import departmentReducers from './departmentsReducer'
import salaryReducer from './salaryReducer';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: staffReducers,
            departments: departmentReducers,
            salary: salaryReducer
        }), 
        applyMiddleware(thunk, logger)
    );

    return store;
}