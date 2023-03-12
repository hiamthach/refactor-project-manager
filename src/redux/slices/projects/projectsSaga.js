import { all, fork, takeEvery, put, call } from 'redux-saga/effects';

import {
  getProjects as getProjectsAction,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectSuccess,
  deleteProjectError,
} from './projectsSlice';

import projectsApi from 'config/firebase/api/projectsApi';
import notificationsApi from 'config/firebase/api/notificationsApi';

function* getProjects() {
  try {
    const res = yield call(projectsApi.getProjects);

    yield put(getProjectsSuccess(res));
  } catch (error) {
    yield put(getProjectsError(error));
  }
}

function* deleteProject({ payload: projectId }) {
  try {
    yield call(projectsApi.deleteProject, projectId);
    yield call(notificationsApi.deleteNotification, projectId, '*');
    yield put(deleteProjectSuccess());
    yield put(getProjectsAction());
  } catch (error) {
    yield put(deleteProjectError(error));
  }
}

export function* watchGetProjects() {
  yield takeEvery('projects/getProjects', getProjects);
}

export function* watchDeleteProject() {
  yield takeEvery('projects/deleteProject', deleteProject);
}

function* projectsSaga() {
  yield all([fork(watchGetProjects), fork(watchDeleteProject)]);
}

export default projectsSaga;
