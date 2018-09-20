import {ScheduleForm} from "../component/schedule_page";
import {connect} from 'react-redux';
import {
    anybodyLoadCalendarList, anybodyLoadCalendarListSuccess, anybodyLoadCalendarListFailure, resetAnybodyLoadCalendarList
} from "../action/action_calendar";

function mapStateToProps(state) {
    return {
        calendarList : state.calendar.calendarList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCalendarList : () => dispatch(anybodyLoadCalendarList()).then((response) => {
            if(!response.error)
                dispatch(anybodyLoadCalendarListSuccess(response.payload));
            else
                dispatch(anybodyLoadCalendarListFailure(response.payload));
        }),
        resetFetchCalendarList : () => dispatch(resetAnybodyLoadCalendarList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm);