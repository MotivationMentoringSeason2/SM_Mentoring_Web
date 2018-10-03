import React from 'react';
import { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from './paper';

const Container = styled.div`

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
                        멘토링 메모 
          </Typography>
          <Paper/>

      </div>
      </Container>
      );
  }
}