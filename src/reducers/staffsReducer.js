import { ADD_NEW_STAFF, SEARCH_STAFF, LOAD_STAFF, STAFFS_LOADING, } from './ActionTypes';

const staffReducers = (state = { isLoading: false,
    errMess: null,
    staffs:[]}, action) => {
    switch (action.type) {
        case LOAD_STAFF:
            state = {
                ...state,
                isLoading: false,
                staffs: action.payload
            }
            return state
        case ADD_NEW_STAFF:
            state = {
                ...state,
                isLoading: false,
                staffs: state.staffs.concat(action.payload)
            }
            return state
        case SEARCH_STAFF:
            state = {
                staffs: action.payload,
                isLoading: false
            }
            return state
        case STAFFS_LOADING:
            state = {
                ...state,
                isLoading: true,
                staffs: []
            }
            return state
        default:
            return state
    }
}

export default staffReducers