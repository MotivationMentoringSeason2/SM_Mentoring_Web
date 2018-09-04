import {ApplicationRouter} from '../router';
import {connect} from 'react-redux';
import {userFetchPrincipal, userFetchPrincipalSuccess, userFetchPrincipalFailure, resetUserFetchPrincipal} from "../action/action_account";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrincipalFromServer : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userFetchPrincipal(accessToken))
                .then((response) => {
                    localStorage.setItem('jwtToken', accessToken);
                    dispatch(userFetchPrincipalSuccess(response.payload))
                }).catch((response) => {
                    sessionStorage.removeItem('jwtToken');
                    dispatch(userFetchPrincipalFailure('사용자 로그인 유효 시간이 지났습니다. 유효 시간은 1시간 30분입니다.'));
                });
        },
        resetFetchPrincipalFromServer : () => {
            dispatch(resetUserFetchPrincipal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRouter);