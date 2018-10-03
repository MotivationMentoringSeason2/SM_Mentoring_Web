import React from 'react';
import SemesterListViewContainer from '../../container/SemesterListViewContainer';
import SKHUImage from '../../resource_image/skhu_photo.png';

const SemesterEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <SemesterListViewContainer />
    </div>
);

export default SemesterEditPage;