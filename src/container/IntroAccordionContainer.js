import {IntroAccordion} from "../component/intro_view_page";
import {connect} from 'react-redux';
import {
    anybodyLoadIntroAccordion, anybodyLoadIntroAccordionSuccess, anybodyLoadIntroAccordionFailure, resetAnybodyLoadIntroAccordion
} from "../action/action_intro";

function mapStateToProps(state){
    return {
        accordionStatus : state.intro.accordionStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchIntroAccordion : () => dispatch(anybodyLoadIntroAccordion()).then((response) => {
            if(!response.error){
                dispatch(anybodyLoadIntroAccordionSuccess(response.payload));
            }else{
                dispatch(anybodyLoadIntroAccordionFailure(response.payload));
            }
        }),
        resetFetchIntroAccordion : () => dispatch(resetAnybodyLoadIntroAccordion())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroAccordion);
