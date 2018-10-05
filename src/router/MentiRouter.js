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
import {MentoringOpenViewPage} from "../page/mentoring_open_view_page";
import {MentoringPage} from "../page/mentoring_page";

import {ReportSelectViewPage} from "../page/mentoring_report_confirm_page";
import {AdminReportListViewPage} from "../page/admin_report_list_view_page";
import {AdminReportConfirmViewPage} from "../page/admin_report_confirm_view_page";

import {MentoringMemoPage} from "../page/mentoring_memo";

import {ClassTimeConfirmViewPage} from "../page/class_time_confirm_view_page";
import {SemesterEditPage} from "../page/semester_edit_page";

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
                <Route exact path="/application/mento_list" component={MentoringPage} />

                <Route exact path="/menti/sticky_memo" component={MentoringMemoPage} />

                <Route exact path="/menti/class/confirm" component={ClassTimeConfirmViewPage} />

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
                    (props.isChairman) ? <Route exact path="/admin/mentoring/confirm" component={MentoringOpenViewPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/mentoring/confirm/_refresh" render={() => <Redirect to="/admin/mentoring/confirm" />} /> : null
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
                {
                    (props.isChairman) ? <Route exact path="/admin/report/checking" component={ReportSelectViewPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/report/list/:id" component={AdminReportListViewPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/report/:teamId/confirm/:reportId" component={AdminReportConfirmViewPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/semester/edit" component={SemesterEditPage} /> : null
                }
                {
                    (props.isChairman) ? <Route exact path="/admin/semester/edit/_refresh" render={() => <Redirect to="/admin/semester/edit" />} /> : null
                }
            </ScrollToTop>
        </div>
    );
}

export default MentiRouter;