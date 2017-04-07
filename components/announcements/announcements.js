import React, { PropTypes } from 'react';
import Announcement from './announcement';

const Announcements = (props) => {
    return (
        <article className="dashboard">
            {
                props.announcements.map((v, i) => {
                    return (
                        <Announcement
                            key={ i }
                            announcement={ v }
                            toggleParticipation={ props.toggleParticipation }
                        />
                    );
                })
            }
        </article>
    );
}

Announcements.propTypes = {
    announcements: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        reporter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }).isRequired,
        isAnnouncement: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        attachments: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired,
            mimetype: PropTypes.string.isRequired
        }).isRequired),
        participants: PropTypes.arrayOf(PropTypes.string.isRequired)
    })).isRequired,

    toggleParticipation: PropTypes.func.isRequired
}

export default Announcements;
