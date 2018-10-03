import React from 'react';
import ClassTimeConfirmViewContainer from "../../container/ClassTimeConfirmViewContainer";
import SKHUImage from "../../resource_image/skhu_photo.png";

const ClassTimeConfirmViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ClassTimeConfirmViewContainer/>
    </div>
);

export default ClassTimeConfirmViewPage;