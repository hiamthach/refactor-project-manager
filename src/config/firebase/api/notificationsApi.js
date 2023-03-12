import { ref, onValue, set, update, remove, child, get } from 'firebase/database';
import { auth, database } from '../index';

import toastHelper from 'config/helpers/toastHelper';

const notificationsApi = {
  getNotifications: async (userId, handler) => {
    try {
      const notificationRef = ref(database, `notifications/${userId}`);
      onValue(notificationRef, handler);
    } catch (error) {
      toastHelper.error(error.message);
    }
  },

  createNotification: async (data, userId) => {
    try {
      const notificationRef = ref(database, `notifications/${userId}/${data.id}`);
      set(notificationRef, data);
    } catch (error) {
      toastHelper.error(error.message);
    }
  },

  updateNotification: async (data, userId) => {
    try {
      const userRef = ref(database, `notifications/${userId}/${data.id}`);
      update(userRef, data);
    } catch (error) {
      toastHelper.error(error.message);
    }
  },

  deleteNotification: async (id, userId) => {
    try {
      const notificationRef = ref(database, `notifications/${userId}/${id}`);
      remove(notificationRef);
    } catch (error) {
      toastHelper.error(error.message);
    }
  },
};

export default notificationsApi;
