import React from 'react';
import { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Driver from './driver';
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

export default class ScheduleForm extends Component {

  render() {
    
    return (
      
      <Container>
      <div >
    
         <Typography variant="display1" gutterBottom>

          </Typography>
         <Driver/>
      </div>
      </Container>
      );
  }
}

