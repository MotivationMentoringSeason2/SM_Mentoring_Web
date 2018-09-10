import {ExcelForm} from "../component/account_excel_upload_page";
import {connect} from 'react-redux';
import {resetAdminExecuteExcelUploading} from "../action/action_account";

function mapStateToProps(state){
    return {
        signStatus : state.account.signStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetExecuteExcelUploading : () => dispatch(resetAdminExecuteExcelUploading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcelForm);