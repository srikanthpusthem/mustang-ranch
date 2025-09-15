"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AgentContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/");

  return (
    <AgentContext.Provider value={{ isOpen, setIsOpen, currentRoute, setCurrentRoute }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return context;
}
