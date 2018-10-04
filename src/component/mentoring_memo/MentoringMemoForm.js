import React from 'react';
import { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from './paper';

const Container = styled.div`

`;



export default class MentoringMemoForm extends Component {

  render() {
    console.log(this.props.accessAccount);
    const accessAccount = this.props.accessAccount;
    return (
      
      <Container>
      <div >
         <Typography variant="display1" gutterBottom>
                        멘토링 메모 
          </Typography>
          <Paper accessAccount={accessAccount}/>


      </div>
      </Container>
      );
  }
}