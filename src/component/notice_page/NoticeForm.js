import React from 'react';
import { Component } from 'react';
import Table from './table';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from "@material-ui/core/styles/index";
import {renderTextField, renderSelectField } from "../form_render";

import SearchIcon from '@material-ui/icons/Search';

import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size : 1em;
  color : #000000;
`;

const NOTICE_URL = 'http://localhost:8083/NoticeAPI/notice';

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: (window.innerWidth >= 450) ? 420 : 300,
    }
});

class NoticeForm extends Component {
    constructor(props){
        super(props);
        this.state = { typeName : '', orderBy : [], searchBy : [] };
    }

    componentWillMount(){
        axios({
            url : `${NOTICE_URL}/type/${this.props.match.params.id || 1}`,
            method : 'get'
        }).then(response => this.setState({ typeName : response.data.name}))

        axios({
            url: `${NOTICE_URL}/options/sb_elements`,
            method: 'get'
        }).then(response => this.setState({ searchBy : response.data }));

        axios({
            url: `${NOTICE_URL}/options/ob_elements`,
            method: 'get'
        }).then(response => this.setState({ orderBy : response.data }));
    }

    componentDidMount() {
        this.paginationFetching();
    }

    componentWillUnmount(){
        this.props.resetFetchPostList();
    }

    paginationFetching(){
        let pagination = queryString.parse(this.props.location.search);
        let newPaginationModel = {
            pg : pagination && (pagination.pg || 1),
            sb : pagination && (pagination.sb || 0),
            ob : pagination && (pagination.ob || 0),
            tid : this.props.match.params.id !== undefined ? this.props.match.params.id : 1,
            sz : pagination && (pagination.sz || 5),
            st : pagination && (pagination.st || ''),
        };
        this.props.fetchPostList(newPaginationModel);
        this.handleInitialize(newPaginationModel)
    }

    handlePagination(event){
        this.props.resetFetchPostList();

        const { pagination } = this.props.postList;
        let newPaginationModel = {
            pg : event.target.id,
            sb : pagination && (pagination.sb || 0),
            ob : pagination && (pagination.ob || 0),
            sz : pagination && (pagination.sz || 10),
            st : pagination && (pagination.st || ''),
        };

        this.props.history.push({
            pathname: `/notice/${this.props.match.params.id}/list/_move`,
            search: "?" + queryString.stringify(newPaginationModel)
        });

        this.paginationFetching();
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handleSearchSubmit(event){
        this.props.resetFetchPostList();
        event.preventDefault();

        const {values} = this.props.searchForm;
        let newPaginationModel = {
            pg : 1,
            sb : values && (values.sb || 0),
            ob : values && (values.ob || 0),
            sz : 10,
            st : values && (values.sb * 1 !== 0 ? values.st : '' || '')
        };

        this.props.history.push({
            pathname: `/notice/${this.props.match.params.id}/list/_move`,
            search: "?" + queryString.stringify(newPaginationModel)
        });

        this.paginationFetching();
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handleInitialize(paginationModel) {
        const initData = {
            sb : (paginationModel.sb === undefined) ? 0 : paginationModel.sb,
            ob : (paginationModel.ob === undefined) ? 0 : paginationModel.ob,
            st : (paginationModel.st === undefined) ? '' : paginationModel.st
        };
        this.props.initialize(initData);
    }

    render() {
        const { searchBy, orderBy, typeName } = this.state;
	    const { indexed, classes } = this.props;
        const { pagination, posts } = this.props.postList;

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

        return (
            <Container>
                <Typography variant="display1" gutterBottom>
                    <Title>{typeName}</Title>
                </Typography>
                {
                    !indexed ?
                        <form onSubmit={this.handleSearchSubmit.bind(this)} className={classes.form}>
                            <Grid align="center">
                                <div className="w3-center">
                                    <div className="w3-bar">
                                        <div className="w3-bar-item">
                                            <Field name="sb" component={renderSelectField} children={ searchBy.map((sb) => <option key={`search_${sb.value}`} value={sb.value}>{sb.label}</option>) } label="검색어 기준" />
                                        </div>
                                        <div className="w3-bar-item">
                                            <Field name="ob" component={renderSelectField} children={ orderBy.map((ob) => <option key={`order_${ob.value}`} value={ob.value}>{ob.label}</option>) } label="정렬 기준" />
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
                        </form> : null
                }
                <Table indexed={indexed} data={posts} pagination={pagination} />
                <br/>
                {
                    !indexed ?
                        <div className="w3-bar w3-center">
                            {renderPageNumbers}
                        </div> : null
                }
            </Container>
        );
    }
}

export default reduxForm({
    form : 'searchForm',
    enableReinitialize : true
})(withStyles(styles)(withRouter(NoticeForm)));