import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";

import {IndexPage} from "../page/index_page";
import {SignUpdatePage} from "../page/sign_update_page";
import {TimetableEditPage} from "../page/timetable_edit_page";
import {AccountListPage} from "../page/account_list_page";
import {AccountViewPage} from "../page/account_view_page";
import {AccountExcelUploadPage} from "../page/account_excel_upload_page";
import {ProfileEditPage} from "../page/profile_edit_page";
import {NoticePage} from "../page/notice_page";
import {IntroViewPage} from "../page/intro_view_page";
import {IntroEditPage} from "../page/intro_edit_page";
import {SchedulePage} from "../page/schedule_page";
import {ScheduleEditPage} from "../page/schedule_edit_page";
import {DetailEditPage} from "../page/intro_detail_edit_page";
import {MentoApplicationPage} from "../page/mento_application_page";
import {MentoringPage} from "../page/mentoring_page";
import {NoticeEditPage} from "../page/notice_edit_page";
import {MentiApplicationPage} from "../page/menti_application_page";
import MentoringCareerViewPage from "../page/mentoring_career_view_page/MentoringCareerViewPage";
import {CardPage} from "../page/card_page";
import {MentoringOpenViewPage} from "../page/mentoring_open_view_page";

const AdminRouter = (props) => (
    <div>
        <ScrollToTop>
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
            <Route path="/notice/:id/list" component={NoticePage} />
            <Route path="/notice/:id/list/_move" render={({ match, location }) => {
                window.location.href = `/notice/${match.params.id}/list${location.search}`
                return <Redirect to={`/notice/${match.params.id}/list${location.search}`}/>
            }} />
            <Route path="/notice/view" component={CardPage} />
            <Route path="/notice/create" component={NoticeEditPage} />
            <Route path="/notice/update" component={NoticeEditPage} />
            <Route exact path="/intro/view" component={IntroViewPage} />
            <Route exact path="/intro/edit" component={IntroEditPage} />
            <Route exact path="/intro/edit/_refresh" render={() => <Redirect to="/intro/edit" />} />
            <Route path="/schedule/view" component={SchedulePage} />
            <Route exact path="/schedule/edit" component={ScheduleEditPage} />
            <Route exact path="/schedule/edit/_refresh" render={() => <Redirect to="/schedule/edit" />} />
            <Route exact path="/intro/:id/detail/edit" component={DetailEditPage} />
            <Route exact path="/intro/:id/detail/edit/_refresh" render={({ match }) => <Redirect to={`/intro/${match.params.id}/detail/edit`} />} />
            {
                (props.isStudent) ? <Route exact path="/application/mento" component={MentoApplicationPage} /> : null
            }
            {
                (props.isStudent) ? <Route exact path="/application/menti" component={MentiApplicationPage} /> : null
            }
            {
                (props.isStudent) ? <Route exact path="/application/mento_list" component={MentoringPage} /> : null
            }
            {
                (props.isStudent) ? <Route exact path="/application/menti/_refresh" render={() => <Redirect to="/application/menti" />} /> : null
            }
            {
                (props.isStudent) ? <Route exact path="/application/confirm" component={MentoringCareerViewPage} /> : null
            }
            {
                (props.isStudent) ? <Route exact path="/application/confirm/_refresh" render={() => <Redirect to="/application/confirm" />} /> : null
            }
            <Route exact path="/account/sign/edit" component={SignUpdatePage} />
            <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
            <Route exact path="/account/profile/edit" component={ProfileEditPage} />
            <Route exact path="/admin/mentoring/confirm" component={MentoringOpenViewPage} />
            <Route exact path="/admin/mentoring/confirm/_refresh" render={() => <Redirect to="/admin/mentoring/confirm" />} />
            <Route exact path="/admin/accounts/list" component={AccountListPage} />
            <Route exact path="/admin/accounts/view" component={AccountViewPage} />
            <Route exact path="/admin/excel_upload" component={AccountExcelUploadPage} />
            <Route exact path="/admin/excel_upload/_refresh" render={() => <Redirect to="/admin/excel_upload" />} />
            <Route exact path="/application/mento_list" component={MentoringPage} />
        </ScrollToTop>
    </div>
);

export default AdminRouter;