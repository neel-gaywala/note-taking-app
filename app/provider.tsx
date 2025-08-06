"use client";

import { ReduxProvider } from "@/redux-store/provider";

import { ApiProvider } from "@/services/provider";

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  return (
    <ApiProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </ApiProvider>
  );
}

export { Provider };
