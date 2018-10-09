import React, {Component} from 'react';

import axios from 'axios';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import {renderTextField, renderSelectField } from "../form_render";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SearchIcon from '@material-ui/icons/Search';
import {ACCOUNT_URL} from "../../action/distribute_urls";

const ADMIN_ROOT_URL = `${ACCOUNT_URL}/admin`;
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

class AccountTable extends Component{
    constructor(props){
        super(props);
        this.state = { orderBy : [], searchBy : [] };
    }

    componentWillMount(){
        let pagination = queryString.parse(this.props.location.search);
        let newPaginationModel = {
            pg : pagination && (pagination.pg || 1),
            sb : pagination && (pagination.sb || 0),
            ob : pagination && (pagination.ob || 0),
            tb : pagination && (pagination.tb || 0),
            sz : pagination && (pagination.sz || 10),
            st : pagination && (pagination.st || ''),
        };
        this.props.fetchAccountList(newPaginationModel);
        this.handleInitialize(newPaginationModel);
    }

    handleInitialize(paginationModel) {
        const initData = {
            sb : (paginationModel.sb === undefined) ? 0 : paginationModel.sb,
            ob : (paginationModel.ob === undefined) ? 0 : paginationModel.ob,
            tb : (paginationModel.tb === undefined) ? 0 : paginationModel.tb,
            st : (paginationModel.st === undefined) ? '' : paginationModel.st
        };
        this.props.initialize(initData);
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

    handleClickAccount(id){
        this.props.history.push({
            pathname: '/admin/accounts/view',
            search: `?id=${id}&` + this.props.location.search.replace("?", "")
        });
    }

    componentWillUnmount(){
        this.props.resetFetchAccountList();
    }

    handleSearchSubmit(event){
        this.props.resetFetchAccountList();

        const {values} = this.props.searchForm;
        event.preventDefault();

        let newPaginationModel = {
            pg : 1,
            sb : values && (values.sb || 0),
            ob : values && (values.ob || 0),
            tb : values && (values.tb || 0),
            sz : 10,
            st : values && (values.sb * 1 !== 0 ? values.st : '' || '')
        };

        this.props.history.push({
           pathname: '/admin/accounts/list',
           search: "?" + queryString.stringify(newPaginationModel)
        });

        this.props.fetchAccountList(newPaginationModel);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handlePagination(event){
        this.props.resetFetchAccountList();

        const { pagination } = this.props.accountList;
        let newPaginationModel = {
            pg : event.target.id,
            sb : pagination && (pagination.sb || 0),
            ob : pagination && (pagination.ob || 0),
            tb : pagination && (pagination.tb || 0),
            sz : pagination && (pagination.sz || 10),
            st : pagination && (pagination.st || ''),
        };

        this.props.history.push({
            pathname: '/admin/accounts/list',
            search: "?" + queryString.stringify(newPaginationModel)
        });

        this.props.fetchAccountList(newPaginationModel);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    render(){
        const { classes } = this.props;
        const { searchBy, orderBy } = this.state;
        const { pagination, accounts } = this.props.accountList;

        const pageNumbers = [];
        const barCount = 10;
        const pageCount = (pagination !== null) ? Math.ceil(pagination.requestCount / pagination.sz) : 1;
        let base = (pagination !== null) ? Math.floor((pagination.pg - 1) / 10) * 10 : 0;

        if(base > 0)
            pageNumbers.push(base);

        for (let i = 1; i <= barCount; i++) {
            let n = base + i;
            if(n > pageCount) break;
            pageNumbers.push(n);
        }

        let n = base + 11;
        if(n <= pageCount)
            pageNumbers.push(n);

        const renderPageNumbers = pageNumbers.map((number, idx) => {
            return (
                (number > base && number < base + 11) ?
                    <button className={((pagination === null) || pagination.pg === number) ? "w3-button w3-round-large w3-border w3-border-indigo w3-blue" : "w3-button w3-round-large w3-border w3-border-indigo w3-pale-blue w3-hover-blue"}
                        key={number}
                        id={number}
                        onClick={this.handlePagination.bind(this)}
                    >
                        &nbsp;{number}&nbsp;
                    </button> :
                    (idx === 0) ?
                        <button className="w3-button w3-round-large w3-border w3-border-red w3-pale-red w3-hover-pink"
                                key={number}
                                id={number}
                                onClick={this.handlePagination.bind(this)}
                        >
                            &nbsp;이전&nbsp;
                        </button> :
                        <button className="w3-button w3-round-large w3-border w3-border-red w3-pale-red w3-hover-pink"
                            key={number}
                            id={number}
                            onClick={this.handlePagination.bind(this)}
                        >
                            &nbsp;다음&nbsp;
                        </button>
            );
        });

        let accountTr = accounts.length > 0 ?
            accounts.map(account => (
                <tr key={`account_${account.id}`} className="w3-hover-pale-green" style={{ cursor : 'pointer' }} onClick={() => this.handleClickAccount(account.id)}>
                    <td>{account.id}</td>
                    <td>{account.identity}</td>
                    <td>{account.name}</td>
                    <td>{account.type}</td>
                    { window.innerWidth <= 425 ? null : <td>{account.department}</td> }
                </tr>
            )) : <tr>
                    <td colSpan={ window.innerWidth <= 425 ? 4 : 5}>현재 입력하신 검색 조건으로 나온 회원이 없습니다.</td>
                </tr>

        return (
            <div>
                <form onSubmit={this.handleSearchSubmit.bind(this)} className={classes.form}>
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
                            <p>그리고 학생 회장 설정은 교수, 직원만 진행할 수 있습니다.</p>
                        </div>
                        <br/>
                        <div className="w3-center">
                            <div className="w3-bar">
                                <div className="w3-bar-item">
                                    <Field name="sb" component={renderSelectField} children={ searchBy.map((sb) => <option key={`search_${sb.value}`} value={sb.value}>{sb.label}</option>) } label="검색어 기준" />
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
                            <thead>
                            <tr className="w3-teal">
                                <th>No.</th>
                                <th>{ window.innerWidth <= 425 ? 'ID' : '회원 아이디'}</th>
                                <th>{ window.innerWidth <= 425 ? '이름' : '회원 이름'}</th>
                                <th>{ window.innerWidth <= 425 ? '권한' : '회원 권한'}</th>
                                { window.innerWidth <= 425 ? null : <th>소속 / 담당 학과</th> }
                            </tr>
                            </thead>
                            <tbody>
                            {accountTr}
                            </tbody>
                        </table>
                    </div>
                </Grid>
                <br/>
                <div className="w3-bar w3-center">
                    {renderPageNumbers}
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