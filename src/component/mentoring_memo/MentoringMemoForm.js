import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Paper from './paper';
import {MENTO_URL} from "../../action/distribute_urls";

const Container = styled.div`

`;
// const createMemo = (value, dispatch) => {
//   value.teamId= 1;
//   value.name=this.props.accessAccount.principal.name;
//   return dispatch(memoPostProcess(value))
// }


const Post = styled.div`
    padding: 3em 1em;
`;
const RESOURCE_URL = `${MENTO_URL}/stickyNote`;

export default class MentoringMemoForm extends Component {

  constructor(props){
    super(props);

  }

  render() {

    console.log(this.props.accessAccount.principal.name);
    const { classes } = this.props;
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
