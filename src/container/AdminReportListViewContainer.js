import {ReportListView} from "../component/mentoring_report_confirm_page";
import {connect} from 'react-redux';
import {
    anybodyLoadReports, anybodyLoadReportsFailure, anybodyLoadReportsSuccess,
    resetAnybodyLoadReports
} from "../action/action_report";
import {
    adminLoadMentoToken, adminLoadMentoTokenSuccess, adminLoadMentoTokenFailure, resetAdminLoadMentoToken
} from "../action/action_mento";
import {
    mentoLoadMentiList, mentoLoadMentiListSuccess, mentoLoadMentiListFailure, resetMentoLoadMentiList
} from "../action/action_menti";

function mapStateToProps(state){
    return {
        mentoringToken : state.mento.mentoringToken,
        reportList : state.report.reportList,
        mentoringPeople : state.menti.mentoringPeople
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReportList : (teamId) => dispatch(anybodyLoadReports(teamId)).then((response) => {
            if(!response.error)
                dispatch(anybodyLoadReportsSuccess(response.payload));
            else
                dispatch(anybodyLoadReportsFailure(response.payload));
        }),
        resetFetchReportList : () => dispatch(resetAnybodyLoadReports()),
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
        resetFetchMentoringPerson : () => dispatch(resetMentoLoadMentiList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportListView);