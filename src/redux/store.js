import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './sagas';
import eventsSlice from './slices/events/eventsSlice';
import projectsSlice from './slices/projects/projectsSlice';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    events: eventsSlice,
    projects: projectsSlice,
  },
  middleware: [saga],
  devTools: true,
});

saga.run(rootReducer);

export default store;
