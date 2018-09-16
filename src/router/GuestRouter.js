import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import {LoginPage} from "../page/login_page";
import {SignPage} from "../page/sign_page"
import {NoticePage} from "../page/notice_page";
import {CardPage} from "../page/card_page";
import {FindIdentityPage} from "../page/find_identity_page";
import ScrollToTop from "./ScrollToTop";


const GuestRouter = () => (
    <div>
        <ScrollToTop>
            <Route exact path="/account/logout" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/account/identity" component={FindIdentityPage} />
            <Route exact path="/sign" component={SignPage} />
            <Route path="/notice/list" component={NoticePage} />
            <Route path="/card" component={CardPage} />
        </ScrollToTop>
    </div>
);

export default GuestRouter;