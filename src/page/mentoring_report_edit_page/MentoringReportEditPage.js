import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import ReportEditListContainer from '../../container/ReportEditListContainer';

const MentoringReportEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ReportEditListContainer />
    </div>
);
export default MentoringReportEditPage;