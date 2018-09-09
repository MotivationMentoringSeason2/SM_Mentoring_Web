import {AccountTable} from "../component/account_list_page";
import {connect} from 'react-redux';
import {
    adminFetchAccountList, adminFetchAccountListFailure, adminFetchAccountListSuccess, resetAdminFetchAccountList
} from "../action/action_account";

function mapStateToProps(state){
    const { pagination } = state.account.accountList;
    let formUpdater = {
        sb : pagination && (pagination.sb || 0),
        ob : pagination && (pagination.ob || 0),
        tb : pagination && (pagination.tb || 0),
        st : pagination && (pagination.st || ''),
    };
    return {
        initialValues : formUpdater,
        searchForm : state.form.searchForm,
        accountList : state.account.accountList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccountList : (pagination) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(adminFetchAccountList(accessToken, pagination)).then(response => {
                if(!response.error){
                    dispatch(adminFetchAccountListSuccess(response.payload));
                }else{
                    dispatch(adminFetchAccountListFailure(response.payload));
                }
            });
        },
        resetFetchAccountList : () => dispatch(resetAdminFetchAccountList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);