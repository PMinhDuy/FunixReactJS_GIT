import { ADD_NEW_STAFF, SEARCH_STAFF } from '../const/index'
import { STAFFS } from '../shared/staffs';


const staffReducers = (state = STAFFS , action) => {
    switch (action.type) {
        case ADD_NEW_STAFF:
            state = [
                ...state, 
                action.payload
            ]
            return state
        case SEARCH_STAFF:
            state = action.payload
            return state
        default:
            return state
    }
}

export default staffReducers