import React from 'react';
import {ExcelFormContainer} from "../../container";
import SKHUImage from "../../resource_image/skhu_photo.png";

const AccountExcelUploadPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ExcelFormContainer />
    </div>
);

export default AccountExcelUploadPage;