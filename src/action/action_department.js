import axios from 'axios';
import { ACCOUNT_URL } from './distribute_urls';

export const ANYBODY_LOAD_DEPARTMENTS = 'ANYBODY_LOAD_DEPARTMENTS';
export const ANYBODY_LOAD_DEPARTMENTS_SUCCESS = 'ANYBODY_LOAD_DEPARTMENTS_SUCCESS';
export const ANYBODY_LOAD_DEPARTMENTS_FAILURE = 'ANYBODY_LOAD_DEPARTMENTS_FAILURE';
export const RESET_ANYBODY_LOAD_DEPARTMENTS = 'RESET_ANYBODY_LOAD_DEPARTMENTS';

const ROOT_URL = `${ACCOUNT_URL}/resource`;

export function anybodyLoadDepartments(){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/departments`,
    });
    return {
        type : ANYBODY_LOAD_DEPARTMENTS,
        payload : request
    }
}

export function anybodyLoadDepartmentsSuccess(departments){
    return {
        type : ANYBODY_LOAD_DEPARTMENTS_SUCCESS,
        payload : departments.data
    }
}

export function anybodyLoadDepartmentsFailure(error){
    return {
        type : ANYBODY_LOAD_DEPARTMENTS_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadDepartments(){
    return {
        type : RESET_ANYBODY_LOAD_DEPARTMENTS
    }
}