import React from 'react';
import { Component } from 'react';
import Card from './card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

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

export default class CardForm extends Component {

  render() {
    
    return (
      
      <Container>
      <div >
         <Typography variant="display1" gutterBottom>

          </Typography>
        
      <Card />
      </div>
      </Container>
      );
  }
}

