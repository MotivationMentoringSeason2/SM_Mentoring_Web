import React from 'react';
import {NoticeFormContainer} from "../../container";
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
const Notice = styled.div`
  display: flex;
  width : 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IndexPage = () =>
    <div>
        <Grid item md={6}>
             <NoticeFormContainer indexed={true} />
        </Grid>
    </div>

export default IndexPage;