import React from 'react';
import { Component } from 'react';
import Table from './table';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import axios from 'axios';


const Container = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: column;
  margin-right: 3%;
`;

const Title = styled.h1`
  font-size : 1em;
  margin-bottom : 1em;
  color : #000000;

`;

export default class NoticeForm extends Component {

  constructor(props) {
    super(props)
    this.state = {data: [] ,};
  }  
  
	componentDidMount() {
    function createData(id,title,writer,views,writtenDate) {

      return {id,title,writer,views,writtenDate };
    }
    
    let data = [];
    
    const url = "http://localhost:8083/";

      axios
      .get(
          url+`NoticeAPI/notice/posts?tid=1`
      )
      .then(r => {
        for(var i=0; i<r.data.length; i++){
          let a= r.data[i]; 
          let split = a.writtenDate.split('T');


         data.push( createData(a.id,a.title,a.writer,a.views,split[0]));   
        } 
        this.setState({data:data})    
      });

  }

  render() {
    
    return (
      
      <Container>
      <div >
         <Typography variant="display1" gutterBottom>
             <Title>공지사항</Title>
          </Typography>
          <Table data={this.state.data}/>;
      
      </div>
      </Container>
      );
  }
}

