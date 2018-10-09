import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import RemoveIcon from '@material-ui/icons/Remove';
import FolderIcon from '@material-ui/icons/FolderShared';
import CheckIcon from '@material-ui/icons/Check';
import ChildIcon from '@material-ui/icons/ChildCare';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';

import {
    renderTextField, renderMultiTextField, renderDropzoneInput
} from "../form_render";

import {
    studentUpdateMentoInfo, studentUpdateMentoInfoSuccess, studentUpdateMentoInfoFailure
} from "../../action/action_mento";

const RESOURCE_URL = 'http://127.0.0.1:8082/MentoAPI';

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
    if(!values.teamName || values.teamName.trim() === ''){
        errors.teamName = '멘토링 팀 이름을 입력하세요.';
        hasErrors = true;
    }

    if(!values.person){
        errors.person = '멘토링 팀 인원을 입력하세요.';
        hasErrors = true;
    } else if(isNaN(values.person)){
        errors.person = '멘토링 인원은 숫자로만 입력하세요.';
        hasErrors = true;
    } else if(values.person * 1 < 3 || values.person * 1 > 10) {
        errors.person = '멘토링 인원은 3명 부터 10명까지만 입력하세요.';
        hasErrors = true;
    }

    if(!values.teamName || values.teamName.trim() === ''){
        errors.teamName = '멘토링 팀 이름을 입력하세요.';
        hasErrors = true;
    }

    if(!values.qualify || values.qualify.trim() === ''){
        errors.qualify = '자격 증명을 입력하세요.';
        hasErrors = true;
    }

    if(!values.advertise || values.advertise.trim() === ''){
        errors.advertise = '멘토링 홍보 / 안내 글을 입력하세요.';
        hasErrors = true;
    }

    if(values.advFile && values.advFile.length >= 1){
        const file = values.advFile[0];
        if(file.size > 2097152) {
            errors.advFile = '파일은 2MB 이하로 첨부하시길 바랍니다.';
            hasErrors = true;
        }
    }

    return hasErrors && errors;
}

const validateAndApplicateMento = (values, dispatch) => {
    const fileArray = values.advFile;
    let applyModel = {
        mento : values && values.mento,
        teamName : values && values.teamName,
        person : values && values.person * 1,
        advertise : values && values.advertise,
        qualify : values && values.qualify,
        subjects : values && values.subjects.map(subject => subject.value)
    }
    dispatch(studentUpdateMentoInfo(values.mento, applyModel, fileArray !== undefined ? fileArray[0] : null)).then((response) => {
        if (response.payload && response.payload.status !== 200) {
            dispatch(studentUpdateMentoInfoFailure(response.payload));
            throw new SubmissionError(response.payload.data);
        }
        dispatch(studentUpdateMentoInfoSuccess(response.payload));
    });
}


class MentoringCareerView extends Component{
    constructor(props){
        super(props);
        this.state = { semester : null, subjects : [], selectSubs : [] };
    }

    componentWillMount(){
        axios.get(`${RESOURCE_URL}/semester/current`).then(response => this.setState({ semester : response.data }));
        axios.get(`${RESOURCE_URL}/subjects`).then(response => this.setState({ subjects : response.data }));
    }

    componentDidMount(){
        const { principal } = this.props.accessAccount;
        this.props.fetchMentoCareers(principal.identity);
        this.props.fetchMentiCareers(principal.identity);
        this.props.fetchMentoApply(principal.identity);
    }

    componentWillUnmount(){
        this.props.resetFetchMentoCareers();
        this.props.resetFetchMentiCareers();
        this.props.resetFetchMentoApply();
        this.props.resetExecuteSaveInfo();
        this.props.resetExecuteDeleteInfo();
    }

    handleChange(event) {
        this.setState({ selectSubs : event });
    }

    handleClickMentoCancel(){
        const { principal } = this.props.accessAccount;
        const hasCancel = window.confirm("이번 학기의 멘토 신청 자체를 삭제합니다. 삭제를 해도 멘토 신청은 다시 가능합니다. 계속 하시겠습니까?");
        if(hasCancel)
            this.props.executeDeleteMentoInfo(principal.identity);
    }

