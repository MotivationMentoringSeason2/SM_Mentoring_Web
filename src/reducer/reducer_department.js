import {
    ANYBODY_LOAD_DEPARTMENTS, ANYBODY_LOAD_DEPARTMENTS_SUCCESS, ANYBODY_LOAD_DEPARTMENTS_FAILURE, RESET_ANYBODY_LOAD_DEPARTMENTS
} from "../action/action_department";

const INITIAL_STATE = {
    departmentList : {
        departments : [], loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case ANYBODY_LOAD_DEPARTMENTS :
            return { ...state, departmentList : { departments : [], loading : true, error : null }};
        case ANYBODY_LOAD_DEPARTMENTS_SUCCESS :
            return { ...state, departmentList : { departments : action.payload, loading : false, error : null }};
        case ANYBODY_LOAD_DEPARTMENTS_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, departmentList : { departments : [], loading : false, error : error }};
        case RESET_ANYBODY_LOAD_DEPARTMENTS :
            return { ...state, departmentList : { departments : [], loading : false, error : null }};
            
        default :
            return state;
    }
}