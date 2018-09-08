import React from 'react';
import {AccountTable} from "../../component/account_list_page";
import SKHUImage from "../../resource_image/skhu_photo.png";

const AccountListPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <AccountTable />
    </div>
);

export default AccountListPage;