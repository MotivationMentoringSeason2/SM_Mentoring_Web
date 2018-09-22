import {MentoApplicationForm} from "../component/mento_application_page";
import {connect} from 'react-redux';
import {
    fetchAnotherAccountTimetable, fetchAnotherAccountTimetableSuccess, fetchAnotherAccountTimetableFailure, resetFetchAnotherAccountTimetable
} from "../action/action_available_time";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        accountTimetable : state.timetable.accountTimetable
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
        resetFetchTimetable : () => dispatch(resetFetchAnotherAccountTimetable())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoApplicationForm);