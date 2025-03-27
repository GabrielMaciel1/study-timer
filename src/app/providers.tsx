// app/providers.tsx
"use client";


import { TimerProvider } from "@/context/TimerContext";
import { ReactNode } from "react";


export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TimerProvider>
        {children}
    </TimerProvider>
  );
};