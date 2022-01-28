import { ADD_NEW_STAFF, SEARCH_STAFF, SET_STAFF } from '../const/index'
import { STAFFS } from '../shared/staffs';

const initState = {
    Staffs: STAFFS,
    newStaff: {
        id: '',
        name: '',
        doB: '',
        salaryScale: '',
        startDate: '',
        department: 'Sale',
        annualLeave: '',
        overTime: '',
        salary: "",
        image: '/assets/images/alberto.png',
    }
}
const staffReducers = (state = initState , action) => {
    switch (action.type) {
        case SET_STAFF:
            state = {
                ...state,
                newStaff: {
                    ...state.newStaff, 
                    [action.name]: action.value
                }
            }
            return state
        case ADD_NEW_STAFF:
            state = {
                ...state, 
                Staffs: [...state.Staffs, action.payload]
            }
            return state
        case SEARCH_STAFF:
            state = action.payload
            return state
        default:
            return state
    }
}

export default staffReducers