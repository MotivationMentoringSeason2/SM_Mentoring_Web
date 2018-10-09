import axios from 'axios';

import { MENTO_URL } from "./distribute_urls";

export const ANYBODY_LOAD_REPORTS = 'ANYBODY_LOAD_REPORTS';
export const ANYBODY_LOAD_REPORTS_SUCCESS = 'ANYBODY_LOAD_REPORTS_SUCCESS';
export const ANYBODY_LOAD_REPORTS_FAILURE = 'ANYBODY_LOAD_REPORTS_FAILURE';
export const RESET_ANYBODY_LOAD_REPORTS = 'RESET_ANYBODY_LOAD_REPORTS';

export const ANYBODY_LOAD_REPORT_VIEW = 'ANYBODY_LOAD_REPORT_VIEW';
export const ANYBODY_LOAD_REPORT_VIEW_SUCCESS = 'ANYBODY_LOAD_REPORT_VIEW_SUCCESS';
export const ANYBODY_LOAD_REPORT_VIEW_FAILURE = 'ANYBODY_LOAD_REPORT_VIEW_FAILURE';
export const RESET_ANYBODY_LOAD_REPORT_VIEW = 'RESET_ANYBODY_LOAD_REPORT_VIEW';

export const MENTO_LOAD_REPORT_MODEL = 'MENTO_LOAD_REPORT_MODEL';
export const MENTO_LOAD_REPORT_MODEL_SUCCESS = 'MENTO_LOAD_REPORT_MODEL_SUCCESS';
export const MENTO_LOAD_REPORT_MODEL_FAILURE = 'MENTO_LOAD_REPORT_MODEL_FAILURE';
export const RESET_MENTO_LOAD_REPORT_MODEL = 'RESET_MENTO_LOAD_REPORT_MODEL';

export const MENTO_CREATE_REPORT = 'MENTO_CREATE_REPORT';
export const MENTO_CREATE_REPORT_SUCCESS = 'MENTO_CREATE_REPORT_SUCCESS';
export const MENTO_CREATE_REPORT_FAILURE = 'MENTO_CREATE_REPORT_FAILURE';

export const MENTO_UPDATE_REPORT_WITH_PHOTO = 'MENTO_UPDATE_REPORT_WITH_PHOTO';
export const MENTO_UPDATE_REPORT_WITH_PHOTO_SUCCESS = 'MENTO_UPDATE_REPORT_WITH_PHOTO_SUCCESS';
export const MENTO_UPDATE_REPORT_WITH_PHOTO_FAILURE = 'MENTO_UPDATE_REPORT_WITH_PHOTO_FAILURE';

export const MENTO_UPDATE_REPORT_CONTEXT_ONLY = 'MENTO_UPDATE_REPORT_CONTEXT_ONLY';
export const MENTO_UPDATE_REPORT_CONTEXT_ONLY_SUCCESS = 'MENTO_UPDATE_REPORT_CONTEXT_ONLY_SUCCESS';
export const MENTO_UPDATE_REPORT_CONTEXT_ONLY_FAILURE = 'MENTO_UPDATE_REPORT_CONTEXT_ONLY_FAILURE';

export const RESET_MENTO_SAVE_REPORT = 'RESET_MENTO_SAVE_REPORT';

export const MENTO_DELETE_REPORTS = 'MENTO_DELETE_REPORTS';
export const MENTO_DELETE_REPORTS_SUCCESS = 'MENTO_DELETE_REPORTS_SUCCESS';
export const MENTO_DELETE_REPORTS_FAILURE = 'MENTO_DELETE_REPORTS_FAILURE';
export const RESET_MENTO_DELETE_REPORTS = 'RESET_MENTO_DELETE_REPORTS';

const ROOT_URL = MENTO_URL;

export function anybodyLoadReports(teamId){
    const request = axios({
        url : `${ROOT_URL}/reports/${teamId}`,
        method : 'get'
    });
    return {
        type : ANYBODY_LOAD_REPORTS,
        payload : request
    }
}

export function anybodyLoadReportsSuccess(timeList){
    return {
        type : ANYBODY_LOAD_REPORTS_SUCCESS,
        payload : timeList.data
    }
}

