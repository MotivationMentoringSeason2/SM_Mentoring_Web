import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import CheckIcon from '@material-ui/icons/Check';
import ReportIcon from '@material-ui/icons/Inbox';

import {
    renderTextField, renderMultiTextField, renderDropzoneInput
} from "../form_render";

import {
    mentoCreateReport, mentoCreateReportSuccess, mentoCreateReportFailure,
    mentoUpdateReportContextOnly, mentoUpdateReportContextOnlySuccess, mentoUpdateReportContextOnlyFailure,
    mentoUpdateReportWithPhoto, mentoUpdateReportWithPhotoSuccess, mentoUpdateReportWithPhotoFailure
} from "../../action/action_report";
import ClassPhotoView from "./ClassPhotoView";

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: (window.innerWidth >= 450) ? 420 : 300,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.classPlace || values.classPlace.trim() === ''){
        errors.classPlace = '수업 진행 장소를 입력하세요.';
        hasErrors = true;
    }

    if(!values.classSubject || values.classSubject.trim() === ''){
        errors.classSubject = '수업 주제를 입력하세요.';
        hasErrors = true;
    }

    if(!values.classBriefing || values.classBriefing.trim() === ''){
        errors.classBriefing = '수업 요약문 및 소감문을 입력하세요.';
        hasErrors = true;
    }

    if(!values.photoFile && values.type === 'CREATE'){
        errors.photoFile = '수업 인증 파일을 적어도 하나 올리셔야 합니다.';
        hasErrors = true;
    } else if(values.photoFile && values.photoFile.length >= 1){
        const file = values.photoFile[0];
        if(file.size > 2097152) {
            errors.advFile = '파일은 2MB 이하로 첨부하시길 바랍니다.';
            hasErrors = true;
        }
    }

    return hasErrors && errors;
}

