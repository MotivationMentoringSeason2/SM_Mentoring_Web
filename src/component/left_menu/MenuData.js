import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NotificationsIcon from '@material-ui/icons/Notifications';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ChildIcon from '@material-ui/icons/ChildCare';
import FaceIcon from '@material-ui/icons/Face';
import BuildIcon from '@material-ui/icons/Build';
import KeyIcon from '@material-ui/icons/VpnKey';
import FindIcon from '@material-ui/icons/ContactSupport';
import PasswordIcon from '@material-ui/icons/FindReplace';
import PersonIcon from '@material-ui/icons/PersonAdd';

import {Link} from 'react-router-dom';

export const noticeItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="알립니다" />
        </ListItem>
        <Link to="/notice/1/list/_move?pg=1&sz=10" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="공지사항" />
            </ListItem>
        </Link>
        <Link to="/notice/2/list/_move?pg=1&sz=10" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="자유게시판" />
            </ListItem>
        </Link>
        <Link to="/notice/3/list/_move?pg=1&sz=10" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
            </ListItem>
        </Link>
    </div>
);

export const introDefaultItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="SM 소개" />
        </ListItem>
        <Link to="/intro/view" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="SM 사업이란?" />
            </ListItem>
        </Link>
        <Link to="/schedule/view" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="일정 확인" />
            </ListItem>
        </Link>
        <Link to="/application/mento_list" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘토링 목록" />
            </ListItem>
        </Link>
    </div>
);

export const introAdminItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="SM 소개" />
        </ListItem>
        <Link to="/intro/view" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="SM 사업이란?" />
            </ListItem>
        </Link>
        <Link to="/schedule/view" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="일정 확인" />
            </ListItem>
        </Link>
        <Link to="/application/mento_list" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘토링 목록" />
            </ListItem>
        </Link>
        <Link to="/intro/edit" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="사업문 수정" />
            </ListItem>
        </Link>
        <Link to="/schedule/edit" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="스케쥴 조정" />
            </ListItem>
        </Link>
    </div>
);

export const applicationItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="SM 신청" />
        </ListItem>
        <Link to="/application/mento" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘토 신청" />
            </ListItem>
        </Link>
        <Link to="/application/menti" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘티 신청" />
            </ListItem>
        </Link>
    </div>
);

export const mentiItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <ChildIcon />
            </ListItemIcon>
            <ListItemText primary="멘티 메뉴" />
        </ListItem>
        <Link to="/menti/class/confirm" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="수업 내역 확인" />
            </ListItem>
        </Link>
        <Link to="/menti/sticky_memo" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘토링 메모장" />
            </ListItem>
        </Link>
  
    </div>
);

export const mentoItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="멘토 메뉴" />
        </ListItem>
        <Link to="/mento/class/edit" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="수업 일정 관리" />
            </ListItem>
        </Link>
        <Link to="/mento/report/edit" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="보고서 작성 / 수정" />
            </ListItem>
        </Link>
        <Link to="/mento/sticky_memo" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘토링 메모장" />
            </ListItem>
        </Link>
      
    </div>
);

export const adminItems = (
    <div>
        <ListItem>
            <ListItemIcon>
                <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="사이트 관리" />
        </ListItem>
        <Link to="/admin/mentoring/confirm" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="멘토링 개설 / 폐쇄" />
            </ListItem>
        </Link>
        <Link to="/admin/accounts/list?pg=1" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="회원 관리" />
            </ListItem>
        </Link>
        <Link to="/admin/excel_upload" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="회원 Excel 업로드" />
            </ListItem>
        </Link>
        <Link to="/admin/report/checking" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="보고서 확인" />
            </ListItem>
        </Link>
        <Link to="/admin/semester/edit" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="학기 편집" />
            </ListItem>
        </Link>
    </div>
);

export const guestItems = (
    <div>
        <Link to="/login" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <KeyIcon />
                </ListItemIcon>
                <ListItemText primary="로그인" />
            </ListItem>
        </Link>
        <Link to="/account/identity" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <FindIcon />
                </ListItemIcon>
                <ListItemText primary="아이디 찾기" />
            </ListItem>
        </Link>
        <Link to="/account/password" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <PasswordIcon />
                </ListItemIcon>
                <ListItemText primary="비밀번호 변경" />
            </ListItem>
        </Link>
        <Link to="/sign" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="회원 가입" />
            </ListItem>
        </Link>
    </div>
);

