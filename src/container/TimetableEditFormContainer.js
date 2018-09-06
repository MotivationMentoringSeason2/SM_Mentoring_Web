import {TimetableEditForm} from "../component/timetable_edit_page";
import {connect} from 'react-redux';
import {
    fetchAccountTimetable, fetchAccountTimetableSuccess, fetchAccountTimetableFailure, resetFetchAccountTimetable
} from "../action/action_available_time";

function mapStateToProps(state){
    const {timetables} = state.timetable.singleTimetable;
    let timetableSettings = {
        monAvailable : timetables.filter(timetable => timetable.day === 'MON').map(timetable => ({ startTime : timetable.startTime, endTime : timetable.endTime })),
        tueAvailable : timetables.filter(timetable => timetable.day === 'TUE').map(timetable => ({ startTime : timetable.startTime, endTime : timetable.endTime })),
        wedAvailable : timetables.filter(timetable => timetable.day === 'WED').map(timetable => ({ startTime : timetable.startTime, endTime : timetable.endTime })),
        thuAvailable : timetables.filter(timetable => timetable.day === 'THU').map(timetable => ({ startTime : timetable.startTime, endTime : timetable.endTime })),
        friAvailable : timetables.filter(timetable => timetable.day === 'FRI').map(timetable => ({ startTime : timetable.startTime, endTime : timetable.endTime }))
    };
    return {
        initialValues : timetableSettings,
        timetableForm : state.form.timetableForm
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