import React from 'react';
import {NoticeFormContainer, ScheduleFormContainer} from "../../container";
import styled from 'styled-components';
import SKHUImage from '../../resource_image/skhu_photo.png';
const Notice = styled.div`
  display: flex;
  width : 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IndexPage = () =>
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <div className="w3-row">
            <div className="w3-half">
                 <NoticeFormContainer indexed={true} />
            </div>
            <div className="w3-half">
                <ScheduleFormContainer />
            </div>
        </div>
    </div>

export default IndexPage;