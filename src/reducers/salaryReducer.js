import {SALARY_LOADING, LOAD_SALARY } from './ActionTypes';

const salaryReducer = (state = { isLoading: false,
    errMess: null,
    salary:[]}, action) => {
    switch(action.type) {
        case LOAD_SALARY:
            state = {
                ...state,
                isLoading: false,
                salary: action.payload
            }
            return state
        case SALARY_LOADING:
            state = {
                ...state,
                isLoading: true,
                errMess: null,
                salary: []
            }
            return state
        default:
            return state
    }
}

export default salaryReducer