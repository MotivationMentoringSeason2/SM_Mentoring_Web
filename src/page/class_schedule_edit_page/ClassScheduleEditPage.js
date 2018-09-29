import React from 'react';
import ClassScheduleEditContainer from '../../container/ClassScheduleEditContainer';
import SKHUImage from "../../resource_image/skhu_photo.png";

const ClassScheduleEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ClassScheduleEditContainer />
    </div>
);

export default ClassScheduleEditPage;