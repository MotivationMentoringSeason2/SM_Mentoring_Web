import { MentoringCareerView } from "../component/mentoring_confirm_page";
import { connect } from 'react-redux';
import {
    studentLoadMentoCareers, studentLoadMentoCareersSuccess, studentLoadMentoCareersFailure,
    resetStudentLoadMentoCareers,
    studentLoadApplyModel, studentLoadApplyModelSuccess, studentLoadApplyModelFailure, resetStudentLoadApplyModel,
    resetStudentUpdateMentoInfo, studentDeleteMentoInfo, studentDeleteMentoInfoSuccess, studentDeleteMentoInfoFailure, resetStudentDeleteMentoInfo
} from "../action/action_mento";
import {
    studentLoadMentiCareers, studentLoadMentiCareersSuccess, studentLoadMentiCareersFailure, resetStudentLoadMentiCareers
} from "../action/action_menti";

function mapStateToProps(state){
    const { model } = state.mento.applyModel;
    const initialData = {
        teamName : model && model.teamName,
        person : model && model.person,
        advertise : model && model.advertise,
        qualify : model && model.qualify
    }
    return {
        initialValues : initialData,
        mentoCareerList : state.mento.careerList,
        mentiCareerList : state.menti.careerList,
        applyModel : state.mento.applyModel,
        accessAccount : state.account.accessAccount,
        saveStatus : state.mento.saveStatus,
        deleteStatus : state.mento.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMentoCareers : (identity) => dispatch(studentLoadMentoCareers(identity)).then((response) => {
            if(!response.error)
                dispatch(studentLoadMentoCareersSuccess(response.payload));
            else
                dispatch(studentLoadMentoCareersFailure(response.payload));
        }),
        resetFetchMentoCareers : () => dispatch(resetStudentLoadMentoCareers()),
        fetchMentiCareers : (identity) => dispatch(studentLoadMentiCareers(identity)).then((response) => {
            if(!response.error)
                dispatch(studentLoadMentiCareersSuccess(response.payload));
            else
                dispatch(studentLoadMentiCareersFailure(response.payload));
        }),
        resetFetchMentiCareers : () => dispatch(resetStudentLoadMentiCareers()),
        fetchMentoApply : (identity) => {
            dispatch(studentLoadApplyModel(identity)).then(response => {
                if(!response.error){
                    dispatch(studentLoadApplyModelSuccess(response.payload));
                } else {
                    dispatch(studentLoadApplyModelFailure(response.payload));
                }
            })
        },
        executeDeleteMentoInfo : (identity) => dispatch(studentDeleteMentoInfo(identity)).then(response => {
            if(!response.error)
                dispatch(studentDeleteMentoInfoSuccess(response.payload));
            else
                dispatch(studentDeleteMentoInfoFailure(response.payload));
        }),
        resetFetchMentoApply : () => dispatch(resetStudentLoadApplyModel()),
        resetExecuteSaveInfo : () => dispatch(resetStudentUpdateMentoInfo()),
        resetExecuteDeleteInfo : () => dispatch(resetStudentDeleteMentoInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoringCareerView);