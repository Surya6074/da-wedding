"use client";

import React, { createContext, useContext, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface InviteContextType {
  inviteName: string | null;
}

const InviteContext = createContext<InviteContextType>({ inviteName: null });

function InviteProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const rawInvite = searchParams.get("invite");

  const inviteName = rawInvite
    ? decodeURIComponent(rawInvite)
        .replace(/^['"]|['"]$/g, "")
        .trim()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())
    : null;

  return (
    <InviteContext.Provider value={{ inviteName }}>
      {children}
    </InviteContext.Provider>
  );
}

export const InviteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<>{children}</>}>
      <InviteProviderInner>{children}</InviteProviderInner>
    </Suspense>
  );
};

export const useInvite = () => useContext(InviteContext);
