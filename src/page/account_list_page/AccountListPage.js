import React from 'react';
import {AccountTableContainer} from "../../container";
import SKHUImage from "../../resource_image/skhu_photo.png";

const AccountListPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <AccountTableContainer />
    </div>
);

export default AccountListPage;