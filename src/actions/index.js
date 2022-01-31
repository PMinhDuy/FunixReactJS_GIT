import {ADD_NEW_STAFF, SEARCH_STAFF} from '../const/index';


export const actAddStaff = (payload) => {
    return({
        type: ADD_NEW_STAFF,
        payload
    })
}


export const actSearchStaff = (payload) => {
    return({
        type: SEARCH_STAFF,
        payload
    })
}



