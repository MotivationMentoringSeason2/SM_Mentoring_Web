import React from 'react';
import {ScheduleFormContainer} from "../../container";
import SKHUImage from '../../resource_image/skhu_photo.png';

const SchedulePage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ScheduleFormContainer />
    </div>
);
export default SchedulePage;