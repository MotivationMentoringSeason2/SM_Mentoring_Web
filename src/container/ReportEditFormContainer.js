import {connect} from 'react-redux';
import {ReportEditForm} from "../component/mentoring_report_edit_page";
import {
    resetStudentLoadCurrentMentoToken, studentLoadCurrentMentoToken, studentLoadCurrentMentoTokenFailure,
    studentLoadCurrentMentoTokenSuccess
} from "../action/action_mento";
import {
    resetMentoSaveReport, mentoLoadReportModel, mentoLoadReportModelSuccess, mentoLoadReportModelFailure, resetMentoLoadReportModel,
    anybodyLoadReportView, anybodyLoadReportViewSuccess, anybodyLoadReportViewFailure, resetAnybodyLoadReportView
} from "../action/action_report";
import {
    mentoLoadClassTimeModel,
    mentoLoadClassTimeModelFailure, mentoLoadClassTimeModelSuccess,
    resetMentoLoadClassTimeModel
} from "../action/action_class_time";

function mapStateToProps(state){
    const {model} = state.report.reportModel;
    let formData = {
        classPlace : model && model.classPlace,
        classSubject : model && model.classSubject,
        classBriefing : model && model.classBriefing,
        absentPerson : model && model.absentPerson
    };
    return {
        initialValues : formData,
        accessAccount : state.account.accessAccount,
        mentoringToken : state.mento.mentoringToken,
        saveStatus : state.report.saveStatus,
        reportView : state.report.reportView,
        timeModel : state.classTime.timeModel
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
        fetchReportView : (reportId) => dispatch(anybodyLoadReportView(reportId)).then(response => {
            if(!response.error){
                dispatch(anybodyLoadReportViewSuccess(response.payload));
            } else {
                dispatch(anybodyLoadReportViewFailure(response.payload));
            }
        }),
        resetFetchReportView : () => dispatch(resetAnybodyLoadReportView()),
        fetchReportModel : (reportId) => dispatch(mentoLoadReportModel(reportId)).then(response => {
            if(!response.error){
                dispatch(mentoLoadReportModelSuccess(response.payload));
            } else {
                dispatch(mentoLoadReportModelFailure(response.payload));
            }
        }),
        resetFetchReportModel : () => dispatch(resetMentoLoadReportModel()),
        fetchClassTimeModel : (scheduleId) => dispatch(mentoLoadClassTimeModel(scheduleId)).then(response => {
            if(!response.error)
                dispatch(mentoLoadClassTimeModelSuccess(response.payload));
            else
                dispatch(mentoLoadClassTimeModelFailure(response.payload));
        }),
        resetFetchClassTimeModel : () => dispatch(resetMentoLoadClassTimeModel()),
        resetSaveReport : () => dispatch(resetMentoSaveReport())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportEditForm);