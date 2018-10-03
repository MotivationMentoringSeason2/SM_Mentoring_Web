import {SemesterListView} from "../component/semester_edit_page";
import {connect} from 'react-redux';
import {
    adminLoadSemesterList, adminLoadSemesterListFailure,
    adminLoadSemesterListSuccess, resetAdminCreateSemester, resetAdminLoadSemesterList
} from "../action/action_semester";

function mapStateToProps(state){
    return {
        semesterList : state.semester.semesterList,
        saveStatus : state.semester.saveStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSemesterList : () => dispatch(adminLoadSemesterList()).then(response => {
            if(!response.error)
                dispatch(adminLoadSemesterListSuccess(response.payload));
            else
                dispatch(adminLoadSemesterListFailure(response.payload));
        }),
        resetFetchSemesterList : () => dispatch(resetAdminLoadSemesterList()),
        resetSaveSemester : () => dispatch(resetAdminCreateSemester())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SemesterListView);