import {TimetableEditForm} from "../component/timetable_edit_page";
import {connect} from 'react-redux';
import {
    fetchAccountTimetable, fetchAccountTimetableSuccess, fetchAccountTimetableFailure, resetFetchAccountTimetable
} from "../action/action_available_time";

function mapStateToProps(state){
    const {timetables} = state.timetable.singleTimetable;
    let timetableSettings = {
        monAvailable : timetables.filter(timetable => timetable.day === 'MON').length > 0 ? timetables.filter(timetable => timetable.day === 'MON') : [{}],
        tueAvailable : timetables.filter(timetable => timetable.day === 'TUE').length > 0 ? timetables.filter(timetable => timetable.day === 'TUE') : [{}],
        wedAvailable : timetables.filter(timetable => timetable.day === 'WED').length > 0 ? timetables.filter(timetable => timetable.day === 'WED') : [{}],
        thuAvailable : timetables.filter(timetable => timetable.day === 'THU').length > 0 ? timetables.filter(timetable => timetable.day === 'THU') : [{}],
        friAvailable : timetables.filter(timetable => timetable.day === 'FRI').length > 0 ? timetables.filter(timetable => timetable.day === 'FRI') : [{}],
    };
    return {
        initialValues : timetableSettings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentTimetables : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(fetchAccountTimetable(accessToken)).then(response => {
                if(!response.error){
                    dispatch(fetchAccountTimetableSuccess(response.payload));
                }else{
                    dispatch(fetchAccountTimetableFailure(response.payload));
                }
            })
        },
        resetFetchCurrentTimetables : () => dispatch(resetFetchAccountTimetable())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimetableEditForm);