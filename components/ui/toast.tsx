import React from 'react';
import { Toast, toast } from 'react-hot-toast';
import { X } from '@phosphor-icons/react';

interface CustomToastProps {
  t: Toast;
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ t, message }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export const showCustomToast = (message: string) => {
  toast.custom((t) => <CustomToast t={t} message={message} />);
};