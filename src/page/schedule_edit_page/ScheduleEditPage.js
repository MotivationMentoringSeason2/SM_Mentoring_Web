import React from 'react';
import ScheduleEditFormContainer from '../../container/ScheduleEditFormContainer';
import SKHUImage from '../../resource_image/skhu_photo.png';

const ScheduleEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ScheduleEditFormContainer />
    </div>
)

export default ScheduleEditPage;