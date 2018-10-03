import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import CheckIcon from '@material-ui/icons/Check';
import AssignmentIcon from '@material-ui/icons/AssignmentTurnedIn';
import {ClassPhotoView} from "../mentoring_report_edit_page";
import {MultiTimetable} from "../timetable_component";
import axios from "axios";
import {renderMultiTextField} from "../form_render";

import {
    adminUpdateScheduleMessage, adminUpdateScheduleMessageSuccess, adminUpdateScheduleMessageFailure
} from "../../action/action_class_time";
import {userUpdateSignForm, userUpdateSignFormFailure, userUpdateSignFormSuccess} from "../../action/action_account";

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

function validate(values) {
    var errors = {};
    var hasErrors = false;

    if (values.status === 'REJECT') {
        if (!values.message || values.message.trim() === '') {
            errors.message = '보고서 커멘트를 입력하지 않았습니다. 확인 부탁 드립니다.';
            hasErrors = true;
        }
    }
    return hasErrors && errors;
}

const validateAndSubmitMessage = (value, dispatch) => {
    const messageForm = {
        message : value && (value.message || ""),
        status : value && value.status
    }
    return dispatch(adminUpdateScheduleMessage(value && value.scheduleId, messageForm)).then(
        (response) => {
            if(response.payload && response.payload.status !== 200){
                dispatch(adminUpdateScheduleMessageFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(adminUpdateScheduleMessageSuccess(response.payload));
        }
    );
}

class ReportConfirmView extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data, realName : null, status : 'LOADING' };
    }

    componentWillMount(){
        const { match } = this.props;
        this.props.fetchMentoringToken(match.params.teamId);
        this.props.fetchReportView(match.params.reportId);
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        const { report } = this.props.reportView;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
            axios.get(`http://127.0.0.1:8081/AccountAPI/resource/account/name/${data.mento}`).then(response => this.setState({ realName : response.data }));
            this.props.fetchMentoringPerson(data.id);
        }
        if(nextProps.reportView.report !== report){
            this.setState({
                status : nextProps.reportView.report && nextProps.reportView.report.status
            });
        }
    }

    componentWillUnmount(){
        this.props.resetUpdateMessage();
        this.props.resetFetchMentoringToken();
        this.props.resetFetchReportView();
        this.props.resetFetchMentoringPerson();
    }

    handleClickChange(status){
        this.setState({
            status : status
        });
    }

    render() {
        const { token, status } = this.state;
        const { classes, handleSubmit, match } = this.props;
        const { report } = this.props.reportView;
        const { people } = this.props.mentoringPeople;
        const { message, error } = this.props.saveStatus;

        this.props.change("status", status);
        this.props.change("scheduleId", report && report.scheduleId);

        if(message){
            alert(message);
            this.props.history.push(`/admin/report/list/${match.params.teamId}`);
        } else if(error){
            alert(error);
            this.props.history.push(`/admin/report/list/${match.params.teamId}`);
        }

        return (
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <AssignmentIcon />
                        </Avatar>
                    </div>

                    <div>
                        <h3>{token && token.name}</h3>
                        <h3>관리자 보고서 확인</h3>
                        <p>멘토가 작성한 보고서를 최종 확인 할 수 있는 페이지 입니다.</p>
                    </div>
                    <br/>

                    <div className="w3-round-large w3-card-4 w3-padding" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-orange">수업 진행 시각</h3>
                            <p>{report && report.classDate} {report && report.startTime} ~ {report && report.endTime}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-orange">멘토링 수업 방식</h3>
                            <p>{report && report.method}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-orange">결석 인원</h3>
                            <p>{report && report.absentPerson}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-orange">수업 장소</h3>
                            <p>{report && report.classPlace}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-orange">수업 주제</h3>
                            <p>{report && report.classSubject}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-orange">수업 요약문, 소감문</h3>
                            <p>{report && report.classBriefing}</p>
                        </div>
                        {
                            report && report.classPhotoId ?
                                <div className="w3-left-align">
                                    <h3 className="w3-border-bottom w3-border-orange">수업 진행 사진</h3>
                                    <br/>
                                    <ClassPhotoView photoId={report.classPhotoId} />
                                    <br/>
                                </div> : null
                        }
                        <form onSubmit={handleSubmit(validateAndSubmitMessage)}>
                            <div className="w3-left-align">
                                <h3 className="w3-border-bottom w3-border-orange">관리자 보고서 확인</h3>
                            </div>
                            <div className="w3-center">
                            {
                                status !== 'PERMIT' ? <button type="button" onClick={() => this.handleClickChange("PERMIT")} className="w3-button w3-round-large w3-green">허가로 변환</button>
                                    : null
                            }
                            {
                                status !== 'REJECT' ? <button type="button" onClick={() => this.handleClickChange("REJECT")} className="w3-button w3-round-large w3-red">반려로 변환</button>
                                    : null
                            }
                            </div>
                            <div className="w3-center">
                                {
                                    status === 'PERMIT' ?
                                        <p>보고서에 대해 확인 처리를 선택하셔서 커멘트를 입력하시지 않으셔도 됩니다.</p> : null
                                }
                                {
                                    status === 'REJECT' ?
                                        <Field name="message" className={classes.textField} type="text"
                                               component={renderMultiTextField} label="보고서 커멘트" placeholder="보고서나 멘토링 수업에 대한 커멘트를 입력하세요. (개행 가능)" />
                                        : null
                                }
                            </div>
                            <br/>
                            {
                                status === 'LOADING' ? null :
                                    <div className="w3-center">
                                        <Button variant="contained" type="submit" color="primary">
                                            <CheckIcon className={classes.leftIcon} /> 저장하기
                                        </Button>
                                    </div>
                            }
                        </form>
                    </div>
                    <br/>
                    <div>
                        <Link to={`/admin/report/list/${match.params.teamId}`}><button type="button" className="w3-button w3-yellow w3-round-large">이전으로</button></Link>
                    </div>
                    <br/>
                    <MultiTimetable person={people}/>
                    <br/>
                </Grid>
            </div>
        )
    }
}

export default reduxForm({
    form: 'reportConfirmForm',
    enableReinitialize : true,
    validate
})(withStyles(styles)(withRouter(ReportConfirmView)));