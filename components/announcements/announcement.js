import React, {PropTypes, Component} from 'react';
import Attachment from './attachment';
import Participant from './participant';

const _msPerDay = 1000 * 60 * 60 * 24;
const _msPerMinute = 1000 * 60;
const _msPerHour = 60;

// a and b are javascript Date objects
const dateDiff = (a, b) => {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());

    return utc2 - utc1;
};

const prepareDateString = (diff) => {
    const totalMinutes = diff / _msPerMinute;
    const hours = Math.floor(totalMinutes / _msPerHour);
    const leftMinutes = totalMinutes - hours * _msPerHour;

    return `${hours} годин ${leftMinutes} хвилин тому`;
}

const calcWhen = (date) => {
    const now = new Date();
    const when = new Date(date);
    const diff = dateDiff(when, now);

    if (diff < 1) {
        return 'Це неможливо';
    }

    // if event is created more than a day ago
    if (diff / _msPerDay >= 1) {
        return when.toLocaleDateString();
    }

    return prepareDateString(diff);
}

export default class Announcement extends Component {
    static propTypes = {
        announcement: PropTypes.shape({
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
        }).isRequired,

        toggleParticipation: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.announcement !== nextProps.announcement;
    }

    render() {
        const {
            announcement: {
                id, title, reporter, date, attachments,
                participants, message, isAnnouncement
            }, toggleParticipation
        } = this.props;

        const descr = isAnnouncement ? '- об’ява -' : '- подія -';
        const currentUser = 'Дмитро Дашко'; //later take from localStorage

        return (
            <section className="post">
                <article className="who-created">
                    <img src={reporter.avatar} className="profile-photo"/>
                </article>
                <article className="ad">
                    <p className="what-done">
                        <span className="name"> { reporter.title } </span> { descr }
                        <span className="event-name"> { title } </span>
                    </p>

                    <p className="when"> { calcWhen(date) } </p>

                    { attachments &&
                    <section className="posted-ad photos">
                        {
                            attachments.map((v, i) => {
                                return (
                                    <Attachment
                                        key={ i }
                                        attachment={ v }
                                    />
                                );
                            })
                        }
                    </section>
                    }
                    <section className="posted-event">
                        <figure className="text-of-event">
                            <p dangerouslySetInnerHTML={{__html: decodeURIComponent(message)}}></p>
                            {
                                !isAnnouncement && (
                                    <section>
                                        <p className="participants">учасники:</p>
                                        {
                                            participants.map((v, i) => {
                                                return (
                                                    <Participant
                                                        key={ i }
                                                        participant={ v }
                                                    />
                                                );
                                            })
                                        }
                                        <a href="">
                                            <span className="participant-name your-participation"
                                                  onClick={ (e) => {
                                                      e.preventDefault();
                                                      toggleParticipation(id, currentUser);
                                                  } }
                                            >
                                                { participants.includes(currentUser) ? '- Мене' : '+ Мене' }
                                            </span>
                                        </a>
                                    </section>
                                )
                            }
                        </figure>
                    </section>
                </article>
            </section>
        );
    }
}
