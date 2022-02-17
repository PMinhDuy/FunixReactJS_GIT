import {LOAD_DEPARTMENT, DEPARTMENT_LOADING} from './ActionTypes'

const departmentReducers = (state = {isLoading: false,
    errMess: null,
    departments:[]}, action) => {

        console.log('DEPARTMENT ' + JSON.stringify(action));
    switch (action.type) {
        case LOAD_DEPARTMENT:
            state = {
                ...state,
                isLoading: false,
                departments: action.payload
            }
            return state
        case DEPARTMENT_LOADING:
            state = {
                ...state,
                isLoading: true,
                errMess: null,
                departments: []
            }
            return state
        default:
            return state
    }
}

export default departmentReducers