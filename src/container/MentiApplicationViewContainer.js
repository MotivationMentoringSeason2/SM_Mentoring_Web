import {MentiApplicationView} from "../component/menti_application_page";
import {connect} from 'react-redux';
import {
    fetchAnotherAccountTimetable, fetchAnotherAccountTimetableFailure, fetchAnotherAccountTimetableSuccess,
    resetFetchAnotherAccountTimetable
} from "../action/action_available_time";
import {
    studentLoadApplyModel, studentLoadApplyModelSuccess, studentLoadApplyModelFailure, resetStudentLoadApplyModel
} from "../action/action_mento";
import {
    studentLoadTeamList, studentLoadTeamListSuccess, studentLoadTeamListFailure, resetStudentLoadTeamList,
    studentApplyMenti, studentApplyMentiSuccess, studentApplyMentiFailure, resetStudentApplyMenti,
    studentReleaseCurrentMenti, studentReleaseCurrentMentiSuccess, studentReleaseCurrentMentiFailure,
    resetStudentReleaseCurrentMenti
} from "../action/action_menti";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        accountTimetable : state.timetable.accountTimetable,
        applyModel : state.mento.applyModel,
        teamList : state.menti.teamList,
        saveStatus : state.menti.saveStatus,
        deleteStatus : state.menti.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
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
        fetchTeamList : (identity) => dispatch(studentLoadTeamList(identity)).then((response) => {
            if(!response.error){
                dispatch(studentLoadTeamListSuccess(response.payload));
            } else {
                dispatch(studentLoadTeamListFailure(response.payload));
            }
        }),
        resetFetchTeamList : () => dispatch(resetStudentLoadTeamList()),
        executeApplyMenti : (mentiForm) => dispatch(studentApplyMenti(mentiForm)).then((response) => {
            if(response.payload.status === 200){
                dispatch(studentApplyMentiSuccess(response.payload));
            } else {
                dispatch(studentApplyMentiFailure(response.payload));
            }
        }),
        resetExecuteApplyMenti : () => dispatch(resetStudentApplyMenti()),
        executeReleaseMenti : (mentiForm) => dispatch(studentReleaseCurrentMenti(mentiForm)).then((response) => {
            if(response.payload.status === 200){
                dispatch(studentReleaseCurrentMentiSuccess(response.payload));
            } else {
                dispatch(studentReleaseCurrentMentiFailure(response.payload));
            }
        }),
        resetExecuteReleaseMenti : () => dispatch(resetStudentReleaseCurrentMenti())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentiApplicationView);