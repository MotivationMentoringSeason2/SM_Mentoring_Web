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

// function createData(id,title,writer,views) {

//   return {id,title,writer,views };
// }

let data = [];
function createData(id,title,writer,views) {

  return {id,title,writer,views };
}

function NoticeAxios(){
  axios
  .get(
      `http://localhost:8083/NoticeAPI/notice/posts?tid=1`
  )
  .then(r => {
    for(var i=0; i<r.data.length; i++){
      let a= r.data[i]; 
   data.push( createData(a.id,a.title,a.writer,a.views));
    }
  });
}

NoticeAxios();

console.log(data);

function handleClick(e) {
    e.preventDefault();
    window.location.replace("http://localhost:3000/card");
  }


function SimpleTable(props) {
  const { classes } = props;
  
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

          
          {data.map(n => {
            return (
       
              <TableRow key={n.id} onClick={handleClick} >
           
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