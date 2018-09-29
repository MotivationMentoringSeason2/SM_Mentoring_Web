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
import MentoringCareerViewPage from "../page/mentoring_career_view_page/MentoringCareerViewPage";
import {ScheduleEditPage} from "../page/schedule_edit_page";
import {AccountExcelUploadPage} from "../page/account_excel_upload_page";
import {DetailEditPage} from "../page/intro_detail_edit_page";
import {IntroEditPage} from "../page/intro_edit_page";
import {AccountListPage} from "../page/account_list_page";
import {AccountViewPage} from "../page/account_view_page";
import {SchedulePage} from "../page/schedule_page";
import {CardPage} from "../page/card_page";

const MentiRouter = (props) => {
    return (
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
                <Route path="/schedule/view" component={SchedulePage} />
                <Route exact path="/account/sign/edit" component={SignUpdatePage} />
                <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
                <Route exact path="/account/profile/edit" component={ProfileEditPage} />
                <Route exact path="/application/confirm" component={MentoringCareerViewPage} />
                <Route exact path="/application/confirm/_refresh" render={() => <Redirect to="/application/confirm" />} />
                {
                    (props.isChairman) ? <Route exact path="/intro/edit" component={IntroEditPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/intro/edit/_refresh" render={() => <Redirect to="/intro/edit" />} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/schedule/edit" component={ScheduleEditPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/schedule/edit/_refresh" render={() => <Redirect to="/schedule/edit" />} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/intro/:id/detail/edit" component={DetailEditPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/intro/:id/detail/edit/_refresh" render={({ match }) => <Redirect to={`/intro/${match.params.id}/detail/edit`} />} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/accounts/list" component={AccountListPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/accounts/view" component={AccountViewPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/excel_upload" component={AccountExcelUploadPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/excel_upload/_refresh" render={() => <Redirect to="/admin/excel_upload" />} /> : null
                }
            </ScrollToTop>
        </div>
    );
}

export default MentiRouter;