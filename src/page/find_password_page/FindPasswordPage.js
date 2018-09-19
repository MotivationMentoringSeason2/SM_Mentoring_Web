import React from 'react';
import {FindPasswordFormContainer} from "../../container";
import SKHUImage from "../../resource_image/skhu_photo.png";

const FindPasswordPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <FindPasswordFormContainer />
    </div>
);

export default FindPasswordPage;
