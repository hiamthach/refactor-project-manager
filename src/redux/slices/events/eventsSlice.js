import { createSlice } from '@reduxjs/toolkit';

import toastHelper from 'config/helpers/toastHelper';
import statusConst from 'config/constants/status';

const { STATUS_LOADING, STATUS_IDLE, STATUS_ERROR } = statusConst;

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    error: {},
    status: STATUS_IDLE,
  },
  reducers: {
    // Get Events
    getEvents: (state) => {
      state.status = STATUS_LOADING;
    },
    getEventsSuccess: (state, { payload }) => {
      state.events = payload;
      state.status = STATUS_IDLE;
    },
    getEventsError: (state, { payload }) => {
      state.error = payload;
      state.status = STATUS_ERROR;
    },

    // Add Event
    addEvent: (state) => {
      // state.events = [...state.events, payload];
      state.status = STATUS_LOADING;
    },

    addEventSuccess: (state) => {
      state.status = STATUS_IDLE;
    },

    addEventError: (state) => {
      state.status = STATUS_ERROR;
      toastHelper.error('Add event error');
    },

    // Update Event
    updateEvent: (state) => {
      state.status = STATUS_LOADING;
    },

    updateEventSuccess: (state) => {
      state.status = STATUS_IDLE;
    },

    updateEventError: (state) => {
      state.status = STATUS_ERROR;
      toastHelper.error('Update event error');
    },

    // Delete Event
    deleteEvent: (state) => {
      state.status = STATUS_LOADING;
    },

    deleteEventSuccess: (state) => {
      state.status = STATUS_IDLE;
    },

    deleteEventError: (state) => {
      state.status = STATUS_ERROR;
      toastHelper.error('Delete event error');
    },
  },
});

export const {
  getEvents,
  getEventsSuccess,
  getEventsError,
  addEvent,
  addEventSuccess,
  addEventError,
  updateEvent,
  updateEventSuccess,
  updateEventError,
  deleteEvent,
  deleteEventSuccess,
  deleteEventError,
} = eventsSlice.actions;

export default eventsSlice.reducer;
