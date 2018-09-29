import {ReportEditList} from "../component/mentoring_report_edit_page";
import { connect } from 'react-redux';
import {
    studentLoadCurrentMentoToken, studentLoadCurrentMentoTokenSuccess, studentLoadCurrentMentoTokenFailure, resetStudentLoadCurrentMentoToken
} from "../action/action_mento";
import {
    anybodyLoadClassTimes, anybodyLoadClassTimesSuccess, anybodyLoadClassTimesFailure, resetAnybodyLoadClassTimes
} from "../action/action_class_time";
import {
    anybodyLoadReports, anybodyLoadReportsSuccess, anybodyLoadReportsFailure, resetAnybodyLoadReports,
    mentoDeleteReports, mentoDeleteReportsSuccess, mentoDeleteReportsFailure, resetMentoDeleteReports
} from "../action/action_report";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        mentoringToken : state.mento.mentoringToken,
        classTimes : state.classTime.classTimes,
        reportList : state.report.reportList,
        deleteStatus : state.report.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMentoringToken : (identity) => dispatch(studentLoadCurrentMentoToken(identity)).then((response) => {
            if(!response.error){
                dispatch(studentLoadCurrentMentoTokenSuccess(response.payload));
            }else{
                dispatch(studentLoadCurrentMentoTokenFailure(response.payload));
            }
        }),
        resetFetchMentoringToken : () => dispatch(resetStudentLoadCurrentMentoToken()),
        fetchClassTimes : (teamId) => dispatch(anybodyLoadClassTimes(teamId)).then((response) => {
            if(!response.error){
                dispatch(anybodyLoadClassTimesSuccess(response.payload));
            }else{
                dispatch(anybodyLoadClassTimesFailure(response.payload));
            }
        }),
        resetFetchClassTimes : () => dispatch(resetAnybodyLoadClassTimes()),
        fetchReportList : (teamId) => dispatch(anybodyLoadReports(teamId)).then((response) => {
            if(!response.error)
                dispatch(anybodyLoadReportsSuccess(response.payload));
            else
                dispatch(anybodyLoadReportsFailure(response.payload));
        }),
        resetFetchReportList : () => dispatch(resetAnybodyLoadReports()),
        executeDeleteReports : (ids) => dispatch(mentoDeleteReports(ids)).then(response => {
            if(!response.error && response.payload.status === 200){
                dispatch(mentoDeleteReportsSuccess(response.payload));
            } else {
                dispatch(mentoDeleteReportsFailure(response.payload));
            }
        }),
        resetDeleteReports : () => dispatch(resetMentoDeleteReports())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportEditList);
