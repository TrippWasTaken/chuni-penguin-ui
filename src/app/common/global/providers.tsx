import AlertContextProvider from "@/app/context/alertContext";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";

const Providers: FC<{ children: ReactNode; session: Session | null }> = async ({
  children,
}) => {
  return (
    <AlertContextProvider>
      <SessionProvider session={await auth()}>{children}</SessionProvider>
    </AlertContextProvider>
  );
};

export default Providers;
