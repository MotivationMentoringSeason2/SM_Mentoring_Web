import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import{ memoPostProcess} from "../../action/action_memo";
import {reduxForm, Field, SubmissionError} from 'redux-form';
const RESOURCE_URL = 'http://127.0.0.1:8082/MentoAPI/stickyNote';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

});



const Div = styled.div`
    padding: 0.25em 1em;
`;
const Post = styled.div`
    padding: 3em 1em;
`;



class PaperSheet extends Component{
    constructor(props){
        super(props);
        this.state = { data:[], teamId:0,};
      }
     
      createMemo(values){
        values.writer = this.props.accessAccount.principal.name;
        values.teamId= this.state.teamId;
        axios.post(`${RESOURCE_URL}/create`,values)
        .then();
    
      }
componentDidMount(){
    const identity =this.props.accessAccount.principal.identity;
    axios.get(`${RESOURCE_URL}/identity/${identity}`).then(
        n=> {
            this.setState({teamId:n.data.teamId})
        if(n.data.teamId===0){
        }
        else{
        axios.get(`${RESOURCE_URL}/${n.data.teamId}`).then(
            r =>{this.setState({data:r.data})          
            }     
        )}
            }   
    )
}




render(){
  const { classes } = this.props;

  return(
    <div>

     {this.state.data.map(n => {
    return (
        <Div>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h4">
                {n.writer}
            </Typography>
            <br/>
            <Typography component="p">
            {n.context}
             </Typography>
        </Paper>
        </Div>
    );
})}

<Post>
    <form onSubmit={this.createMemo.bind(this)} >
<Grid container spacing={24}>
<Grid item xs={12} sm={10}>
          <TextField
            required
            id="context"
            name="context"
            label="내용을 적으세요"
            fullWidth
            autoComplete="내용"
          />
      
        </Grid>
     <Button variant="contained" color="primary" className={classes.button} type="submit">
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
      </Grid>
      </form>
</Post>
    </div>
  );
}
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'stickyNoteModel'

})(withStyles(styles)(PaperSheet));