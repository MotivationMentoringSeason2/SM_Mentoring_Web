import React from 'react';
import { Component } from 'react';
import Card from './card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class CardForm extends Component {
  render() {
    const { principal } = this.props.accessAccount;
    return (
      <Container>
      <div>
        <Typography variant="display1" gutterBottom>
        </Typography>
        <Card viewer={principal && principal.identity}/>
      </div>
      </Container>
      );
  }
}

export default withRouter(CardForm);