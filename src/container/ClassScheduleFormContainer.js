import {ClassScheduleForm} from "../component/class_schedule_edit_page";
import {connect} from 'react-redux';
import {
    studentLoadCurrentMentoToken, studentLoadCurrentMentoTokenSuccess, studentLoadCurrentMentoTokenFailure, resetStudentLoadCurrentMentoToken
} from "../action/action_mento";
import {
    mentoLoadClassTimeModel, mentoLoadClassTimeModelSuccess, mentoLoadClassTimeModelFailure, resetMentoLoadClassTimeModel,
    resetMentoSaveClassTime
} from "../action/action_class_time";

import {
    mentoLoadMentiList, mentoLoadMentiListSuccess, mentoLoadMentiListFailure, resetMentoLoadMentiList
} from "../action/action_menti";

function mapStateToProps(state){
    const {model} = state.classTime.timeModel;
    let formData = {
        method : model && model.method,
        classDate : model && model.classDate,
        startTime : model && model.startTime,
        endTime : model && model.endTime
    };
    return {
        initialValues : formData,
        accessAccount : state.account.accessAccount,
        mentoringToken : state.mento.mentoringToken,
        timeModel : state.classTime.timeModel,
        mentoringPeople : state.menti.mentoringPeople,
        saveStatus : state.classTime.saveStatus
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
        fetchClassTimeModel : (scheduleId) => dispatch(mentoLoadClassTimeModel(scheduleId)).then(response => {
            if(!response.error)
                dispatch(mentoLoadClassTimeModelSuccess(response.payload));
            else
                dispatch(mentoLoadClassTimeModelFailure(response.payload));
        }),
        resetFetchClassTimeModel : () => dispatch(resetMentoLoadClassTimeModel()),
        fetchMentoringPeople : (teamId) => dispatch(mentoLoadMentiList(teamId)).then(response => {
            if(!response.error)
                dispatch(mentoLoadMentiListSuccess(response.payload));
            else
                dispatch(mentoLoadMentiListFailure(response.payload));
        }),
        resetFetchMentoringPeople : () => dispatch(resetMentoLoadMentiList()),
        resetSaveClassTime : () => dispatch(resetMentoSaveClassTime())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScheduleForm);