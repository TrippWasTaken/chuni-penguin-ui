"use client";
import { AlertType } from "@/types/alert";
import { FC, ReactNode, createContext, useContext, useState } from "react";

// @ts-ignore
const AlertContext = createContext();

const AlertContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const resetValue: AlertType = {
    duration: 5,
    show: false,
    type: "info",
    message: null,
  };
  const [alert, setAlert] = useState<AlertType>(resetValue);

  const showAlert = (message: any, type: any, duration = 5) => {
    setAlert(() => ({
      message: message,
      type: type,
      duration: duration,
      show: true,
    }));
    setTimeout(() => setAlert(() => resetValue), duration * 1000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export const useAlertState = (): any => useContext(AlertContext);

export default AlertContextProvider;