    render() {
        const { principal } = this.props.accessAccount;
        const { semester, subjects, selectSubs } = this.state;
        const { classes, handleSubmit, mentoCareerList, mentiCareerList, saveStatus, deleteStatus } = this.props;
        const { model } = this.props.applyModel;

        if(model !== null && model !== ''){
            this.props.change('mento', principal.identity);
            this.props.change('subjects', selectSubs);
        }

        let mentoCareers = mentoCareerList.careers.length > 0 ?
            mentoCareerList.careers.map((career, idx) =>
                <tr key={`mento_${idx}`}>
                    <td>{career.semester && career.semester.name}</td>
                    <td>{career.name}</td>
                    <td>{career.appPerson} / {career.limPerson}</td>
                    <td>{career.subjects.map(subject => <span className="w3-tag w3-round-large w3-orange">{subject.name}</span>)}</td>
                    <td className={career.status === 'LOADING' ? '' : career.status === 'PERMIT' ? 'w3-pale-green' : 'w3-pale-red'}>{career.status === 'LOADING' ? '확인 중' : career.status === 'PERMIT' ? '허가' : '반려'}</td>
                </tr>
            ) :
            <tr>
                <td colSpan="5">멘토를 신청한 내역이 없습니다.</td>
            </tr>

        let mentiCareers = mentiCareerList.careers.length > 0 ?
            mentiCareerList.careers.map((career, idx) =>
                <tr key={`mento_${idx}`}>
                    <td>{career.semester && career.semester.name}</td>
                    <td>{career.name}</td>
                    <td>{career.appPerson} / {career.limPerson}</td>
                    <td>{career.subjects.map(subject => <span className="w3-tag w3-round-large w3-orange">{subject.name}</span>)}</td>
                    <td className={career.status === 'LOADING' ? '' : career.status === 'PERMIT' ? 'w3-pale-green' : 'w3-pale-red'}>{career.status === 'LOADING' ? '확인 중' : career.status === 'PERMIT' ? '허가' : '반려'}</td>
                </tr>
            ) :
            <tr>
                <td colSpan="5">멘티를 신청한 내역이 없습니다.</td>
            </tr>

        const mentoForm =
            (model !== null && model !== '') ?
                <form className={classes.form} onSubmit={handleSubmit(validateAndApplicateMento)}>
                    <Grid align="center">
                        <div>
                            <Avatar className={classes.avatar}>
                                <EditIcon />
                            </Avatar>
                        </div>

                        <div>
                            <h3>{semester && semester.name} 멘토 신청 내역 수정</h3>
                            <p>이번 학기 멘토 신청 내역입니다.</p>
                            <p>멘토링 내역을 수정할 때 주제를 다시 입력해주셔야 합니다.</p>
                            <p>파일 같은 경우는 내용을 수정할 경우에만 업로드하시길 바랍니다.</p>
                        </div>
                        <br/>
                        <div>
                            <Field name="teamName" className={classes.textField} type="text"
                                   component={renderTextField} label="팀 이름" placeholder="여러분들의 재치 있는 멘토링 팀 이름을 입력하세요." />
                        </div>
                        <br/>

                        <div>
                            <Field name="person" className={classes.textField} type="text"
                                   component={renderTextField} label="멘토링 인원수" placeholder="멘토링을 운영하기 원하는 인원 수를 입력하세요." />
                        </div>
                        <br/>

                        <div>
                            <Field name="qualify" className={classes.textField} type="text"
                                   component={renderTextField} label="멘토 자격 증명" placeholder="자격 증명을 위한 과목 학점 혹은 실력 증명 이력을 입력하세요." />
                        </div>
                        <br/>

                        <div>
                            <Field name="advertise" className={classes.textField} type="text"
                                   component={renderMultiTextField} label="멘토링 홍보 및 안내" placeholder="멘토링 홍보를 위한 글 혹은 안내문을 입력하세요.(개행 가능)" />
                        </div>
                        <br/>

                        <div style={{ width : '340px'}}>
                            <label>멘토링 주제 선택</label>
                            <Select
                                value={selectSubs}
                                onChange={this.handleChange.bind(this)}
                                options={subjects.map(subject => ({ value : subject.id, label : subject.name }))}
                                isMulti
                            />
                        </div>
                        <br/>

                        <div>
                            <label>멘토링 홍보 / 안내 파일</label>
                            <p>이미지 파일(jpg, jpeg, png), PDF 파일, Word(doc, docx), 한글(hwp) 파일 등 하나의 파일만 올릴 수 있습니다.</p>
                            <Field
                                name="advFile"
                                component={renderDropzoneInput}
                                accept={"image/jpeg, image/png, image/jpg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .hwp"}
                                multiple={false}
                            />
                            <br/>
                        </div>
                        <br/>

                        <div>
                            {
                                selectSubs.length > 0 ?
                                    <Button variant="contained" type="submit" color="primary">
                                        <CheckIcon className={classes.leftIcon}/> 수정하기
                                    </Button> : <p>멘토링 주제를 선택하셔야 수정이 가능합니다.</p>
                            }

                            &nbsp;
                            <button type="button" className="w3-button w3-red w3-round-large" onClick={() => this.handleClickMentoCancel()}>
                                <RemoveIcon className={classes.leftIcon}/> 멘토 취소하기
                            </button>
                        </div>
                        <br/>
                    </Grid>
                </form>
            : null;

        if(saveStatus.message){
            alert(saveStatus.message);
            this.props.history.push("/application/confirm/_refresh");
        } else if(saveStatus.error) {
            alert("멘토 정보 수정 중 오류가 발생했습니다. 홈 으로 이동 합니다.");
            this.props.history.push("/");
        }

        if(deleteStatus.message){
            alert(deleteStatus.message);
            this.props.history.push("/application/confirm/_refresh");
        } else if(deleteStatus.error) {
            alert("멘토 정보 삭제 중 오류가 발생했습니다. 홈 으로 이동 합니다.");
            this.props.history.push("/");
        }


        return (
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <FolderIcon/>
                        </Avatar>
                    </div>

                    <div>
                        <h3>SM 사업 신청 내역</h3>
                        <p>SM Mentoring 사업 신청 경력입니다.</p>
                        <p>신청 경력은 멘토와 멘티 나뉘어서 나옵니다.</p>
                    </div>
                    <br/>

                    <h2><FaceIcon /> 멘토 신청 결과 조회</h2>
                    <br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-khaki">
                                <th>학기</th>
                                <th>팀 이름</th>
                                <th>제적 인원</th>
                                <th>주제</th>
                                <th>신청 결과</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mentoCareers}
                            </tbody>
                        </table>
                    </div>
                    <br/>

                    <h2><ChildIcon /> 멘티 신청 결과 조회</h2>
                    <br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-khaki">
                                <th>학기</th>
                                <th>팀 이름</th>
                                <th>제적 인원</th>
                                <th>주제</th>
                                <th>신청 결과</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mentiCareers}
                            </tbody>
                        </table>
                    </div>
                    <br/>

                </Grid>
                <br/>
                {mentoForm}
            </div>
        )
    }
}

MentoringCareerView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'mentoUpdateForm',
    enableReinitialize : true,
    validate
})((withStyles(styles))(withRouter(MentoringCareerView)));