import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";

import {IndexPage} from "../page/index_page";
import {SignUpdatePage} from "../page/sign_update_page";
import {TimetableEditPage} from "../page/timetable_edit_page";
import {ProfileEditPage} from "../page/profile_edit_page";
import {NoticePage} from "../page/notice_page";
import {IntroViewPage} from "../page/intro_view_page";
import {NoticeEditPage} from "../page/notice_edit_page";

const MentoRouter = (props) => {
    return(
        <div>
            <ScrollToTop>
                <Route exact path="/login" render={() => <Redirect to="/" />} />
                <Route exact path="/" component={IndexPage} />
                <Route path="/notice/:id/list" component={NoticePage} />
                <Route path="/notice/:id/list/_move" render={({ match, location }) => {
                    window.location.href = `/notice/${match.params.id}/list${location.search}`
                    return <Redirect to={`/notice/${match.params.id}/list${location.search}`}/>
                }} />
                <Route path="/notice/create" component={NoticeEditPage} />
                <Route path="/notice/update" component={NoticeEditPage} />
                <Route exact path="/intro/view" component={IntroViewPage} />
                <Route exact path="/account/sign/edit" component={SignUpdatePage} />
                <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
                <Route exact path="/account/profile/edit" component={ProfileEditPage} />
            </ScrollToTop>
        </div>
    );
};

export default MentoRouter;