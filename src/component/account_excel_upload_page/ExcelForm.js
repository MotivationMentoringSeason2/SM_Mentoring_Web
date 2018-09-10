import React, {Component} from 'react';
import axios from 'axios';
import { renderDropzoneInput } from "../form_render";
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles/index";

import CloudIcon from '@material-ui/icons/Cloud';
import {adminExecuteExcelUploading, adminExecuteExcelUploadingSuccess, adminExecuteExcelUploadingFailure} from "../../action/action_account";

const ADMIN_ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/admin';

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

function validate(values) {
    var errors = {};
    var hasErrors = false;

    if (!values.excel_file) {
        errors.excel_file = '파일을 업로드를 진행해 주시길 바랍니다.';
        hasErrors = true;
    } else if (values.excel_file.length === 0) {
        errors.excel_file = '파일 확장자는 xlsx 파일만 가능합니다.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const excelUploading = (value, dispatch) => {
    const fileArray = value.excel_file;
    let resultCount = fileArray === undefined ? 0 : fileArray.length;
    let accessToken = localStorage.getItem('jwtToken');
    if(!accessToken || accessToken === '') return;
    if(resultCount >= 1){
        fileArray.map((file) => {
            dispatch(adminExecuteExcelUploading(accessToken, file)).then((response) => {
                if (response.payload && response.payload.status !== 200) {
                    dispatch(adminExecuteExcelUploadingFailure(response.payload.data));
                }
                dispatch(adminExecuteExcelUploadingSuccess(response.payload));
            }).catch(reason => dispatch(adminExecuteExcelUploadingFailure("데이터베이스 측에서 오류가 발생했습니다...")))
        });
    }
}

class ExcelForm extends Component{
    handleClickSampleDownload(){
        let accessToken = localStorage.getItem('jwtToken');
        if(!accessToken || accessToken === '') return;
        axios({
            url: `${ADMIN_ROOT_URL}/account/excel/sample_document`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'get',
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '신입생_추가_폼.xlsx');
            document.body.appendChild(link);
            link.click();
        })
    }

    componentWillUnmount(){
        this.props.resetExecuteExcelUploading();
    }

    render(){
        const {handleSubmit, classes} = this.props;
        const {error, message} = this.props.signStatus;

        if(message){
            alert(message);
            this.props.resetExecuteExcelUploading();
            this.props.history.push('/admin/accounts/list?pg=1');
        } else if(error){
            alert(error);
            this.props.resetExecuteExcelUploading();
            this.props.history.push('/admin/excel_upload/_refresh');
        }

        return (
            <div>
                <form onSubmit={handleSubmit(excelUploading)}>
                    <Grid align="center">
                        <hr/>
                        <div>
                            <Avatar className={classes.avatar}>
                                <CloudIcon />
                            </Avatar>
                        </div>
                        <div>
                            <h3>신입생 / 편입생 Excel Upload</h3>
                            <p>신입생과 편입생을 Excel 로 올릴 수 있습니다.</p>
                            <p>아래 다운로드 버튼을 클릭하면 신입생, 편입생 목록 작성 Form 을 다운로드 받을 수 있습니다.</p>
                            <p>학과 이름과 학생 이름은 다운로드 받은 Excel Form 형식으로 작성하시길 권장합니다.</p>
                        </div>
                        <Field
                            name="excel_file"
                            component={renderDropzoneInput}
                            accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
                        />
                        <br/>
                        <button type="submit" className="w3-button w3-round-large w3-green">업로드 진행</button>
                        <br/><br/>
                        <button type="button" className="w3-button w3-round-large w3-blue" onClick={() => this.handleClickSampleDownload()}>Excel Form 다운로드</button>
                        <br/>
                    </Grid>
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form : 'excelForm',
    validate
})((withStyles(styles))(withRouter(ExcelForm)));