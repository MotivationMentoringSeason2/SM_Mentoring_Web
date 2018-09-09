import {AccountView} from "../component/account_view_page";
import {connect} from 'react-redux';
import {
    adminFetchAccountView, adminFetchAccountViewSuccess, adminFetchAccountViewFailure, resetAdminFetchAccountView,
    adminExecuteSettingChairman, adminExecuteSettingChairmanSuccess, adminExecuteSettingChairmanFailure, resetAdminExecuteSettingChairman
} from "../action/action_account";

function mapStateToProps(state){
    return {
        accountView : state.account.accountView,
        signStatus : state.account.signStatus,
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccountView : (id) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(adminFetchAccountView(accessToken, id)).then(response => {
                if(response.payload.status !== 200){
                    dispatch(adminFetchAccountViewFailure("조회를 하기 위한 회원 정보가 없습니다. 회원 목록으로 돌아갑니다."));
                }else{
                    dispatch(adminFetchAccountViewSuccess(response.payload));
                }
            })
        },
        executeCurrentAccountSettingChairman : (method, id) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(adminExecuteSettingChairman(accessToken, method, id)).then(response => {
                if(response.payload.status !== 200)
                    dispatch(adminExecuteSettingChairmanFailure(response.payload.data));
                else
                    dispatch(adminExecuteSettingChairmanSuccess(response.payload))
            })
        },
        resetFetchAccountView : () => dispatch(resetAdminFetchAccountView()),
        resetExecuteSettingChairman : () => dispatch(resetAdminExecuteSettingChairman())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);