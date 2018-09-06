import React from 'react';
import {FindIdentityFormContainer} from "../../container";
import SKHUImage from "../../resource_image/skhu_photo.png";

const FindIdentityPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <FindIdentityFormContainer />
    </div>
);

export default FindIdentityPage;
