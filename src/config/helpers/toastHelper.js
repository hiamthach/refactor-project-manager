import { toast } from 'react-hot-toast';

const toastHelper = {
  success: (message) => {
    toast.success(message);
  },
  error: (message) => {
    toast.error(message);
  },
  loading: (message) => {
    toast.loading(message);
  },
  dismiss: () => {
    toast.dismiss();
  },
};

export const toastConfig = {
  position: 'top-center',
  toastOptions: {
    duration: 2000,
    error: {
      duration: 2000,
    },
  },
};

export default toastHelper;
