import React, {Component} from 'react';
import SKHUImg from '../../resource_image/skhuniv.jpg';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/LocalPrintshop';
const FooterContext = () => (
    <div className="w3-row w3-padding w3-white">
        <div className="w3-quarter w3-center">
            <br/><br/>
            <img src={SKHUImg} width="60%" />
        </div>
        <div className="w3-threequarter w3-left-align">
            <h6>08359 서울시 구로구 연동로 320 / 지하철 1, 7호선 온수역(성공회대입구역)</h6>
            <h6><PhoneIcon /> TEL : 02 - 2610 - 4114 &nbsp;&nbsp;|&nbsp;&nbsp; <PrintIcon /> FAX : 02 - 2683 - 8858</h6>
            <h7>COPYRIGHT (C) 2018 SUNGKONGHOE UNIVERSITY. SOFTWARE ENGINEERING DEPT. ALL RIGHTS RESERVED.</h7>
        </div>
    </div>
);
export default FooterContext;