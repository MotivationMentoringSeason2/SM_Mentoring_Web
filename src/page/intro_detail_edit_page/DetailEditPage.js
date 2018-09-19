import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import DetailTitleListContainer from '../../container/DetailTitleListContainer';

const DetailEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <DetailTitleListContainer />
    </div>
)

export default DetailEditPage;