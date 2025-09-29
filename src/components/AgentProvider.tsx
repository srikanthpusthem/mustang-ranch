"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { usePathname } from "next/navigation";

// Event system types
type AgentEvent = 
  | "dock:opened"
  | "dock:closed" 
  | "message:sent"
  | "message:received"
  | "route:changed"
  | "session:started"
  | "session:ended"
  | "agent_open"
  | "hero_meet_wrangler";

type EventData = Record<string, unknown>;

// Enhanced context interface
interface AgentContextType {
  // Dock state management
  isOpen: boolean;
  openDock: () => void;
  closeDock: () => void;
  
  // Event system
  emit: (event: AgentEvent, data?: EventData) => void;
  on: (event: AgentEvent, callback: (data?: EventData) => void) => () => void;
  
  // Route tracking
  route: string;
  
  // Session management
  sessionId: string;
  
  // Legacy compatibility
  setIsOpen: (open: boolean) => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

// Generate unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function AgentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [eventListeners, setEventListeners] = useState<Map<AgentEvent, Set<(data?: EventData) => void>>>(new Map());

  // Route tracking
  const route = pathname;

  // Event system
  const emit = useCallback((event: AgentEvent, data?: EventData) => {
    const listeners = eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
    
    // Log events in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AgentProvider] Event: ${event}`, data);
    }

    // Send metrics to server
    const metricsData = {
      event,
      data,
      route,
      sessionId,
      timestamp: Date.now(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    };

    // Fire and forget - don't await to avoid blocking
    fetch('/api/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metricsData),
    }).catch(error => {
      // Silently fail to avoid breaking the app
      console.warn('[AgentProvider] Failed to send metrics:', error);
    });
  }, [eventListeners, route, sessionId]);

  const on = useCallback((event: AgentEvent, callback: (data?: EventData) => void) => {
    setEventListeners(prev => {
      const newMap = new Map(prev);
      if (!newMap.has(event)) {
        newMap.set(event, new Set());
      }
      newMap.get(event)!.add(callback);
      return newMap;
    });

    // Return cleanup function
    return () => {
      setEventListeners(prev => {
        const newMap = new Map(prev);
        const listeners = newMap.get(event);
        if (listeners) {
          listeners.delete(callback);
          if (listeners.size === 0) {
            newMap.delete(event);
          }
        }
        return newMap;
      });
    };
  }, []);

  // Dock management functions
  const openDock = useCallback(() => {
    setIsOpen(true);
    emit("dock:opened", { timestamp: Date.now() });
  }, [emit]);

  const closeDock = useCallback(() => {
    setIsOpen(false);
    emit("dock:closed", { timestamp: Date.now() });
  }, [emit]);

  // Track route changes
  useEffect(() => {
    emit("route:changed", { 
      route: pathname, 
      timestamp: Date.now(),
      sessionId 
    });
  }, [pathname, emit, sessionId]);

  // Initialize session
  useEffect(() => {
    emit("session:started", { 
      sessionId, 
      timestamp: Date.now(),
      initialRoute: pathname 
    });

    return () => {
      emit("session:ended", { 
        sessionId, 
        timestamp: Date.now() 
      });
    };
  }, [sessionId, pathname, emit]);

  // Legacy compatibility functions
  const setCurrentRoute = useCallback((_route: string) => {
    // This is now handled automatically by pathname tracking
    console.warn("setCurrentRoute is deprecated. Route is now tracked automatically via usePathname.");
  }, []);

  const contextValue: AgentContextType = {
    // New API
    isOpen,
    openDock,
    closeDock,
    emit,
    on,
    route,
    sessionId,
    
    // Legacy API for backward compatibility
    setIsOpen,
    currentRoute: route,
    setCurrentRoute,
  };

  return (
    <AgentContext.Provider value={contextValue}>
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

