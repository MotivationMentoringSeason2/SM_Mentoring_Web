import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import ReportSelectViewContainer from '../../container/ReportSelectViewContainer';

const ReportSelectViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ReportSelectViewContainer />
    </div>
);

export default ReportSelectViewPage;