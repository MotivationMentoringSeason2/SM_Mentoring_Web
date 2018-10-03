import {ClassTimeConfirmView} from "../component/menti_class_time_confirm_page";
import {connect} from 'react-redux';
import {
    anybodyLoadClassTimes, anybodyLoadClassTimesFailure, anybodyLoadClassTimesSuccess,
    resetAnybodyLoadClassTimes
} from "../action/action_class_time";
import {
    mentiLoadMentoringToken, mentiLoadMentoringTokenSuccess, mentiLoadMentoringTokenFailure,
    resetMentiLoadMentoringToken, mentoLoadMentiList, mentoLoadMentiListSuccess, resetMentoLoadMentiList,
    mentoLoadMentiListFailure
} from "../action/action_menti";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        mentoringToken : state.menti.mentoringToken,
        classTimes : state.classTime.classTimes,
        mentoringPeople : state.menti.mentoringPeople
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMentoringToken : (identity) => dispatch(mentiLoadMentoringToken(identity)).then((response) => {
            if(!response.error){
                dispatch(mentiLoadMentoringTokenSuccess(response.payload));
            }else{
                dispatch(mentiLoadMentoringTokenFailure(response.payload));
            }
        }),
        resetFetchMentoringToken : () => dispatch(resetMentiLoadMentoringToken()),
        fetchClassTimes : (teamId) => dispatch(anybodyLoadClassTimes(teamId)).then((response) => {
            if(!response.error){
                dispatch(anybodyLoadClassTimesSuccess(response.payload));
            }else{
                dispatch(anybodyLoadClassTimesFailure(response.payload));
            }
        }),
        resetFetchClassTimes : () => dispatch(resetAnybodyLoadClassTimes()),
        fetchMentoringPerson : (teamId) => dispatch(mentoLoadMentiList(teamId)).then(response => {
            if(!response.error)
                dispatch(mentoLoadMentiListSuccess(response.payload));
            else
                dispatch(mentoLoadMentiListFailure(response.payload));
        }),
        resetFetchMentoringPerson : () => dispatch(resetMentoLoadMentiList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassTimeConfirmView);