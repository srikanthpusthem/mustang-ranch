"use client";

import { Button } from "@/components/ui/button";
import { useAgent } from "./AgentProvider";

export function AgentTestButton() {
  const { openDock, closeDock, route, sessionId, emit } = useAgent();

  const handleTestEvent = () => {
    emit("message:sent", { 
      test: true, 
      route, 
      sessionId,
      timestamp: Date.now() 
    });
    console.log("Test event emitted!", { route, sessionId });
  };

  const handleAgentOpen = () => {
    emit("agent_open", { 
      source: "test_button",
      route, 
      sessionId,
      timestamp: Date.now() 
    });
    console.log("Agent open event emitted!", { route, sessionId });
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-100 rounded-lg">
      <Button onClick={openDock} variant="outline" size="sm">
        Open Dock
      </Button>
      <Button onClick={closeDock} variant="outline" size="sm">
        Close Dock
      </Button>
      <Button onClick={handleTestEvent} variant="outline" size="sm">
        Test Event
      </Button>
      <Button onClick={handleAgentOpen} variant="outline" size="sm">
        Agent Open
      </Button>
      <div className="text-xs text-gray-600">
        Route: {route} | Session: {sessionId.slice(-8)}
      </div>
    </div>
  );
}
