import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type: 'success' | 'error', message: string) => {
  const toastClass = {
    success: 'bg-black text-gray-100 dark:bg-white dark:text-black',
    error: 'bg-black text-gray-100 dark:bg-white dark:text-black',
  };

  const options: ToastOptions = {
    className: toastClass[type],
    bodyClassName: 'text-sm font-medium',
    progressClassName: 'bg-primary',
  };

  toast(message, options);
};

export const ToastProvider = () => (
  <ToastContainer
    toastClassName={({ type }) =>
      type === 'success' ? 'bg-black text-gray-100 dark:bg-white dark:text-black' : 'bg-black text-gray-100 dark:bg-white dark:text-black'
    }
    bodyClassName="text-sm font-medium"
    progressClassName="bg-primary"
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);