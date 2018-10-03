import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import AdminReportListViewContainer from '../../container/AdminReportListViewContainer';

const AdminReportListViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <AdminReportListViewContainer />
    </div>
)

export default AdminReportListViewPage;