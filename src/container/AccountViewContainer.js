import {AccountView} from "../component/account_view_page";
import {connect} from 'react-redux';
import {
    adminFetchAccountView, adminFetchAccountViewSuccess, adminFetchAccountViewFailure, resetAdminFetchAccountView
} from "../action/action_account";

function mapStateToProps(state){
    return {
        accountView : state.account.accountView,
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
        resetFetchAccountView : () => dispatch(resetAdminFetchAccountView())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);