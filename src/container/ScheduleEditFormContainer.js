import {ScheduleEditForm} from "../component/schedule_edit_page";
import {connect} from 'react-redux';
import {
    anybodyLoadCalendarList,
    anybodyLoadCalendarListFailure, anybodyLoadCalendarListSuccess,
    resetAnybodyLoadCalendarList, adminUpdateCalendarElement,
    adminUpdateCalendarElementSuccess, adminUpdateCalendarElementFailure, resetAdminUpdateCalendarElement
} from "../action/action_calendar";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        saveStatus : state.calendar.saveStatus,
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
        executeUpdateSchedule : (scheduleForm, writer) => dispatch(adminUpdateCalendarElement(scheduleForm, writer)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminUpdateCalendarElementSuccess(response.payload));
            else
                dispatch(adminUpdateCalendarElementFailure(response.payload));
        }),
        resetExecuteUpdateSchedule : () => dispatch(resetAdminUpdateCalendarElement())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleEditForm);