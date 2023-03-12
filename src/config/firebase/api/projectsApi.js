import {
  getDocs,
  collection,
  getCountFromServer,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, auth, storage } from '../index';

import toastHelper from 'config/helpers/toastHelper';
import dateHelper from 'config/helpers/dateHelper';

const projectsCol = collection(db, 'projects');

const projectsApi = {
  getProjects: async () => {
    try {
      const res = await getDocs(projectsCol).then((res) =>
        res.docs.map((doc) => doc.data()).sort((doc1, doc2) => dateHelper.compareDateByMinutes(doc2.start, doc1.start))
      );
      return res;
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  getProjectById: async (id) => {
    try {
      const res = await getDoc(doc(db, 'projects', id)).then((res) => res.data());
      return res;
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  filterProjects: async (field, value) => {
    try {
      const q = query(projectsCol, where(field, '==', value));
      const snapshot = await getCountFromServer(q);

      return snapshot.data().count;
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  addProject: async (data) => {
    try {
      const authorId = auth.currentUser.uid;
      await setDoc(doc(db, 'projects', data.id), {
        ...data,
        authorId,
      });
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },

  updateProject: async (data) => {
    try {
      await updateDoc(doc(db, 'projects', data.id), data);
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },
  deleteProject: async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      deleteObject(ref(storage, 'icon/' + id));
    } catch (error) {
      toastHelper.error(error.message);
      return { error };
    }
  },
};
export default projectsApi;
