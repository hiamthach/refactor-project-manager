import { all, fork, takeEvery, put, call } from 'redux-saga/effects';

import {
  getEvents as getEventsAction,
  getEventsSuccess,
  getEventsError,
  addEventSuccess,
  addEventError,
  deleteEventSuccess,
  deleteEventError,
  updateEventSuccess,
  updateEventError,
} from './eventsSlice';
import eventsApi from 'config/firebase/api/eventsApi';
import notificationsApi from 'config/firebase/api/notificationsApi';
import { notificationTypes } from 'config/constants/notifications';
import { auth } from 'config/firebase';

function* getEvents() {
  try {
    const res = yield call(eventsApi.getEvents);
    yield put(getEventsSuccess(res));
  } catch (error) {
    yield put(getEventsError(error));
  }
}

function* addEvent({ payload: event }) {
  try {
    yield call(eventsApi.addEvent, event);
    yield call(
      notificationsApi.createNotification,
      {
        id: event.id,
        description: 'Event Upcoming',
        title: event.title,
        type: notificationTypes.EVENT,
        date: event.start,
        isSeen: false,
      },
      auth.currentUser.uid
    );
    yield put(addEventSuccess());
    yield put(getEventsAction());
  } catch (error) {
    yield put(addEventError(error));
  }
}

function* updateEvent({ payload: event }) {
  try {
    yield call(eventsApi.updateEvent, event);
    yield call(
      notificationsApi.updateNotification,
      {
        id: event.id,
        description: 'Event Upcoming',
        title: event.title,
        type: notificationTypes.EVENT,
        date: event.start,
        isSeen: false,
      },
      auth.currentUser.uid
    );
    yield put(updateEventSuccess());
    yield put(getEventsAction());
  } catch (error) {
    yield put(updateEventError(error));
  }
}

function* deleteEvent({ payload: event }) {
  try {
    yield call(eventsApi.deleteEvent, event.id);
    yield call(notificationsApi.deleteNotification, event.id, auth.currentUser.uid);
    yield put(deleteEventSuccess());
    yield put(getEventsAction());
  } catch (error) {
    yield put(deleteEventError());
  }
}

export function* watchGetEvents() {
  yield takeEvery('events/getEvents', getEvents);
}

export function* watchAddEvent() {
  yield takeEvery('events/addEvent', addEvent);
}

export function* watchUpdateEvent() {
  yield takeEvery('events/updateEvent', updateEvent);
}

export function* watchDeleteEvent() {
  yield takeEvery('events/deleteEvent', deleteEvent);
}

function* eventsSaga() {
  yield all([fork(watchGetEvents), fork(watchAddEvent), fork(watchDeleteEvent), fork(watchUpdateEvent)]);
}

export default eventsSaga;
