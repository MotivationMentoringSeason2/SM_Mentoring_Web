import {ClassScheduleEdit} from "../component/class_schedule_edit_page";
import {connect} from 'react-redux';
import {
    studentLoadCurrentMentoToken, studentLoadCurrentMentoTokenSuccess, studentLoadCurrentMentoTokenFailure, resetStudentLoadCurrentMentoToken
} from "../action/action_mento";
import {
    anybodyLoadClassTimes, anybodyLoadClassTimesSuccess, anybodyLoadClassTimesFailure, resetAnybodyLoadClassTimes,
    mentoDeleteClassTimes, mentoDeleteClassTimesSuccess, mentoDeleteClassTimesFailure, resetMentoDeleteClassTimes
} from "../action/action_class_time";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        mentoringToken : state.mento.mentoringToken,
        classTimes : state.classTime.classTimes,
        deleteStatus : state.classTime.deleteStatus
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
        executeDeleteClassTimes : (ids) => dispatch(mentoDeleteClassTimes(ids)).then(response => {
            if(!response.error && response.payload.status === 200){
                dispatch(mentoDeleteClassTimesSuccess(response.payload));
            } else {
                dispatch(mentoDeleteClassTimesFailure(response.payload));
            }
        }),
        resetDeleteClassTimes : () => dispatch(resetMentoDeleteClassTimes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScheduleEdit);