import { auth } from '../index';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toastHelper from 'config/helpers/toastHelper';

const googleProvider = new GoogleAuthProvider();

const authApi = {
  signInByGoogle: async () => {
    return signInWithPopup(auth, googleProvider);
  },
  signOut: async () => {
    try {
      signOut(auth);
    } catch (error) {
      toastHelper.error(error.message);
      return error;
    }
  },
};

export default authApi;
