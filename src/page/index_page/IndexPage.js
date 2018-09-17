import React from 'react';
import {NoticeFormContainer} from "../../container";
import styled from 'styled-components';

const Notice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
//   flex-direction: column;
`;

const IndexPage = () =>
    <div>
         <Notice> <NoticeFormContainer /> <NoticeFormContainer /></Notice>

    </div>

export default IndexPage;