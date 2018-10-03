import { connect } from 'react-redux';
import { ReportSelectView } from "../component/mentoring_report_confirm_page";
import {
    adminLoadMentoTeamsBySemester, adminLoadMentoTeamsBySemesterSuccess, adminLoadMentoTeamsBySemesterFailure, resetAdminLoadMentoTeamsBySemester
} from "../action/action_mento";

function mapStateToProps(state){
    return {
        teamList : state.mento.teamList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMentoListBySemester : (semesterId) => dispatch(adminLoadMentoTeamsBySemester(semesterId)).then(response => {
            if(!response.error)
                dispatch(adminLoadMentoTeamsBySemesterSuccess(response.payload));
            else
                dispatch(adminLoadMentoTeamsBySemesterFailure(response.payload));
        }),
        resetFetchMentoListBySemester : () => dispatch(resetAdminLoadMentoTeamsBySemester())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportSelectView);