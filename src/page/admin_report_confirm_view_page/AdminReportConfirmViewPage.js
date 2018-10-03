import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import AdminReportConfirmViewContainer from '../../container/AdminReportConfirmViewContainer';

const AdminReportConfirmViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <AdminReportConfirmViewContainer />
    </div>
)

export default AdminReportConfirmViewPage;