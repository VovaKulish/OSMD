import React from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import { addAnnouncement, addNewsItem, types } from '../../routes/main/modules';
import { addAttachments, removeAttachment,
    finalizeAttachmentLoad } from '../../routes/modules';

const _reporter = { title: 'Дмитро Дашко', avatar: '' };

const formatDate = (date) => {
    if(!(date instanceof Date)) {
        return null;
    }
    return `${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const mapPropsToState = (state) => {
    return { types };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAnnouncement: (announcementItem) => {
            const { type, message } = announcementItem;
            const isAnnouncement = type === 0;
            const announcement = { ...announcementItem,
                ...{
                    id: (Math.random()).toString(),
                    participants: [],
                    reporter: _reporter,
                    date: formatDate(new Date()),
                    isAnnouncement
                }
            };

            if(type !== 2) {
                dispatch(addAnnouncement(announcement));
                return;
            }

            dispatch(addNewsItem({
                title: '',
                message
            }));
        },
        addAttachments,
        removeAttachment,
        finalizeAttachmentLoad
    };
};

const EditorContainer = connect(
    mapPropsToState,
    mapDispatchToProps
)(Editor);

export default EditorContainer;
