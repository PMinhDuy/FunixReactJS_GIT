import { SEARCH_STAFF, LOAD_STAFF, STAFFS_LOADING, LOAD_DEPARTMENT, SALARY_LOADING, LOAD_SALARY, DEPARTMENT_LOADING } from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const actAddStaff = (newstaff) => {
    return dispatch => {
        fetch(baseUrl + 'staffs', {
            method: "POST",
            body: JSON.stringify(newstaff),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(staffs => dispatch(actLoadStaff(staffs)));
    }
}

export const actSearchStaff = (payload) => {
    return ({
        type: SEARCH_STAFF,
        payload
    })
}

export const actLoadStaff = (staffs) => ({
    type: LOAD_STAFF,
    payload: staffs
})

export const actfetchStaffs = () => dispatch => {
    dispatch(actstaffsLoading())
    return  fetch(baseUrl + "staffs")
            .then(response => response.json())
            .then(staffs => {
                dispatch(actLoadStaff(staffs))
            })
}

export const actstaffsLoading = () => ({
    type: STAFFS_LOADING
});

export const actLoadDepartment = (departments) => {
    return ({
        type: LOAD_DEPARTMENT,
        payload: departments
    })
}

export const actdepartmentsLoading = () => ({
    type: DEPARTMENT_LOADING
});

export const actsalaryLoading = () => ({
    type: SALARY_LOADING
});

export const actLoadSalary = (salary) => {
    return ({
        type: LOAD_SALARY,
        payload: salary
    })
}



export const actfetchDepartments = () => (dispatch) => {
    dispatch(actdepartmentsLoading())
    return fetch(baseUrl + "departments")
        .then(response => response.json())
        .then(departments => {
            dispatch(actLoadDepartment(departments))
        })
}

export const actfetchSalary = () => dispatch => {
    dispatch(actsalaryLoading())
    return fetch(baseUrl + "staffsSalary")
        .then(response => response.json())
        .then(salary => {
            dispatch(actLoadSalary(salary))
        })
}

export const actDeleteStaff = (id) => dispatch => {
    return fetch(`${baseUrl}staffs/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then((staffs) => {
            dispatch(actLoadStaff(staffs))
        })
}

export const actEditStaff = (id, dataPost) => dispatch => {
    return fetch(baseUrl + "staffs/" + id, { method: 'PATCH',
    body: dataPost ,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
        .then(response => response.json())
        .then((staffs) => {
            dispatch(actLoadStaff(staffs))
        })
}