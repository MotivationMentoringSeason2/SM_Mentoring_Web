import React from 'react';
import { Component } from 'react';
import Card from './card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size : 1em;
  margin-bottom : 1em;
  color : #000000;
`;

export default class MentoringMemoForm extends Component {

  render() {
    
    return (
      
      <Container>
      <div >
         <Typography variant="display1" gutterBottom>
                        멘토링 방 목록 
          </Typography>
        
      <Card /><Card /><Card /><Card />
      </div>
      </Container>
      );
  }
}