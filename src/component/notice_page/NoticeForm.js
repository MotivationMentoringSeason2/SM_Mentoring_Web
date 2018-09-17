import React from 'react';
import { Component } from 'react';
import Table from './table';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

const Container = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: column;
  margin-right: 3%;
`;

const Title = styled.h1`
  font-size : 1em;
  margin-bottom : 1em;
  color : #000000;
`;

const NOTICE_URL = 'http://localhost:8083/NoticeAPI';

class NoticeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], typeName : '', query : ''};
    }
  
	componentDidMount() {
        let data = [];
        const {id} = queryString.parse(this.props.location.search);
        function createData(id,title,writer,views) {
            return {
                id : id,
                title : title,
                writer : writer,
                views : views
            };
        }
        axios.get(`${NOTICE_URL}/notice/posts?tid=${id === undefined ? 1 : id}`).then(r => {
            for(var i=0; i<r.data.length; i++){
                let a= r.data[i];
                data.push(createData(a.id,a.title,a.writer,a.views));
            }
            this.setState({
                data : data
            });
        });
        axios.get(`${NOTICE_URL}/notice/type/${id === undefined ? 1 : id}`).then(r => {
            const {name} = r && ( r.data || '' );
            this.setState({
                typeName : name
            });
        });
    }

    render() {
        const {typeName, data} = this.state;
        return (
            <Container>
                <div>
                    <Typography variant="display1" gutterBottom>
                        <Title>{typeName}</Title>
                    </Typography>
                    <Table data={data}/>
                </div>
            </Container>
        );
    }
}

export default withRouter(NoticeForm);