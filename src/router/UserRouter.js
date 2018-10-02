import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import {IndexPage} from "../page/index_page";
import {SignUpdatePage} from "../page/sign_update_page";
import {TimetableEditPage} from "../page/timetable_edit_page";
import {ProfileEditPage} from "../page/profile_edit_page";
import {NoticePage} from "../page/notice_page";
import {IntroViewPage} from "../page/intro_view_page";
import {MentoApplicationPage} from "../page/mento_application_page";
import {MentoringPage} from "../page/mentoring_page";
import {NoticeEditPage} from "../page/notice_edit_page";
import MentiApplicationPage from "../page/menti_application_page/MentiApplicationPage";
import MentoringCareerViewPage from "../page/mentoring_career_view_page/MentoringCareerViewPage";
import {SchedulePage} from "../page/schedule_page";
import {CardPage} from "../page/card_page";
import {MentoringMemoPage} from "../page/mentoring_memo";

const UserRouter = () => (
    <div>
        <ScrollToTop>
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/notice/:id/list" component={NoticePage} />
            <Route exact path="/notice/:id/list/_move" render={({ match, location }) => {
                window.location.href = `/notice/${match.params.id}/list${location.search}`
                return <Redirect to={`/notice/${match.params.id}/list${location.search}`}/>
            }} />
            <Route exact path="/notice/create" component={NoticeEditPage} />
            <Route exact path="/notice/update" component={NoticeEditPage} />
            <Route exact path="/notice/view" component={CardPage} />
            <Route exact path="/intro/view" component={IntroViewPage} />
            <Route exact path="/schedule/view" component={SchedulePage} />
            <Route exact path="/account/sign/edit" component={SignUpdatePage} />
            <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
            <Route exact path="/account/profile/edit" component={ProfileEditPage} />
            <Route exact path="/application/mento" component={MentoApplicationPage} />
            <Route exact path="/application/menti" component={MentiApplicationPage} />
            <Route exact path="/application/menti/_refresh" render={() => <Redirect to="/application/menti" />} />
            <Route exact path="/application/mento_list" component={MentoringPage} />
            <Route exact path="/application/confirm" component={MentoringCareerViewPage} />
            <Route exact path="/application/confirm/_refresh" render={() => <Redirect to="/application/confirm" />} />
            <Route exact path="/mento/sticty_memo" component={MentoringMemoPage} />
        </ScrollToTop>
    </div>
);

export default UserRouter;