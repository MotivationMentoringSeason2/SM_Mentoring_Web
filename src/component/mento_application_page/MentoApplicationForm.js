import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import FaceIcon from '@material-ui/icons/Face';
import CheckIcon from '@material-ui/icons/Check';

import {
    renderTextField, renderMultiTextField, renderDropzoneInput
} from "../form_render";

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

class MentoApplicationForm extends Component {
    constructor(props){
        super(props);
        this.state = { semester : null, subjects : [], selectSubs : [] }
    }
    componentWillMount(){
        const { principal } = this.props.accessAccount;
        this.props.fetchTimetable(principal.identity);
    }
    componentDidMount(){
        axios.get(`${RESOURCE_URL}/semester/current`).then(response => this.setState({ semester : response.data }));
        axios.get(`${RESOURCE_URL}/subjects`).then(response => this.setState({ subjects : response.data }));
    }
    componentWillUnmount(){
        this.props.resetFetchTimetable();
    }

    handleChange(event) {
        this.setState({ selectSubs : event });
    }

    render() {
        const { semester, subjects, selectSubs } = this.state;
        const { timetableElements } = this.props.accountTimetable;
        const { classes } = this.props;


        // 초기에 시간표를 불러올 때 배열의 길이가 0으로 되어 있으면 Status 에 상관 없이 이것이 뜹니다.
        // 그래서 timetableElements 변수에 월요일 9시, 9시 데이터를 임시로 넣었습니다.
        if(timetableElements.length <= 0){
            alert("시간표를 설정하지 않았습니다. 시간표 설정 페이지로 넘어갑니다.");
            this.props.history.push("/account/timetable/edit");
        }

        return (
            <form className={classes.form}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <FaceIcon/>
                        </Avatar>
                    </div>

                    <div>
                        <h3>{semester && semester.name} SM 멘토 신청</h3>
                        <p>멘토를 신청할 수 있는 페이지 입니다.</p>
                        <p>멘토를 신청하기 전에 가능한 시간표를 설정하셔야 원활한 진행이 가능합니다.</p>
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
                        <p>이미지 파일(jpg, jpeg, png), PDF 파일, Word(doc, docx), 한글(hwp) 파일 등만 올릴 수 있습니다.</p>
                        <Field
                            name="advFile"
                            component={renderDropzoneInput}
                            accept={"image/jpeg, image/png, image/jpg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .hwp"}
                        />
                        <br/>
                    </div>
                    <br/>

                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon}/> 신청하기
                        </Button>
                    </div>
                </Grid>
            </form>
        )
    }
}

MentoApplicationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'mentoCreateForm'
})((withStyles(styles))(withRouter(MentoApplicationForm)));