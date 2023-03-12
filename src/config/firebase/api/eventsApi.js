import { getDocs, collection, doc, updateDoc, deleteDoc, setDoc, query, where } from 'firebase/firestore';

import dateHelper from 'config/helpers/dateHelper';
import toastHelper from 'config/helpers/toastHelper';

import { db, auth } from '../index';

const eventsCol = collection(db, 'events');

const eventsApi = {
  getEvents: async () => {
    try {
      const userId = auth.currentUser.uid;
      const q = query(eventsCol, where('userId', '==', userId));
      const res = await getDocs(q).then((res) => res.docs.map((doc) => doc.data()));
      return res;
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  getEventsFromNow: async () => {
    try {
      const userId = auth.currentUser.uid;
      const q = query(eventsCol, where('userId', '==', userId));
      const res = await getDocs(q).then((res) =>
        res.docs
          .map((doc) => doc.data())
          .filter((doc) => dateHelper.compareDateByMinutes(new Date(), doc.start) >= 0)
          .sort((doc1, doc2) => dateHelper.compareDateByMinutes(doc2.start, doc1.start))
          .slice(0, 6)
      );
      return res;
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  getEventByDay: async (day) => {
    try {
      const userId = auth.currentUser.uid;
      const q = query(eventsCol, where('userId', '==', userId));
      const res = await getDocs(q).then((res) =>
        res.docs
          .map((doc) => doc.data())
          .filter((doc) => dateHelper.equalDate(doc.start, day))
          .sort((doc1, doc2) => dateHelper.compareDateByMinutes(doc2.start, doc1.start))
      );
      return res;
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  addEvent: async (data) => {
    try {
      const userId = auth.currentUser.uid;
      await setDoc(doc(db, 'events', data.id), {
        ...data,
        userId,
      });
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  updateEvent: async (data) => {
    try {
      const userId = auth.currentUser.uid;
      const eventsRef = doc(db, 'events', data.id);
      await updateDoc(eventsRef, {
        ...data,
        userId,
      });
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  deleteEvent: async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },
};

export default eventsApi;
