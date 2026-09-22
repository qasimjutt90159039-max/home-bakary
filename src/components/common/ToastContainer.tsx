import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-notifications-container" 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#241A15] text-[#FAF7F2] p-4 rounded-xl shadow-xl flex items-center justify-between border border-[#443229] transition-all transform translate-y-0"
        >
          <div className="flex items-center gap-3 pr-2">
            {toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#E5BA73] shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#85A36A] shrink-0" />
            )}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#D9C3B0] hover:text-white p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
