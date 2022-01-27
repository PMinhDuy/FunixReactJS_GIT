import {ADD_NEW_STAFF} from '../const/index';


export const actAddStaff = (payload) => {
    return({
        type: ADD_NEW_STAFF,
        payload
    })
}



