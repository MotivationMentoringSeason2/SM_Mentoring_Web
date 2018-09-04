import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import {LoginPage} from "../page/login_page";

const GuestRouter = () => (
    <div>
        <Route exact path="/account/logout" render={() => <Redirect to="/" />} />
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/notice/list" render={() => <div><br/><br/>공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 v</div>} />
    </div>
);

export default GuestRouter;