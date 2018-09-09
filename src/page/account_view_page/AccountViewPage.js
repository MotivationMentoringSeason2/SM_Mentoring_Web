import React from 'react';
import {AccountViewContainer} from "../../container";
import SKHUImage from "../../resource_image/skhu_photo.png";

const AccountViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <AccountViewContainer />
    </div>
)

export default AccountViewPage;