import {MentoApplicationForm} from "../component/mento_application_page";
import {connect} from 'react-redux';
import {
    fetchAnotherAccountTimetable, fetchAnotherAccountTimetableSuccess, fetchAnotherAccountTimetableFailure, resetFetchAnotherAccountTimetable
} from "../action/action_available_time";
import {
    studentLoadApplyModel, studentLoadApplyModelSuccess, studentLoadApplyModelFailure, resetStudentLoadApplyModel,
    resetStudentApplyMento
} from "../action/action_mento";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        accountTimetable : state.timetable.accountTimetable,
        applyModel : state.mento.applyModel,
        saveStatus : state.mento.saveStatus
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchTimetable : (identity) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(fetchAnotherAccountTimetable(identity)).then(response => {
                if(!response.error){
                    dispatch(fetchAnotherAccountTimetableSuccess(response.payload));
                }else{
                    dispatch(fetchAnotherAccountTimetableFailure(response.payload));
                }
            })
        },
        resetFetchTimetable : () => dispatch(resetFetchAnotherAccountTimetable()),
        fetchMentoApply : (identity) => {
            dispatch(studentLoadApplyModel(identity)).then(response => {
                if(!response.error){
                    dispatch(studentLoadApplyModelSuccess(response.payload));
                } else {
                    dispatch(studentLoadApplyModelFailure(response.payload));
                }
            })
        },
        resetFetchMentoApply : () => dispatch(resetStudentLoadApplyModel()),
        resetApplyMento : () => dispatch(resetStudentApplyMento())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoApplicationForm);