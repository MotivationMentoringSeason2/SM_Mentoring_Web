import React from 'react';
import { Component } from 'react';
import Table from './table';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size : 1em;
  margin-bottom : 1em;
  color : #000000;
`;

class NoticeForm extends Component {
	componentDidMount() {
        let pagination = queryString.parse(this.props.location.search);
        let newPaginationModel = {
            pg : pagination && (pagination.pg || 1),
            sb : pagination && (pagination.sb || 0),
            ob : pagination && (pagination.ob || 0),
            tid : pagination && (pagination.tid || 1),
            sz : pagination && (pagination.sz || 5),
            st : pagination && (pagination.st || ''),
        };
        this.props.fetchPostList(newPaginationModel);
    }

    componentWillUnmount(){
        this.props.resetFetchPostList();
    }

    render() {
	    const { indexed } = this.props;
        const { pagination, posts } = this.props.postList;
        return (
            <Container>
                <Typography variant="display1" gutterBottom>
                    <Title>공지사항</Title>
                </Typography>
                <Table indexed={indexed} data={posts} pagination={pagination} />
            </Container>
        );
    }
}

export default withRouter(NoticeForm);