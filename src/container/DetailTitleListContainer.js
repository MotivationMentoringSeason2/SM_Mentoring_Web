import {DetailTitleList} from "../component/intro_detail_edit_page";
import {connect} from 'react-redux';
import {
    adminLoadDetailList, adminLoadDetailListSuccess, adminLoadDetailListFailure, resetAdminLoadDetailList
} from "../action/action_intro";

function mapStateToProps(state){
    return {
        detailList : state.intro.detailList,
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailList : (id) => dispatch(adminLoadDetailList(id)).then((response) => {
            if(!response.error)
                dispatch(adminLoadDetailListSuccess(response.payload));
            else
                dispatch(adminLoadDetailListFailure(response.payload));
        }),
        resetFetchDetailList : () => dispatch(resetAdminLoadDetailList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTitleList);