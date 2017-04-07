/*
 * Created on 18.01.17.
 */

"use strict";

const newsHardCode = [
    {
        title: 'Шановні мешканці ОСББ 39!',
        message: 'Нагадуємо, що з 1.02.2017 починають діяти нові тарифи на водопостачання та водовідведення - 8.25 грн/куб м.'
    },
    {
        title: 'Шановні мешканці ОСББ 38!',
        message: `В нашому будинку запрацювала мережа інтернет-провайдера GTS.
            Подробиці тарифів та послуг провайдера шукайте на сайті <a href="#">www.gts.dp.ua</a>.
            Перші півроку діють пільгові тарифи для нових користувачів.`
    }
];

const announcementsHardCode = [
	{
		id: '1',
		title: '',
		reporter: { title: 'Дмитро Дашко', avatar: '' },
		date: '03.19.2017 16:00:00',
		attachments: [
			{ url: 'item_photo.jpg', mimetype: 'image/jpg' },
			{ url: 'item_photo.jpg', mimetype: 'image/jpg' },
			{ url: 'item_photo.jpg', mimetype: 'image/jpg' }
		],
		isAnnouncement: true,
		participants: [],
		message: 'кому потібна така граната?'
	},
	{
		id: '2',
		title: '',
		reporter: { title: 'Артем Рісухін', avatar: '' },
		date: '03.19.2017 15:45:00',
		attachments: [],
		isAnnouncement: true,
		participants: [],
		message: `<p>Народ! Кому потрібний старий холодильник Nord? Віддаю безкоштовно!</p>
			<p>Телефонуйте 063 718 3313</p>`
	},
	{
		id: '3',
		title: 'Прикрашання під’їзду 28 грудня',
		reporter: { title: 'Лера Федюшичева', avatar: '' },
		date: '03.18.2017 12:45:00',
		attachments: [],
		isAnnouncement: false,
		participants: ['Maria Kolomoets', 'Артем Коломоєць', 'Дмитро Дашко', 'Олена Крайняк', 'Kateryna Dashko'],
		message: `Усім привіт! хочу прикрасити наш під’їзд, приєднуйтесь! починаємо
			28 грудня о 10 ранку. не забудьте гірлянди!`
	},
];

export const types = ['Оголошення', 'Подія', 'Новина'];

const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST';
const GET_ANNOUNCEMENTS_REQUEST = 'GET_ANNOUNCEMENTS_REQUEST';
const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT';
const ADD_NEWS_ITEM = 'ADD_NEWS_ITEM';
const TOGGLE_PARTICIPATION = 'TOGGLE_PARTICIPATION';

/**** SINGLE ANNOUNCEMENT PRIVATE REDUCER *****/
const _initAnnouncementState = {
	title: '',
	date: (new Date()).toLocaleDateString(),
	message: '',
	attachments: [],
	isAnnouncement: true,
	reporter: { title: '', avatar: '' },
	participants: []
};

const announcement = (state = _initAnnouncementState, action) => {
	switch(action.type){
		case TOGGLE_PARTICIPATION:
			const { participants } = state;
			const idx = participants.findIndex((v) => v === action.currentUser);
			const res = idx > -1 ?
				participants
					.slice(0, idx)
					.concat(participants.slice(idx + 1)) :
				participants.concat([action.currentUser]);

			return {...state, ...{ participants: res } };

		default:
			return state;
	}
};

const _initMainState = {
	/* @title: {String, only for Events},
	* @date: {String, valid Date string},
	* @message: {String},
	* @attachments: {String Array, uris to download resources},
	* @isAnnouncement: {Bool, false for Events},
	* @reporter: { {@title: {String}, @avatar {String} }
	* @participants : {String Array, names of participants - only for Events}
	*/
	announcements: [],
	/* @title: {String}, @message: {String} */
	news: []
};

export default function main(state = _initMainState, action) {
	switch(action.type){
		case TOGGLE_PARTICIPATION: {
			const { announcementId, currentUser } = action;
			const idx = state.announcements.findIndex((v) => v.id === announcementId);
			if(idx < 0) {
				return state;
			}

			const announcementItem = announcement(state.announcements[idx], action);
			const res = state.announcements
				.slice(0, idx)
				.concat([announcementItem])
				.concat(state.announcements.slice(idx + 1));

			return { ...state, ...{ announcements: res } };
		}

		case ADD_ANNOUNCEMENT: {
			return { ...state,
				...{ announcements: state.announcements.concat(
					action.announcement
				)}
			};
		}

		case ADD_NEWS_ITEM: {
			return { ...state,
				...{ news: state.news.concat(
					action.newsItem
				)}
			};
		}

		case GET_NEWS_REQUEST: {
			return { ...state, ...{ news: newsHardCode } };
		}

		case GET_ANNOUNCEMENTS_REQUEST: {
			return { ...state, ...{ announcements: announcementsHardCode } };
		}

		default:
			return state;
	}
}

export const toggleParticipation = (announcementId, currentUser) => {
	return {
		type: TOGGLE_PARTICIPATION,
		announcementId,
		currentUser
	}
}

export const addAnnouncement = (announcement) => {
	return {
		type: ADD_ANNOUNCEMENT,
		announcement
	}
}

export const addNewsItem = (newsItem) => {
	return {
		type: ADD_NEWS_ITEM,
		newsItem
	}
}

export const getAnnouncements = () => {
	return {
		type: GET_ANNOUNCEMENTS_REQUEST
	}
}

export const getNews = () => {
	return {
		type: GET_NEWS_REQUEST
	}
}
