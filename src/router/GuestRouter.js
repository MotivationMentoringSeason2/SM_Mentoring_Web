import React from 'react';
import {Route} from 'react-router-dom';
import {IndexPage} from "../page/index_page";

const GuestRouter = () => (
    <div>
        <Route exact path="/" render={() => IndexPage()} />
        <Route path="/notice/list" render={() => <div><br/><br/>공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 v</div>} />
    </div>
);

export default GuestRouter;