export function anybodyLoadReportsFailure(error){
    return {
        type : ANYBODY_LOAD_REPORTS_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadReports(){
    return {
        type : RESET_ANYBODY_LOAD_REPORTS
    }
}

export function anybodyLoadReportView(reportId){
    const request = axios({
        url : `${ROOT_URL}/report/${reportId}`,
        method : 'get'
    });
    return {
        type : ANYBODY_LOAD_REPORT_VIEW,
        payload : request
    }
}

export function anybodyLoadReportViewSuccess(reportVO){
    return {
        type : ANYBODY_LOAD_REPORT_VIEW_SUCCESS,
        payload : reportVO.data
    }
}

export function anybodyLoadReportViewFailure(error){
    return {
        type : ANYBODY_LOAD_REPORT_VIEW_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadReportView(){
    return {
        type : RESET_ANYBODY_LOAD_REPORT_VIEW
    }
}

export function mentoLoadReportModel(reportId){
    const request = axios({
        url : `${ROOT_URL}/report/model/${reportId}`,
        method : 'get'
    });
    return {
        type : MENTO_LOAD_REPORT_MODEL,
        payload : request
    }
}

export function mentoLoadReportModelSuccess(model){
    return {
        type : MENTO_LOAD_REPORT_MODEL_SUCCESS,
        payload : model.data
    }
}

export function mentoLoadReportModelFailure(error){
    return {
        type : MENTO_LOAD_REPORT_MODEL_FAILURE,
        payload : error
    }
}

export function resetMentoLoadReportModel(){
    return {
        type : RESET_MENTO_LOAD_REPORT_MODEL
    }
}

export function mentoCreateReport(scheduleId, reportForm, photoFile){
    let formData = new FormData();
    formData.append('reportModel', new Blob([JSON.stringify(reportForm)], { type : 'application/json'}));
    formData.append('photoFile', photoFile);
    const request = axios({
        url : `${ROOT_URL}/report/${scheduleId}`,
        method : 'post',
        data : formData,
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    });
    return {
        type : MENTO_CREATE_REPORT,
        payload : request
    }
}

export function mentoCreateReportSuccess(message){
    return {
        type : MENTO_CREATE_REPORT_SUCCESS,
        payload : message.data
    }
}

export function mentoCreateReportFailure(error){
    return {
        type : MENTO_CREATE_REPORT_FAILURE,
        payload : error
    }
}

export function mentoUpdateReportWithPhoto(scheduleId, reportForm, photoFile){
    let formData = new FormData();
    formData.append('reportModel', new Blob([JSON.stringify(reportForm)], { type : 'application/json'}));
    formData.append('photoFile', photoFile);
    const request = axios({
        url : `${ROOT_URL}/report/${scheduleId}`,
        method : 'put',
        data : formData,
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    });
    return {
        type : MENTO_UPDATE_REPORT_WITH_PHOTO,
        payload : request
    }
}

export function mentoUpdateReportWithPhotoSuccess(message){
    return {
        type : MENTO_UPDATE_REPORT_WITH_PHOTO_SUCCESS,
        payload : message.data
    }
}

export function mentoUpdateReportWithPhotoFailure(error){
    return {
        type : MENTO_UPDATE_REPORT_WITH_PHOTO_FAILURE,
        payload : error
    }
}

export function mentoUpdateReportContextOnly(scheduleId, reportForm){
    const request = axios({
        url : `${ROOT_URL}/report/context/${scheduleId}`,
        method : 'put',
        data : reportForm,
    });
    return {
        type : MENTO_UPDATE_REPORT_CONTEXT_ONLY,
        payload : request
    }
}

export function mentoUpdateReportContextOnlySuccess(message){
    return {
        type : MENTO_UPDATE_REPORT_CONTEXT_ONLY_SUCCESS,
        payload : message.data
    }
}

export function mentoUpdateReportContextOnlyFailure(error){
    return {
        type : MENTO_UPDATE_REPORT_CONTEXT_ONLY_FAILURE,
        payload : error
    }
}

export function resetMentoSaveReport(){
    return {
        type : RESET_MENTO_SAVE_REPORT
    }
}

export function mentoDeleteReports(ids){
    const request = axios({
        url : `${ROOT_URL}/reports`,
        method : 'delete',
        data : ids
    });
    return {
        type : MENTO_DELETE_REPORTS,
        payload : request
    }
}

export function mentoDeleteReportsSuccess(message){
    return {
        type : MENTO_DELETE_REPORTS_SUCCESS,
        payload : message.data
    }
}

export function mentoDeleteReportsFailure(error){
    return {
        type : MENTO_DELETE_REPORTS_FAILURE,
        payload : error
    }
}

export function resetMentoDeleteReports(){
    return {
        type : RESET_MENTO_DELETE_REPORTS
    }
}