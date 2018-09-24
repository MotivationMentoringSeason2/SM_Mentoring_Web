import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './table.css';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const RESOURCE_URL = 'http://127.0.0.1:8081/AccountAPI/resource';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: window.innerWidth > 450 ? 800 : 320,
  },
  tableIndexed : {
    minWidth : window.innerWidth > 450 ? 600 : 320
  }
});

class SimpleTable extends Component {
  constructor(props){
    super(props);
    this.state = { data : props.data, pagination : props.pagination };
  }
  componentWillReceiveProps(nextProps){
    const { pagination } = this.state;
    if(this.state.data !== nextProps.data || pagination !== nextProps.pagination){
      nextProps.data.map((post, idx) => {
        axios.get(`${RESOURCE_URL}/account/name/${post.writer}`).then(response => {
          const { data } = this.state;
          let tmpArray = data.slice();
          let id = -1;
          for(var k=0;k<tmpArray.length;k++){
            if(tmpArray[k].id === post.id){
              id = k;
              break;
            }
          }
          post = {
              ...post,
              writer : response.data
          }
          tmpArray.splice(k, 1, post);
          this.setState({
              data : tmpArray
          });
        });
      });
      this.setState({
          data : nextProps.data,
          pagination : nextProps.pagination
      });
    }
  }
  render() {
    const { classes, indexed } = this.props;
    const { data, pagination } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={indexed ? classes.tableIndexed : classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>작성자</TableCell>
              <TableCell numeric>날짜</TableCell>
              <TableCell numeric>제목</TableCell>
              <TableCell numeric>조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id} onClick={() => (!indexed ? this.props.history.push(`/notice/view?id=${n.id}&${pagination.queryString}`) : this.props.history.push(`/notice/view?id=${n.id}&tid=1&sz=10&pg=1`))} id={n.id}>
                  <TableCell component="th" scope="row">
                      {n.writer}
                  </TableCell>
                  <TableCell numeric>{n.writtenDate}</TableCell>
                  <TableCell numeric>{n.title}</TableCell>
                  <TableCell numeric>{n.views}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleTable));