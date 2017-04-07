import React from 'react';
import { connect } from 'react-redux';
import Announcements from './announcements';
import { toggleParticipation } from '../../routes/main/modules';

const mapPropsToState = (state) => {
    return {
        announcements: state.main.announcements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleParticipation: (announcementId, currentUser) =>
            dispatch(toggleParticipation(announcementId, currentUser))
    };
};

const AnnouncementsContainer = connect(
    mapPropsToState,
    mapDispatchToProps
)(Announcements);

export default AnnouncementsContainer;
