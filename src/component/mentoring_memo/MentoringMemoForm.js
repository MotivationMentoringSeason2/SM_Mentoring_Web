import React from 'react';
import { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from './paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
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