import React, { useContext } from "react";
import { Toast, ToastType, ToastConfigType } from "components/toast";

interface ToastProviderProps {
  children: React.ReactNode;
}

type ToastContextType = {
  showToast: (type: ToastType, message: string, duration?: number) => void;
} | null;

const ToastContext = React.createContext<ToastContextType>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const [toastConfig, setToastConfig] = React.useState<ToastConfigType>(null);

  const showToast = (type: ToastType, message: string, duration = 4000) => {
    setToastConfig({ type, message, duration });
  };

  const hideToast = () => {
    setToastConfig(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast {...{ hideToast, toastConfig }} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(`useToast must be used within a ToastProvider`);
  }

  const { showToast } = context;
  return {
    showToast,
    ToastType,
  };
}
