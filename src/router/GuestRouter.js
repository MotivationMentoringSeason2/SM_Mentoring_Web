import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import {LoginPage} from "../page/login_page";
import {SignPage} from "../page/sign_page"
import {NoticePage} from "../page/notice_page";
import {CardPage} from "../page/card_page";
import {FindIdentityPage} from "../page/find_identity_page";
import {FindPasswordPage} from "../page/find_password_page";
import ScrollToTop from "./ScrollToTop";
import {IntroViewPage} from "../page/intro_view_page";
import {SchedulePage} from "../page/schedule_page";
import {MentoringPage} from "../page/mentoring_page";

const GuestRouter = () => (
    <div>
        <ScrollToTop>
            <Route exact path="/account/logout" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/account/identity" component={FindIdentityPage} />
            <Route exact path="/account/password" component={FindPasswordPage} />
            <Route exact path="/sign" component={SignPage} />
            <Route path="/notice/:id/list" component={NoticePage} />
            <Route path="/notice/:id/list/_move" render={({ match, location }) => {
                window.location.href = `/notice/${match.params.id}/list${location.search}`
                return <Redirect to={`/notice/${match.params.id}/list${location.search}`}/>
            }} />
            <Route path="/notice/view" component={CardPage} />
            <Route path="/schedule/view" component={SchedulePage} />
            <Route exact path="/intro/view" component={IntroViewPage} />
            <Route exact path="/application/mento_list" component={MentoringPage} />
        </ScrollToTop>
    </div>
);

export default GuestRouter;