const validateAndSavingReport = (values, dispatch) => {
    const fileArray = values.photoFile;
    let reportModel = {
        classPlace : values && values.classPlace,
        classSubject : values && values.classSubject,
        classBriefing : values && values.classBriefing,
        absentPerson : values && values.absentPerson,
    }
    if(values && values.type === 'CREATE'){
        dispatch(mentoCreateReport(values.scheduleId, reportModel, fileArray !== undefined ? fileArray[0] : null)).then((response) => {
            if (response.payload && response.payload.status !== 200) {
                dispatch(mentoCreateReportFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(mentoCreateReportSuccess(response.payload));
        });
    } else {
        if (fileArray) {
            dispatch(mentoUpdateReportWithPhoto(values.scheduleId, reportModel, fileArray !== undefined ? fileArray[0] : null)).then((response) => {
                if (response.payload && response.payload.status !== 200) {
                    dispatch(mentoUpdateReportWithPhotoFailure(response.payload));
                    throw new SubmissionError(response.payload.data);
                }
                dispatch(mentoUpdateReportWithPhotoSuccess(response.payload));
            });
        } else {
            dispatch(mentoUpdateReportContextOnly(values.scheduleId, reportModel)).then((response) => {
                if (response.payload && response.payload.status !== 200) {
                    dispatch(mentoUpdateReportContextOnlyFailure(response.payload));
                    throw new SubmissionError(response.payload.data);
                }
                dispatch(mentoUpdateReportContextOnlySuccess(response.payload));
            });
        }
    }
}

class ReportEditForm extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data }
    }

    componentWillMount(){
        const query = queryString.parse(this.props.location.search);
        const { principal } = this.props.accessAccount;
        this.props.fetchMentoringToken(principal.identity);
        if(query && query.rId){
            this.props.fetchReportView(query.rId);
            this.props.fetchReportModel(query.rId);
        }
        this.props.fetchClassTimeModel(query && query.sId);
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
        }
    }

    componentWillUnmount(){
        const query = queryString.parse(this.props.location.search);
        if(query && query.rId){
            this.props.resetFetchReportView();
            this.props.resetFetchReportModel();
        }
        this.props.resetFetchMentoringToken();
        this.props.resetSaveReport();
        this.props.resetFetchClassTimeModel();
    }

    render() {
        const { token } = this.state;
        const query = queryString.parse(this.props.location.search);
        const { classes, handleSubmit } = this.props;
        const { message, error } = this.props.saveStatus;
        const { model } = this.props.timeModel;
        const { report } = this.props.reportView;

        if(token && model && token.id !== model.teamId){
            alert("현재 선택하신 팀은 다른 멘토링 보고서입니다. 이전으로 돌아갑니다.")
            this.props.history.push("/mento/report/edit");
        }

        if(query && query.rId){
            this.props.change("type", "UPDATE");
        } else {
            this.props.change("type", "CREATE");
        }
        this.props.change("scheduleId", query && query.sId);

        if(message){
            alert(message);
            this.props.history.push("/mento/report/edit");
        } else if(error) {
            alert("보고서 작성 중 예기치 않은 오류가 발생했습니다. 다시 시도 바랍니다.");
            this.props.history.push("/mento/report/edit");
        }

        return (
            <form className={classes.form} onSubmit={handleSubmit(validateAndSavingReport)}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <ReportIcon />
                        </Avatar>
                    </div>

                    <div>
                        <h3>{token && token.name}</h3>
                        <h3>보고서 {query && query.rId ? "수정" : "추가"}</h3>
                        <p>멘토링 보고서를 {query && query.rId ? "수정" : "추가"} 할 수 있는 페이지 입니다.</p>
                        <p>작성하신 보고서는 교수나 학생회장에 의해 확인 됩니다.</p>
                    </div>
                    <br/>

                    {
                        report && report.classPhotoId ?
                            <div className="w3-center">
                                <p>이전에 제출하신 수업 사진은 다음과 같습니다.</p>
                                <ClassPhotoView photoId={report.classPhotoId} />
                                <br/><br/>
                            </div> : null
                    }

                    <div>
                        <Field name="classPlace" className={classes.textField} type="text"
                               component={renderTextField} label="수업 장소" placeholder="멘토링 수업을 진행한 장소를 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="classSubject" className={classes.textField} type="text"
                               component={renderTextField} label="수업 주제" placeholder="멘토링 수업 때 다룬 수업 주제를 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="absentPerson" className={classes.textField} type="text"
                               component={renderTextField} label="결석 인원" placeholder="수업 시간에 결석한 인원들을 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="classBriefing" className={classes.textField} type="text"
                               component={renderMultiTextField} label="수업 내용 요약 및 소감" placeholder="멘토링 수업에 대한 내용 및 이에 대한 소감문을 작성하세요. (개행 가능)" />
                    </div>
                    <br/>

                    <div>
                        <label>수업 인증 사진</label>
                        <p>이미지 파일(jpg, jpeg, png) 하나의 파일만 올릴 수 있습니다.</p>
                        <Field
                            name="photoFile"
                            component={renderDropzoneInput}
                            accept={"image/jpeg, image/png, image/jpg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .hwp"}
                            multiple={false}
                        />
                        <br/>
                    </div>
                    <br/>

                    <p>다시 제출하기 전에 수업 진행 시간을 확인하시길 바랍니다.</p>
                    <ul className="w3-ul w3-border" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <li>수업 일자 : {model && model.classDate} {model && model.startTime} ~ {model && model.endTime}</li>
                        <li>수업 방식 : {model && model.method}</li>
                    </ul>
                    <br/>

                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon}/> 저장하기
                        </Button>
                        &nbsp;
                        <Link to="/mento/report/edit"><button type="button" className="w3-button w3-yellow w3-round-large">이전으로</button></Link>
                    </div>
                </Grid>
            </form>
        )
    }
}

ReportEditForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'reportForm',
    enableReinitialize : true,
    validate
})((withStyles(styles))(withRouter(ReportEditForm)));