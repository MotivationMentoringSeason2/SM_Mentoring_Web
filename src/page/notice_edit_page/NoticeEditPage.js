import React from 'react';
import NoticeEditFormContainer from '../../container/NoticeEditFormContainer';
import SKHUImage from '../../resource_image/skhu_photo.png';

const NoticeEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <NoticeEditFormContainer />
    </div>
);
export default NoticeEditPage;