import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Driver from './driver';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class ScheduleForm extends Component {
    componentWillMount(){
        this.props.fetchCalendarList();
    }
    componentWillUnmount(){
        this.props.resetFetchCalendarList();
    }
    render() {
        const { calendars } = this.props.calendarList;
        return (
            <Container>
                <div>
                    <Typography variant="display1" gutterBottom>
                        SM 사업 일정 안내
                    </Typography>
                    <Driver schedules={calendars} />
                </div>
            </Container>
        );
    }
}
export default ScheduleForm;

