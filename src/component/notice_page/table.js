import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './table.css';
import axios from 'axios';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};


function handleClick(e) {

    e.preventDefault();
    window.location.replace("http://localhost:3000/card?"+e.target.parentNode.id);
  
  }


function SimpleTable(props) {
  const { classes } = props;
    // data.push(props.data);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> 제목 </TableCell>
            <TableCell numeric>날짜 </TableCell>
            <TableCell numeric> 작성자 </TableCell>
            <TableCell numeric>조회수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {props.data.map(n => {
            return (
       
              <TableRow key={n.id} onClick={handleClick} id={n.id}>
           
                <TableCell component="th" scope="row">
                  {n.title}
                </TableCell>
                <TableCell numeric>{n.title}</TableCell>
                <TableCell numeric>{n.writer}</TableCell>
                <TableCell numeric>{n.views}</TableCell>
                
              </TableRow>  
          
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);