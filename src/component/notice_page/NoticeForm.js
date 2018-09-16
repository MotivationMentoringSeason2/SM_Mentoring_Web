import React from 'react';
import { Component } from 'react';
import Table from './table';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Card from './card';

const Container = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size : 1em;
  margin-bottom : 1em;
  color : #000000;

`;

export default class NoticeForm extends Component {
	componentWillMount() {
 
  }

  render() {
    
    return (
      
      <Container>
      <div >
         <Typography variant="display1" gutterBottom>
             <Title>공지사항</Title>
          </Typography>
        
      <Table/>
      </div>
      </Container>
      );
  }
}

