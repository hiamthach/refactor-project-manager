import { all, fork } from 'redux-saga/effects';

import eventsSaga from './slices/events/eventsSaga';
import projectsSaga from './slices/projects/projectsSaga';

export default function* rootReducer() {
  yield all([fork(eventsSaga), fork(projectsSaga)]);
}
