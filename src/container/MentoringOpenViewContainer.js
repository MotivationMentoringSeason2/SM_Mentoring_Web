import {connect} from 'react-redux';
import {MentoringOpenView} from "../component/mentoring_open_view_page";
import {
    adminLoadMentoInfos, adminLoadMentoInfosSuccess, adminLoadMentoInfosFailure, resetAdminLoadMentoInfos
} from "../action/action_mento";

function mapStateToProps(state) {
    return {
        teamList : state.mento.teamList
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
        resetFetchMentoInfos : () => dispatch(resetAdminLoadMentoInfos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoringOpenView);