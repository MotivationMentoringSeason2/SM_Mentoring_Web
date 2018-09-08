import React, {Component} from 'react';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import {renderTextField, renderSelectField } from "../form_render";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SearchIcon from '@material-ui/icons/Search';

const ADMIN_ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/admin';
const ROLE_OPTIONS = [{value : 1, label : '학생'}, {value : 2, label : '교수'}, {value : 3, label : '직원'}];

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

const validateAndSearchAccountList = (value, dispatch) => {
    console.log(value);
}

class AccountTable extends Component{
    constructor(props){
        super(props);
        this.state = { orderBy : [], searchBy : [] };
    }
    componentWillMount(){

    }
    componentDidMount(){
        let accessToken = localStorage.getItem('jwtToken');
        if(!accessToken || accessToken === '') return;
        axios({
            url: `${ADMIN_ROOT_URL}/account/options/search_by`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'get'
        }).then(response => this.setState({ searchBy : response.data }));

        axios({
            url: `${ADMIN_ROOT_URL}/account/options/order_by`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'get'
        }).then(response => this.setState({ orderBy : response.data }));
    }
    componentWillUnmount(){

    }
    render(){
        const { classes, handleSubmit } = this.props;
        const { searchBy, orderBy } = this.state;

        return (
            <div>
                <form onSubmit={handleSubmit(validateAndSearchAccountList)} className={classes.form}>
                    <Grid align="center">
                        <hr/>
                        <div>
                            <Avatar className={classes.avatar}>
                                <AssignmentIndIcon />
                            </Avatar>
                        </div>
                        <div>
                            <h3>회원 관리</h3>
                            <p>관리자는 회원 정보를 관리할 수 있습니다.</p>
                            <p>관리자는 학과 별 회장, 교수, 직원들에 해당됩니다.</p>
                            <p>그리고 학생 회장 여부 설정은 관리자만 진행할 수 있습니다.</p>
                        </div>
                        <br/>
                        <div className="w3-center">
                            <div className="w3-bar">
                                <div className="w3-bar-item">
                                    <Field name="sb" component={renderSelectField} children={ searchBy.map((sb) => <option value={`search_${sb.value}`}>{sb.label}</option>) } label="검색어 기준" />
                                </div>
                                <div className="w3-bar-item">
                                    <Field name="ob" component={renderSelectField} children={ orderBy.map((ob) => <option key={`order_${ob.value}`} value={ob.value}>{ob.label}</option>) } label="정렬 기준" />
                                </div>
                                <div className="w3-bar-item">
                                    <Field name="tb" type="text" component={renderSelectField} children={ ROLE_OPTIONS.map((tb) => <option key={`type_${tb.value}`} value={tb.value}>{tb.label}</option>) } label="권한 기준" />
                                </div>
                            </div>
                        </div>
                        <div className="w3-center">
                            <div className="w3-bar">
                                <div className="w3-bar-item">
                                    <Field name="st" className={classes.textField} type="text" component={renderTextField} label="검색" placeholder="검색 내용을 입력하세요." />
                                </div>
                                <div className="w3-bar-item">
                                    <Button variant="contained" type="submit" color="primary">
                                        <SearchIcon className={classes.leftIcon} /> 검색하기
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </Grid>
                </form>
                <br/>
                <Grid align="center">
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <tr className="w3-teal">
                                <th>No.</th>
                                <th>{ window.innerWidth <= 425 ? 'ID' : '회원 아이디'}</th>
                                <th>{ window.innerWidth <= 425 ? '이름' : '회원 이름'}</th>
                                <th>{ window.innerWidth <= 425 ? '권한' : '회원 권한'}</th>
                                { window.innerWidth <= 425 ? null : <th>소속 / 담당 학과</th> }
                            </tr>
                        </table>
                    </div>
                </Grid>
                <br/>
                <div className="w3-center">
                    
                </div>
            </div>
        )
    }
}

AccountTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'searchForm',
    enableReinitialize : true
})((withStyles(styles))(withRouter(AccountTable)));