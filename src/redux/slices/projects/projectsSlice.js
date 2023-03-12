import { createSlice } from '@reduxjs/toolkit';

import toastHelper from 'config/helpers/toastHelper';
import statusConst from 'config/constants/status';

const { STATUS_LOADING, STATUS_IDLE, STATUS_ERROR } = statusConst;

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    error: {},
    status: STATUS_IDLE,
  },
  reducers: {
    // GetProjects
    getProjects: (state) => {
      state.status = STATUS_LOADING;
    },
    getProjectsSuccess: (state, { payload }) => {
      state.projects = payload;
      state.status = STATUS_IDLE;
    },
    getProjectsError: (state, { payload }) => {
      state.error = payload;
      state.status = STATUS_ERROR;
    },

    // DeleteProject
    deleteProject: (state) => {
      state.status = STATUS_LOADING;
    },
    deleteProjectSuccess: (state) => {
      state.status = STATUS_IDLE;
      toastHelper.success('Deleted');
    },
    deleteProjectError: (state) => {
      state.status = STATUS_ERROR;
      toastHelper.error('Delete project error');
    },
  },
});

export const {
  getProjects,
  getProjectsSuccess,
  getProjectsError,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
