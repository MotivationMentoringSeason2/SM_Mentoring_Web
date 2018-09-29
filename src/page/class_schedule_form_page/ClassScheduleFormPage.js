import React from 'react';
import ClassScheduleFormContainer from '../../container/ClassScheduleFormContainer';
import SKHUImage from "../../resource_image/skhu_photo.png";

const ClassScheduleFormPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ClassScheduleFormContainer />
    </div>
);

export default ClassScheduleFormPage;