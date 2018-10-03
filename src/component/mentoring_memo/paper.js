import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';
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

class PaperSheet extends Component{
    constructor(props){
        super(props);
        this.state = { data:[], };
      }
componentDidMount(){
    axios.get(`${RESOURCE_URL}/1`).then(
        r =>{this.setState({data:r.data})
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
        <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
                {n.title}
            </Typography>
            <Typography component="p">
            {n.context}
             </Typography>
        </Paper>
        </Div>
    );
})}
    </div>
  );
}
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);