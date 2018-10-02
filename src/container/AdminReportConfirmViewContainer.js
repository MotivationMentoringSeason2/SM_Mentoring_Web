import {ReportConfirmView} from "../component/mentoring_report_confirm_page";
import {connect} from 'react-redux';
import {
    adminLoadMentoToken, adminLoadMentoTokenFailure, adminLoadMentoTokenSuccess,
    resetAdminLoadMentoToken
} from "../action/action_mento";
import {
    anybodyLoadReportView, anybodyLoadReportViewSuccess, anybodyLoadReportViewFailure,
    resetAnybodyLoadReportView
} from "../action/action_report";
import {
    mentoLoadMentiList, mentoLoadMentiListFailure, mentoLoadMentiListSuccess,
    resetMentoLoadMentiList
} from "../action/action_menti";
import {resetAdminUpdateScheduleMessage} from "../action/action_class_time";

function mapStateToProps(state){
    const { report } = state.report.reportView;
    return {
        initialValues : {
            message : report && report.adminMessage
        },
        accessAccount : state.account.accessAccount,
        mentoringToken : state.mento.mentoringToken,
        reportView : state.report.reportView,
        mentoringPeople : state.menti.mentoringPeople,
        saveStatus : state.classTime.saveStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReportView : (reportId) => dispatch(anybodyLoadReportView(reportId)).then((response) => {
            if(!response.error)
                dispatch(anybodyLoadReportViewSuccess(response.payload));
            else
                dispatch(anybodyLoadReportViewFailure(response.payload));
        }),
        resetFetchReportView : () => dispatch(resetAnybodyLoadReportView()),
        fetchMentoringToken : (teamId) => dispatch(adminLoadMentoToken(teamId)).then(response => {
            if(!response.error)
                dispatch(adminLoadMentoTokenSuccess(response.payload));
            else
                dispatch(adminLoadMentoTokenFailure(response.payload));
        }),
        resetFetchMentoringToken : () => dispatch(resetAdminLoadMentoToken()),
        fetchMentoringPerson : (teamId) => dispatch(mentoLoadMentiList(teamId)).then(response => {
            if(!response.error)
                dispatch(mentoLoadMentiListSuccess(response.payload));
            else
                dispatch(mentoLoadMentiListFailure(response.payload));
        }),
        resetFetchMentoringPerson : () => dispatch(resetMentoLoadMentiList()),
        resetUpdateMessage : () => dispatch(resetAdminUpdateScheduleMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportConfirmView);