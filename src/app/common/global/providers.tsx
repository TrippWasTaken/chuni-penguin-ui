import AlertContextProvider from "@/app/context/alertContext";
import React, { FC, ReactNode } from "react";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <AlertContextProvider>{children}</AlertContextProvider>;
};

export default Providers;
