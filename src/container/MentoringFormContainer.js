import {connect} from 'react-redux';
import {MentoringForm} from "../component/mentoring_page";
import {
    adminLoadMentoInfos, adminLoadMentoInfosSuccess, adminLoadMentoInfosFailure, resetAdminLoadMentoInfos,
    adminGrantMentoringTeam, adminGrantMentoringTeamSuccess, adminGrantMentoringTeamFailure,
    resetAdminGrantMentoringTeam
} from "../action/action_mento";
import {
    adminExecuteChangeStudentStatus, adminExecuteChangeStudentStatusFailure,
    adminExecuteChangeStudentStatusSuccess, resetAdminExecuteChangeStudentStatus
} from "../action/action_account";

function mapStateToProps(state) {
    return {
        teamList : state.mento.teamList,
        saveStatus : state.mento.saveStatus,
        grantStatus : state.account.grantStatus
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMentoInfos : () => dispatch(adminLoadMentoInfos()).then(response => {
            if(!response.error)
                dispatch(adminLoadMentoInfosSuccess(response.payload));
            else
                dispatch(adminLoadMentoInfosFailure(response.payload));
        }),
        resetFetchMentoInfos : () => dispatch(resetAdminLoadMentoInfos()),
        executeMentoGrantting : (teamId, status) => dispatch(adminGrantMentoringTeam(teamId, status)).then(response => {
            if(response.payload.status === 200)
                dispatch(adminGrantMentoringTeamSuccess(response.payload));
            else
                dispatch(adminGrantMentoringTeamFailure(response.payload));
        }),
        resetExecuteMentoGrantting : () => dispatch(resetAdminGrantMentoringTeam()),
        executeAccountGrantting : (identity, type) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(adminExecuteChangeStudentStatus(accessToken, identity, type)).then(response => {
                if(response.payload.status === 200)
                    dispatch(adminExecuteChangeStudentStatusSuccess(response.payload));
                else
                    dispatch(adminExecuteChangeStudentStatusFailure(response.payload));
            })
        },
        resetExecuteAccountGrantting : () => dispatch(resetAdminExecuteChangeStudentStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoringForm);